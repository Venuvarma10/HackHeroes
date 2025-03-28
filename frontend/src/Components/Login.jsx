import React,{useContext, useState, useEffect} from "react";
import  logo  from "../assets/Frame.png";
import { NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "./ContextAPI/ShopContext";
import ToastMessage from "./ToastMessage";

const Login = () => {
  const navigate=useNavigate();
  const {setUser}=useContext(ShopContext);
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })

  const [toast,setToast]=useState(false);
  const [message,setMessage]=useState('Close');

  useEffect(()=>{
    setTimeout(()=>{
        setToast(false);
    },1000)
},[toast])

  const loginUser=async(formData)=>{
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) 
      });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const new_data = await response.json();
        setUser({userName:formData.email,token:new_data.token});
        navigate('/')
        return true;
    } catch (error) {
      setToast(true)
      setMessage('Invalid username or password');
    }
  }

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(formData.email && formData.password){
    loginUser(formData) 
    }else{
      setToast(true);
      setMessage('Please fill in all fields');
    }
  }
  return (
    <>
    {toast&&<ToastMessage message={message}/>}
    <div className="w-full h-screen relative bg-black overflow-hidden flex justify-center items-center" onChange={handleChange}>
      {/* Background gradients */}
      <div className="absolute w-[1836.84px] h-[797.31px] left-[98.55px] top-[-402px] rotate-[8deg] origin-top-left 
          bg-gradient-to-r from-[#4700FF] via-[#32AEC5] to-[#F2003E] blur-[300px]"></div>
      <div className="absolute w-[562.04px] h-[798.58px] left-[-296px] top-[536.10px] rotate-[-34deg] origin-top-left 
          bg-gradient-to-r from-[#FFC513] via-[#FF2059] to-[#FF2059] blur-[300px]"></div>
      
      {/* Login Form */}
      <div className="relative bg-white/20 shadow-md shadow-white/30 rounded-lg outline outline-1 outline-gray-600 
          p-10 flex flex-col gap-6 w-96">
        
        {/* Logo */}
        <div className="flex items-center justify-center">
          <img src={logo} className="w-[150px]"/>
        </div>
        {/* <div className="flex items-center justify-center gap-2">
          <div className="w-1 h-2.5 rotate-90 bg-[#FF4558] rounded"></div>
          <div className="w-1 h-6 bg-[#5828FF] rounded"></div>
          <div className="w-1 h-4 rotate-90 bg-[#5828FF] rounded"></div>
          <div className="text-white text-lg font-mono">EchoFin<span className="text-[#FF2756] text-bolder"> AI</span></div>
        </div> */}
        
        {/* Email Input */}
        <div className="flex flex-col">
          <input type="email" placeholder="Enter Username" name="email" className="p-2 border border-white rounded-full text-white text-sm font-mono bg-transparent focus:outline-none" />
        </div>
        
        {/* Password Input */}
        <div className="flex flex-col">
          <input type="password" placeholder="Enter Password" name="password" className="p-2 border border-white rounded-full text-white text-sm font-mono bg-transparent focus:outline-none" />
        </div>
        
        {/* Login Button */}
        <button className="w-full h-[41px] bg-gradient-to-r from-[#7763A2] via-[#A5DAE5] to-[#CAD0CD] 
            shadow-md shadow-white/30 rounded-full flex justify-center items-center text-white font-bold text-sm" onClick={handleSubmit}>
          Log in
        </button>
        <p>Don't have an account?&nbsp;<NavLink to={'/register'}>Register</NavLink></p>
      </div>
    </div>
    </>
  );
};

export default Login;