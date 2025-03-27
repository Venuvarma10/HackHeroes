import React from 'react'
import Header from './HEADER.JSX'

const InvestmentSubmission = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
        {/* Gradient Backgrounds */}
        <div className="absolute w-[1836.84px] h-[797.31px] left-[98.55px] top-[-402px] rotate-[8deg] bg-gradient-to-r from-[#4700FF] via-[#32AEC5] to-[#F2003E] blur-[300px]"></div>
        <div className="absolute w-[562.04px] h-[798.58px] left-[-296px] top-[536.10px] rotate-[-34deg] bg-gradient-to-r from-[#FFC513] to-[#FF2059] blur-[300px]"></div>
        
        <Header />
       <div className='flex items-center justify-center absolute w-full h-screen ' >
        <div className='flex flex-col w-[40%] text-white items-center justify-center  border py-11 rounded-[5px] bg-white/20 '>
            <input type="text" placeholder="Enter Project Name" className='border w-[70%] rounded-[5px] px-3 py-2 m-4 focus:outline-none' />
            <input type="text" placeholder="Enter Capital" className='border w-[70%] rounded-[5px] px-3 py-2 m-4 focus:outline-none'/>
            <select className='border w-[70%] rounded-[5px] px-3 py-2 m-3'>
                <option value="Enter Category" className='bg-blue-100 text-gray-300'>Enter Location</option>
               { [
                    'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai',
                    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
                    'Indore', 'Bhopal', 'Visakhapatnam', 'Surat', 'Patna',
                    'Chandigarh', 'Nagpur', 'Coimbatore', 'Thiruvananthapuram', 'Vadodara'].map((val,ind)=>{
            return <option key={ind} value={val} className='bg-blue-100 text-gray-600'>{val}</option>
            })}
            </select>
            <select className='border w-[70%] rounded-[5px] px-3 py-2 m-4 '>
                <option value="Enter Category" className='bg-blue-100 text-gray-600'>Enter Category</option>
               { ['Solar', 'Wind', 'Hydro', 'Geothermal', 'BioEnergy',].map((val,ind)=>{
            return <option key={ind} value={val} className='bg-blue-100 text-gray-600'>{val}</option>
            })}
            </select>
            <div>
                <button className='border rounded-[5px] px-7 py-2 mt-10 cursor-pointer hover:bg-blue-800 hover:border-blue-800'>Submit</button>
            </div>
        </div>
       </div>
      </div>
  )
}

export default InvestmentSubmission
