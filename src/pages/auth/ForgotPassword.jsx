import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom
import { MdEmail } from "react-icons/md";
import bg from "../../assets/image.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleGetOTP = (e) => {
    e.preventDefault();
    // Here you would typically send a request to your backend to generate and send an OTP
    console.log('Sending OTP to:', email);
    // After a successful request, you would navigate to the OTP verification page
    // navigate('/verify-otp'); 
  };

  const handleLogin = () => {
    navigate('/'); // Navigate to the login page
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#DFE1E6]">

      {/* Main Box */}
      <div className="w-[700px] h-[700px] bg-white rounded-[24px] shadow-lg flex flex-col items-center justify-start p-10 ">

        {/* Sub Box (form elements) */}
       <form className="w-[360px] h-[565px] flex flex-col gap-[24px] items-center justify-start " onSubmit={handleGetOTP}>


          {/* Logo Box */}
          <div className="w-[259px] h-[203px] flex justify-center items-center ">
                      <img
                        src={bg}
                        alt="App Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
          
                    <div className=" w-[360px] h-[56px]  text-black text-[30px] font-semibold text-center flex flex-col items-center justify-center gap-2  ">
                      <h1 className="text-[#0A051F] text-[24px] font-inter font-semibold  leading-[100%] tracking-[0%] flex items-center justify-center text-center ">
                        {" "}
                        FORGOT PASSWORD?
                      </h1>
          
                      <div className=" text-[#666060] text-[16px] font-inter font-medium leading-[19px] text-center ">
                        Enter Your Registered Email Id
                      </div>
                    </div>

          <div className="w-[360px] h-[259px] bg-white flex flex-col gap-6">
            <div className="relative w-full">
               <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
                <input
                  type="email"
                  placeholder="Email Id"
                  className="w-full h-full p-4 pl-12 border border-[#D9D9D9] bg-[#F8F5FF] text-black placeholder-gray-500 outline-none text-[16px] rounded-[8px]"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <button type="submit" onClick={() => navigate("/verify-otp", { state: { from: "forgot" } })}
                className="w-[360px] h-[56px] bg-[#004AAD] text-white font-bold rounded-[8px] px-4 py-4 shadow-[0px_2px_4px_0px_#EC2D0140] opacity-100 transition-none"
              >
                Get OTP
              </button>


              <div className="w-[222px] h-[19px] flex items-center justify-center gap-2 opacity-100 mx-auto">
            {/* Remember Password */}
            <span className="w-[171px] h-[19px] text-[#0A051F] text-[16px] font-inter font-medium leading-[19px] tracking-[0px] text-center">
              Remember Password?
            </span>

            {/* Login (clickable) */}
            <span
              onClick={handleLogin}
              className="w-[43px] h-[19px] text-[#004AAD] text-[16px] font-inter font-medium leading-[19px] tracking-[0px] text-center cursor-pointer"
            >
              Login
            </span>
          </div>

            </div>
          </form>

          
        </div>
      </div>
   
  );
};

export default ForgotPassword;