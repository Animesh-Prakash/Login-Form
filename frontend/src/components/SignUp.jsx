import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUp = ({ passwordArray, setPasswordArray }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showpassword = async () => {
    let req = await fetch('http://localhost:3000/');
    let passwords = await req.json();
    setPasswordArray(passwords);
    console.log(passwords);
  };

  const signup = async () => {
    if (form.password.length > 8) {
      console.log(form);
      await showpassword();
      const user = passwordArray.find(
        user => user.username === form.username && user.password === form.password
      );
      if (user) {
        toast.error("This account already exists");
        setForm({ username: '', password: '' });
        return;
      }
      const newUser = { ...form, id: uuidv4() };
      setPasswordArray([...passwordArray, newUser]);

      await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

       setForm({ username: '', password: '' });
       toast('Your Account is Created!', {
         position: 'top-right',
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
       pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: 'dark'
       });

       setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      toast('Password size must be more than 8');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-[100vh] w-[100%] flex justify-center items-center">
      <ToastContainer/>
      <div className="w-[370px] h-[90vh] bg-white py-8 px-3 flex flex-col items-center below-500:h-[80vh] below-500:w-[340px] ">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <div className="my-3 w-[85%] mx-5 flex flex-col items-start justify-start p-3 below-500:p-[0.20rem] below-500:mt-[5vh]">
          <div className="w-full mb-3">
            <div className="text-sm font-medium">Username</div>
            <input
              type="text"
              className="border-2 w-full my-2 h-10 rounded-[10px] px-2"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className="w-full mb-3">
            <div className="text-sm font-medium">Password</div>
            <div className="flex relative">
              <input
                type="password"
                className="border-2 w-full my-2 h-10 rounded-[10px] px-2"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <span className="absolute right-3 top-3 cursor-pointer">
                <img src="" alt="" width="30px" />
              </span>
            </div>
          </div>
          <div
            className="w-full my-8 py-2 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-[25px] cursor-pointer"
            onClick={signup}
          >
            Sign Up
          </div>
          <div className="text-center">
            <Link to="/login">Login?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
