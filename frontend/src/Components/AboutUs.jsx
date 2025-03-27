import React from 'react'
import Header from './HEADER.JSX'
import ContactImg from '../assets/contactUs.jpg'

const AboutUs = () => {
  return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* Background Gradient Blobs */}
            <div className="absolute w-[1836.84px] h-[797.31px] left-[98.55px] top-[-402px] rotate-[8deg] bg-gradient-to-r from-[#4700FF] via-[#32AEC5] to-[#F2003E] blur-[300px] opacity-50"></div>
            <div className="absolute w-[562.04px] h-[798.58px] left-[-296px] top-[536.10px] rotate-[-34deg] bg-gradient-to-r from-[#FFC513] to-[#FF2059] blur-[300px] opacity-50"></div>
        
            <Header />
            {/* The Green Finance Investment Platform is an AI-powered tool designed to help banks and financial institutions
                evaluate, prioritize, and optimize their investments in sustainable projects. The platform focuses on key
                sectors such as renewable energy, green infrastructure, water conservation, and climate adaptation, ensuring
                that funds are allocated to the most impactful initiatives. With an intelligent ranking system, it provides
                risk assessments, priority scores, and tailored recommendations, enabling decision-makers to identify and
                support the most promising green projects. */}

                {/* Through an interactive dashboard, users can access detailed project evaluations, investment distribution
                insights, and carbon impact analysis. The AI-driven system suggests high-priority projects based on financial
                viability, environmental benefits, and long-term sustainability. With intuitive data visualizations and
                customizable reports, the platform simplifies green finance decision-making, making it easier for institutions
                to drive climate-positive investments while managing risks effectively. */}
        
            <div className="flex items-center justify-center w-[100%] h-screen absolute bottom-9 p-20">
                <div className="flex items-start">
                    <img src={ContactImg} className="w-[438px] m-5 mt-20 rounded-[15px] h-[490px]"/>
                </div>
                <div className="w-[50%] text-white m-5">
                    <p className="text-[18px]">The Green Finance Investment Platform is an AI-powered tool designed to help banks and financial institutions
                        evaluate, prioritize, and optimize their investments in sustainable projects. The platform focuses on key
                        sectors such as renewable energy, green infrastructure, water conservation, and climate adaptation, ensuring
                        that funds are allocated to the most impactful initiatives. With an intelligent ranking system, it provides
                        risk assessments, priority scores, and tailored recommendations, enabling decision-makers to identify and
                        support the most promising green projects.</p><br />
                    <p className=" text-[18px]">Through an interactive dashboard, users can access detailed project evaluations, investment distribution
                        insights, and carbon impact analysis. The AI-driven system suggests high-priority projects based on financial
                        viability, environmental benefits, and long-term sustainability. With intuitive data visualizations and
                        customizable reports, the platform simplifies green finance decision-making, making it easier for institutions
                        to drive climate-positive investments while managing risks effectively.</p>
                </div>
                    
            </div>
        </div>
  )
}

export default AboutUs