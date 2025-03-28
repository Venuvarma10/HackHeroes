import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import Header from "./HEADER.JSX";
import homeImg from '../assets/home-img.jpg';
import { ShopContext } from "./ContextAPI/ShopContext";

const Home = () => {
  const navigate = useNavigate();  // ✅ Use useNavigate() hook
  const { user } = useContext(ShopContext);

  
  const [toast,setToast]=useState(false);
  const [message,setMessage]=useState('');

  const handleSubmit = () => {
    if (user?.token) {
      navigate('/investmentsubmission');  // ✅ Correct way to navigate
    } else {
      setToast(true);
      setMessage("Please login to proceed");
    }
  };

  useEffect(()=>{
      setTimeout(()=>{
          setToast(false);
      },800)
  },[toast])

  return (
    <>
  
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Gradient Backgrounds */}
      <div className="absolute w-[1836.84px] h-[797.31px] left-[98.55px] top-[-402px] rotate-[8deg] origin-top-left bg-gradient-to-r from-[#4700FF] via-[#32AEC5] to-[#F2003E] blur-[300px]" />
      <div className="absolute w-[562.04px] h-[798.58px] left-[-296px] top-[536.10px] rotate-[-34deg] origin-top-left bg-gradient-to-r from-[#FFC513] to-[#FF2059] blur-[300px]" />

      {/* Navbar */}
      <Header />

      <div className="flex items-center justify-center w-[100%] absolute bottom-9 p-20">
        <div className="w-[50%] text-white m-3">
          <p className="font-bold text-[32px]">Invest Smarter, Sustain Greener:</p>
          <p className="font-bold text-[32px]">AI Powered Green Finance Optimization</p>
          <p className="text-[16px]">
            EcoFin AI is an advanced AI-driven platform designed to help financial institutions evaluate, prioritize, and optimize sustainable investments.
            By leveraging AI-powered risk ratings, ESG analysis, and real-time insights, it enables smarter decision-making for green finance allocation.
          </p>

          <button className="border px-20 py-6 rounded-[15px] cursor-pointer bg-blue-700 border-none mt-20" onClick={handleSubmit}>
            Get Started
          </button>
        </div>
        <div className="flex items-start">
          <img src={homeImg} className="w-[438px] m-5 mt-35 rounded-[15px] h-[490px]" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
