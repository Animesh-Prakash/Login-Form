import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Login() {
  const [form, setform]= useState({username:"", password:""});
  const [passwordArray, setPasswordArray] =useState([]);
  const navigate= useNavigate();

  const handlechange=(e)=>{
    setform({...form,[e.target.name]:e.target.value})
  }
  
  const login=async(id)=>{
    let req= await fetch('http://localhost:3000/');
    let passwords = await req.json()
 
    setPasswordArray(passwords);
  console.log(passwords);

    const user= passwords.find(user=>
      user.username===form.username && user.password===form.password
    );
    if(user){
      localStorage.setItem('username', user.username);
      toast.success("Login Successfully",{
        autoClose: 3000,
      })

      setTimeout(() => {
       navigate('/dashboard');
      }, 3000);
      
    }
    else{
      toast.error("Login Unsuccessfull")
    }
  }

  
  return (
    <>
     <ToastContainer />
     <div className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-[100vh] w-[100%] flex justify-center items-center'>
       <div className='w-[370px] h-[90vh] bg-white py-8 px-3 flex flex-col items-center below-500:h-[80vh] below-500:w-[340px] '>
        <h1 className='text-3xl font-bold mb-4'>Log In</h1>
        <div className='my-3 w-[85%] mx-5 flex flex-col items-start justify-start p-3 below-500:p-[0.20rem] below-500:mt-[5vh]'>
        <div className='w-full mb-3'>
          <div className='text-sm font-medium'>Username</div>
          <input  type="text" className=' border-2 w-full my-2 h-10 rounded-[10px] px-2' name='username' value={form.username} onChange={handlechange}/>
        </div>
        <div className='w-full mb-3'>
          <div className='text-sm font-medium'>Password</div>
          <div className='flex relative'>
          <input type="password" className='border-2 w-full my-2 h-10 rounded-[10px] px-2' name='password' value={form.password} onChange={handlechange}/>
          <span className='absolute right-3 top-3 cursor-pointer' >
            <img src='' alt="" width='30px' />
            </span>
          </div>
        </div>
        <div className='w-full my-8 py-2 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-[25px] cursor-pointer' onClick={login}>
          Login
        </div>
        </div>
        <div className='cursor-pointer'><Link to='/'>Sign Up?</Link></div>
       </div>
     </div>
    </>
  )
}

export default Login
