import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdEmail, MdLock } from "react-icons/md";
import { UserDataContext } from "../../context/userContext";
import bg from "../../assets/image.png";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      setUserData(result.data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setUserData(null);
      setLoading(false);
      setErr(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#DFE1E6]">
      <div className="w-[700px] h-[700px] bg-white rounded-[24px] shadow-lg flex flex-col items-center justify-start p-10 ">
        <form className="w-[360px] h-[565px] flex flex-col gap-[24px] items-center justify-start "  onSubmit={handleSignIn}>
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

            <div className="relative w-full ">
              {/* Left Icon - Lock */}
              <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />

              {/* Password Input */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-4 pl-12 pr-12 border border-[#D9D9D9] bg-[#F8F5FF] text-black placeholder-gray-500 outline-none text-[16px] rounded-[8px]"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              {showPassword ? (
                <IoEyeOff
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoEye
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            {err && <p className="text-red-600 text-[17px]">{err}</p>}

            <div>
              <p
              className="w-[138px] h-[19px] text-[#0A051F] text-[16px] font-inter font-medium leading-[19px] tracking-[0px] text-center align-middle cursor-pointer mx-auto"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </p>

            <button
              type="button"
              className="w-[360px] h-[56px] mt-6 text-white font-semibold 
             bg-[#004AAD] rounded-lg px-4 
             shadow-[0px_2px_4px_0px_#EC2D0140] 
             transition-all duration-0 ease-linear"
              disabled={loading}
              onClick={() =>
                navigate("/verify-otp", { state: { from: "login" } })
              }
            >
              {loading ? "Loading..." : "Log In"}
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
