import React from 'react';
import Header from './HEADER.JSX';

const ContactUs = () => {
  return (
    <div className="w-full h-full relative bg-black overflow-hidden">
      {/* Background Layers */}
      <div className="absolute w-[1836.84px] h-[797.31px] left-[98.55px] top-[-402px] rotate-[8deg] origin-[top_left] bg-[linear-gradient(136deg,#4700FF_0%,#32AEC5_33%,_#F2003E_65%)] shadow-[600px_600px_600px] filter blur-[300px]"></div>
      <div className="absolute w-[562.04px] h-[798.58px] left-[-296px] top-[536.10px] -rotate-[34deg] origin-[top_left] bg-[linear-gradient(251deg,#FFC513_0%,#FF2059_46%)] shadow-[600px_600px_600px] filter blur-[300px]"></div>

      <Header />
      {/* Contact Form Container */}
      <div className="absolute flex flex-col items-center gap-[60px] rounded-[20px] bg-white/20 px-[60px] py-[40px] w-[615px] left-[332px] top-[146px]">
        <div className="text-center text-white text-[36px] font-normal font-[Tw Cen MT]">
          Contact us
        </div>
        <div className="flex flex-col items-start gap-[80px] w-full">
          {/* Form Fields */}
          <div className="flex flex-col gap-[36px] w-full">
            {/* User name */}
            <div className="flex flex-col w-full">
              <div className="text-white text-[13px] font-normal font-[Tw Cen MT]">
                User name
              </div>
              <div className="flex items-center gap-2 w-full p-[10px] rounded-[40px] outline  outline-white">
                <div className="text-center text-[#DDDDDD] text-[13px] font-normal font-[Tw Cen MT]">
                  Enter name
                </div>
              </div>
            </div>
            {/* Email */}
            <div className="flex flex-col w-full">
              <div className="text-white text-[13px] font-normal font-[Tw Cen MT]">
                Email
              </div>
              <div className="flex items-center gap-2 w-full p-[10px] rounded-[40px] outline  outline-white">
                <div className="text-center text-[#DDDDDD] text-[13px] font-normal font-[Tw Cen MT]">
                  Enter Email
                </div>
              </div>
            </div>
            {/* Phone number */}
            <div className="flex flex-col w-full">
              <div className="text-white text-[13px] font-normal font-[Tw Cen MT]">
                Phone number
              </div>
              <div className="flex items-center gap-2 w-full p-[10px] rounded-[40px] outline  outline-white">
                <div className="text-center text-[#DDDDDD] text-[13px] font-normal font-[Tw Cen MT]">
                  Enter phone number
                </div>
              </div>
            </div>
            {/* Subject */}
            <div className="flex flex-col w-full">
              <div className="text-white text-[13px] font-normal font-[Tw Cen MT]">
                Subject
              </div>
              <div className="flex items-center gap-2 w-full p-[10px] rounded-[40px] outline  outline-white">
                <div className="text-center text-[#DDDDDD] text-[13px] font-normal font-[Tw Cen MT]">
                  Enter subject
                </div>
              </div>
            </div>
          </div>
          {/* Message Textarea */}
          <div className="flex flex-wrap gap-[35px] items-start w-full h-[180px]">
            <div className="flex-1 h-full p-[10px] rounded-[20px] outline  outline-white flex items-center">
              <div className="text-center text-white text-[13px] font-normal font-[Tw Cen MT]">
                Type your massage here..
              </div>
            </div>
          </div>
        </div>
        {/* Send Button */}
        <div className="flex items-center justify-center gap-2 px-[60px] py-[10px] bg-[#2332FF] rounded-[10px] outline  outline-[#2332FF]">
          <div className="text-center text-white text-[20px] font-normal font-[Tw Cen MT]">
            Send
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;