import React, { useContext } from "react";
import Header from "./HEADER.JSX";
import { ShopContext } from "./ContextAPI/ShopContext";

const Results = () => {
    const {prediction,title}=useContext(ShopContext);
    console.log(title)
  return (
    <div className="relative w-full h-screen bg-black overflow-y-auto overflow-x-hidden">
      {/* Gradient Backgrounds */}
      <div className="absolute w-[1836.84px] h-[797.31px] left-[98.55px] top-[-402px] rotate-[8deg] bg-gradient-to-r from-[#4700FF] via-[#32AEC5] to-[#F2003E] blur-[300px]"></div>
      <div className="absolute w-[562.04px] h-[798.58px] left-[-296px] top-[536.10px] rotate-[-34deg] bg-gradient-to-r from-[#FFC513] to-[#FF2059] blur-[300px]"></div>
      
      <Header />
      
      {/* Project Title */}
      <div className="absolute top-36 left-32 text-white text-xl font-semibold">
        Project Title:
      </div>
      <div className="absolute top-36 left-[389px] text-white text-lg font-normal">
        {title}
      </div>
      <div className="absolute top-43 left-[332.93px] w-[694.09px] border border-white"></div>
      
      {/* Recommendations */}
      <div className="absolute top-[630px] left-[117px] text-white text-xl font-semibold">
        Recommendations:
      </div>
      
      {/* Metrics Cards */}
      <div className="absolute top-[272px] left-[100px] flex space-x-25">
        {[
          { title: "Risk", value: prediction?.data?.risk },
          { title: "ESG Score", value: prediction?.data?.ESG },
          { title: "Priority", value: prediction?.data?.Preority },
          { title: "Actual Amount", value: prediction?.data?.Capital },
        ].map((item, index) => (
          <div
            key={index}
            className="w-[245px] p-14 bg-white/20 shadow-md border border-gray-400 rounded-2xl flex flex-col items-center space-y-9"
          >
            <div className="text-white text-xl font-semibold">{item.title}</div>
            <div className="text-white text-3xl font-semibold">{item.value}</div>
          </div>
        ))}
      </div>
      
      {/* Recommendations Text */}
      <div className="absolute top-[671px] left-[352px] text-white text-lg font-normal leading-9 ">
        <p ><span className="font-bold text-blue-300">RiskAssessment:</span>&nbsp;{prediction.Recomendations.riskAssessment}</p><br/>
        <p><span className="font-bold text-blue-300">PriorityJustification:</span>&nbsp;{prediction.Recomendations.priorityJustification}</p><br/>
        <p><span className="font-bold text-blue-300">Investment Strategy:</span>&nbsp;{prediction.Recomendations.investmentStrategy}</p><br />
        <p><span className="font-bold text-blue-300">Additional Suggestions:</span>&nbsp;{prediction.Recomendations.additionalSuggestions}</p><br />
      </div>
    </div>
  );
};

export default Results;