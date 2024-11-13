import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await axios.post('https://login-form-9ayh.onrender.com/api/auth/login', form, {
        headers: { 'Content-Type': 'application/json' }
      });

      const result = response.data;

      if (response.status === 200) {
        toast.success("Login successful");
        localStorage.setItem('username', result.username);
        setTimeout(() => navigate('/dashboard'), 3000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Server error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-screen flex justify-center items-center">
      <ToastContainer />
      <div className="w-96 bg-white p-8 flex flex-col items-center rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Log In</h1>
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
            onClick={login}
          >
            Log In
          </button>
          <p className="text-center mt-4">
            Don’t have an account? <Link to="/" className="text-blue-500">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
