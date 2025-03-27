import React from "react";
import Header from "./HEADER.JSX";

const Results = () => {
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
        Urban EcoRevive: Restoring Green Spaces in the City
      </div>
      <div className="absolute top-43 left-[332.93px] w-[694.09px] border border-white"></div>
      
      {/* Recommendations */}
      <div className="absolute top-[630px] left-[117px] text-white text-xl font-semibold">
        Recommendations:
      </div>
      
      {/* Metrics Cards */}
      <div className="absolute top-[272px] left-[100px] flex space-x-25">
        {[
          { title: "Risk", value: "4" },
          { title: "ESG Score", value: "70" },
          { title: "Priority", value: "2" },
          { title: "Actual Amount", value: "₹400k" },
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
        Moderate risk (4/10). Requires careful monitoring.<br />
        Strong ESG score (78.08). Excellent sustainability profile.<br />
        Priority Level 3 suggests moderate importance. Align with overall portfolio goals.<br />
        Allocate capital cautiously, prioritizing impact and risk-adjusted returns. Consider staged investments.<br />
        Enhance transparency. Explore carbon offsetting. Track & report ESG metrics.
      </div>
    </div>
  );
};

export default Results;