import { useState } from "react";
import  logo  from "../assets/logo.jpg";
import { NavLink } from "react-router-dom";
const Register=()=> {
    const nameRegex=/^[a-zA-Z_-]{6,}$/; //Only letters, hyphens, and apostrophes; 4-50 character
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  //Must be 10 digits, starting with 6, 7, 8, or 9.
    const passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/; //Must be 8+ characters with at least one uppercase, one lowercase, one digit, and one special character.

    const [formData,setFormData]=useState({
        userName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [error,setError]=useState({
        nameError:true,
        mobileNumberError:true,
        passwordError:true,
        emailError:true
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        if (name === "userName") {
        setError(prevState => ({ ...prevState, nameError: value?nameRegex.test(value):true }));
        } else if (name === "password") {
        setError(prevState => ({ ...prevState, passwordError: value?passwordRegex.test(value):true}));
        } else if (name === "confirmPassword") {
        setError(prevState => ({ ...prevState, confirmPasswordError: value?formData.password === value:true}));
        }else if (name === "email") {
        setError(prevState => ({ ...prevState, emailError: value?emailRegex.test(value):true}));
        }
        setFormData({...formData,[name]:value})
    }
    const registerUser=async()=>{
        try {
        const response = await fetch(LOGIN_API, {
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
            return {username: formData.username, token: new_data.token};
        } catch (error) {
            alert('Invalid username or password');
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if((formData.name && formData.email && formData.password && formData.confirmPassword===formData.password)){
            registerUser();
            console.log(formData);
        }else if(!formData.name){
            alert("Enter User name");
        }else if(!formData.email){
            alert("Enter Email");
        }else if(!formData.password){
            alert("Enter Password");
        }else if(!(formData.confirmPassword !== formData.password)){
            alert("Match the passwords");
        }
        
        
    }
    return (
        <div className="w-full h-screen relative bg-black overflow-hidden flex justify-center items-center" onChange={handleChange}>
      {/* Background gradients */}
      <div className="absolute w-[80%] h-[797.31px] left-[98.55px] top-[-402px] rotate-[8deg] origin-top-left 
          bg-gradient-to-r from-[#4700FF] via-[#32AEC5] to-[#F2003E] blur-[300px]"></div>
      <div className="absolute w-[50%] h-[798.58px] left-[-296px] top-[536.10px] rotate-[-34deg] origin-top-left 
          bg-gradient-to-r from-[#FFC513] via-[#FF2059] to-[#FF2059] blur-[300px]"></div>
      
      {/* Login Form */}
      <div className="relative w-[30%] bg-white/20 shadow-md shadow-white/30 rounded-lg outline  outline-gray-600 
          p-10 flex flex-col gap-6 " >
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-1 h-2.5 rotate-90 bg-[#FF4558] rounded"></div>
          <div className="w-1 h-6 bg-[#5828FF] rounded"></div>
          <div className="w-1 h-4 rotate-90 bg-[#5828FF] rounded"></div>
          <div className="text-white text-lg font-mono">EchoFin<span className="text-[#FF2756] text-bolder"> AI</span></div>
        </div>
        
        {/* Email Input */}
        <div className="flex flex-col">
          <input type="email" placeholder="Enter User name" name="userName" className="p-2 border border-white rounded-full text-white text-sm font-mono bg-transparent focus:outline-none" />
          {!error.nameError && <span className='error-message text-center'>Min 6 character including "-" , "_" </span>}
        </div>

        <div className="flex flex-col">
          <input type="email" placeholder="Enter Email" name="email" className="p-2 border border-white rounded-full text-white text-sm font-mono bg-transparent focus:outline-none" />
          {!error.emailError && <span className='error-message text-center'>Please enter a valid email address (e.g., user@example.com).</span>}
        </div>

        <div className="flex flex-col">
          <input type="email" placeholder="Enter Password" name="password" className="p-2 border border-white rounded-full text-white text-sm font-mono bg-transparent focus:outline-none" />
          {!error.passwordError && <span className='error-message text-center'>Must be 8+ characters with at least one uppercase, one lowercase, one digit, and one special character</span>}
        </div>
        
        {/* Password Input */}
        <div className="flex flex-col">
          <input type="password" placeholder="Confirm Password" name="confirmPassword" className="p-2 border border-white rounded-full text-white text-sm font-mono bg-transparent focus:outline-none" />
          {error.passwordError===error.confirmPasswordError && <span className='error-message text-center'>Match passwords</span>}
        </div>
        
        {/* Login Button */}
        <button className="w-full h-[41px] bg-gradient-to-r from-[#7763A2] via-[#A5DAE5] to-[#CAD0CD] 
            shadow-md shadow-white/30 rounded-full flex justify-center items-center text-white font-bold text-sm cursor-pointer" onClick={handleSubmit}>
          Register
        </button>
        <p>Already have an account?&nbsp;<NavLink to={'/login'}>Login</NavLink></p>
      </div>
    </div>
    );
  }

  export default Register;