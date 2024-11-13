import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = ({ passwordArray, setPasswordArray }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    if (form.password.length <= 8) {
      toast.error("Password must be more than 8 characters");
      return;
    }

    const userExists = passwordArray.some(
      user => user.username === form.username && user.password === form.password
    );

    if (userExists) {
      toast.error("This account already exists");
      setForm({ username: '', password: '' });
      return;
    }

    try {
      const { status, data } = await axios.post(
        'http://localhost:5000/api/auth/signup',
        form,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (status === 201) {
        setPasswordArray([...passwordArray, { ...form }]);
        toast.success("Account created successfully!");
        setForm({ username: '', password: '' });
        navigate('/login');
      } else {
        toast.error(data.message || "Failed to create account");
      }
    } catch (error) {
      toast.error("Error signing up: " + error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-screen flex justify-center items-center">
      <ToastContainer />
      <div className="w-96 bg-white p-8 flex flex-col items-center rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
        <div className="w-full space-y-4">
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="border w-full mt-1 p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="border w-full mt-1 p-2 rounded-lg"
            />
          </div>
          <button
            className="w-full py-2 mt-6 bg-gradient-to-r from-blue-400 to-pink-500 rounded-full text-white"
            onClick={signup}
          >
            Sign Up
          </button>
          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
