import React from 'react'
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const navigate= useNavigate();
    useEffect(()=>{
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
        else{
             navigate('/login')
        }
    },[navigate])

    const logout=()=>{
        localStorage.removeItem('username');
        navigate('/login');
    }
  return (
    <>
    <div className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-[100vh] w-[100%] flex justify-center items-center'>
        
     <div className='bg-white w-[70vw] h-[70vh] p-3 flex justify-center items-center flex-col relative'>
        
        <h1 className='text-5xl font-semibold text-center mb-5'>Welcome to Your Dashboard</h1>
        {username && <p className="text-xl">Hello, {username}!</p>}
        <div className= 'absolute bottom-6 cursor-pointer3' onClick={logout}>Log out?</div>
     </div>
    </div>
    </>
  )
}

export default Dashboard
