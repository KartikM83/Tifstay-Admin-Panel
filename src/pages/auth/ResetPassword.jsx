import React, { useState } from "react";
import bg from "../../assets/image.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Reset Password Component
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const navigate = useNavigate();

  // Handle form submission
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    console.log("Password updated successfully!");
    alert("Password updated successfully!");
  };

  const handleLogin = () => {
    navigate('/'); // Navigate to the login page
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#DFE1E6]">
      {/* Main Box */}
     <div className="w-[700px] h-[700px] bg-white rounded-[24px] shadow-lg flex flex-col items-center justify-start p-10 ">
        {/* Sub Box (Form) */}
        <form
          className="w-[360px] h-[565px] flex flex-col gap-[24px] items-center justify-start "
          onSubmit={handleUpdatePassword}
        >
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
              LOGIN
            </h1>

            <div className=" text-[#666060] text-[16px] font-inter font-medium leading-[19px] text-center ">
              Welcome To Admin Panel
            </div>
          </div>

  <div className="w-[360px] h-[259px] bg-white flex flex-col gap-6">
            <div className="relative w-full">
            <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter New Password"
              className="w-full h-full p-4 pl-12 border border-[#D9D9D9] bg-[#F8F5FF] text-black placeholder-gray-500 outline-none text-[16px] rounded-[8px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!showPassword ? (
              <IoEye
                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <IoEyeOff
                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>

          {/* Confirm Password */}
         <div className="relative w-full ">
            <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm  New Password"
             className="w-full h-full p-4 pl-12 border border-[#D9D9D9] bg-[#F8F5FF] text-black placeholder-gray-500 outline-none text-[16px] rounded-[8px]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {!showConfirmPassword ? (
              <IoEye
               className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                onClick={() => setShowConfirmPassword(true)}
              />
            ) : (
              <IoEyeOff
               className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                onClick={() => setShowConfirmPassword(false)}
              />
            )}
          </div>

          {/* Error Message */}
          {passwordError && (
            <p className="text-red-600 text-[14px]">{passwordError}</p>
          )}

          {/* Update Password Button */}
<button
  type="submit"
  onClick={() => navigate("/password-reset-successfully")}
  className="w-[360px] h-[56px] bg-[#004AAD] text-white font-semibold rounded-[8px] p-4 
             shadow-[0px_2px_4px_0px_#EC2D0140] opacity-100 
             hover:bg-[#003A8C] focus:outline-none focus:ring-2 focus:ring-[#004AAD] 
             transition-all duration-0 ease-linear flex items-center justify-center"
>
<span className="w-[136px] h-[19px] flex items-center justify-center font-inter font-medium text-[16px] leading-[100%] text-center text-white">
    Update Password
  </span>

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

export default ResetPassword;
