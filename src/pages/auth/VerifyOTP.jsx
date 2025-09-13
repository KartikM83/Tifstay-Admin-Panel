import React, { useState, useEffect, useRef } from 'react';
import bg from "../../assets/image.png";
import {useLocation, useNavigate } from "react-router-dom"; 


const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
   const navigate = useNavigate(); // ✅ use navigate hook
   const location = useLocation(); // ✅ get navigation state
  const from = location.state?.from || "login"; // default "login"

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };


    

  const handleVerify = (e) => {
     e.preventDefault();
    const enteredOtp = otp.join('');
    // Replace with your actual verification logic
    alert(`Verifying OTP: ${enteredOtp}`);
  

  if (enteredOtp.length === 4) {
      if (from === "login") {
        navigate("/dashboard"); // ✅ Login flow → Layout
      } else if (from === "forgot") {
        navigate("/reset-password"); // ✅ Forgot password flow → Reset Password
      }
    } else {
      alert("Please enter valid 4-digit OTP");
    }
  };


  const handleResend = () => {
    // Replace with your actual resend logic
    alert('Resending code...');
    setTimer(59);
    setCanResend(false);
    setOtp(['', '', '', '']);
    inputRefs.current[0].focus();
  };

  return (
     <div className="w-full h-screen flex justify-center items-center bg-[#DFE1E6]">
       <div className="w-[700px] h-[700px] bg-white rounded-[24px] shadow-lg flex flex-col items-center justify-start p-10 ">


        {/* Sub Box (form elements) */}
       <form className="w-[360px] h-[565px] flex flex-col gap-[24px] items-center justify-start " onSubmit={handleVerify} >

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
             VERIFY CODE
            </h1>

            <div className=" text-[#666060] text-[16px] font-inter font-medium leading-[19px] text-center ">
             Enter 4 Digit Code
            </div>
          </div>


 <div className="w-[360px] h-[259px] bg-white flex flex-col gap-6">
            <div className="relative w-full flex justify-between">
  {otp.map((digit, index) => (
    <input
      key={index}
      type="text"
      maxLength="1"
      value={digit}
      onChange={(e) => handleChange(index, e.target.value)}
      onKeyDown={(e) => handleKeyDown(index, e)}
      ref={(el) => (inputRefs.current[index] = el)}
      className="w-[78px] h-[78px]  bg-[#F8F5FF] border border-[#D9D9D9] rounded-[8px] text-center text-3xl px-4 py-4 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition opacity-100"
    />
  ))}
</div>


          <div className='flex flex-col gap-6'> <div className='flex flex-col items-center justify-center'>
  <p >Didn't Receive Code?</p>
  {canResend ? (
    <p
      onClick={handleResend}
      className=""
    >
      Resend Code
    </p>
  ) : (
    <p>Resend Code In 00:{timer < 10 ? `0${timer}` : timer}</p>
  )}
</div>

    <button
  // onClick={() => navigate("/users/guests")}
  type="submit"
  className="w-[360px] h-[56px] bg-[#004AAD] text-white font-bold rounded-[8px] px-4 py-4 shadow-[0px_2px_4px_0px_#EC2D0140] transition-opacity duration-0"
>
  Verify
</button>

            </div>
          </div>
        </form>
        </div>
      </div>
  
  );
};

export default VerifyOTP;