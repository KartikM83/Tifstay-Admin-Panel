import React from 'react';
import bg from "../../assets/image.png";
import { useNavigate } from "react-router-dom";

const PasswordResetSuccessfully = () => {
  const navigate = useNavigate();

  return (
   <div className="w-full h-screen flex justify-center items-center bg-[#DFE1E6]">
      <div className="w-[700px] h-[700px] bg-white rounded-[24px] shadow-lg flex flex-col items-center justify-start p-10 ">

        {/* Sub Box (form elements) */}
        <form className="w-[360px] h-[565px] flex flex-col gap-[24px] items-center justify-center ">

          {/* Logo Box */}
         <div className="w-[259px] h-[203px] flex flex-col justify-center items-center ">
                     <img
                       src={bg}
                       alt="App Logo"
                       className="w-full h-full object-contain"
                     />

                     <div className=" w-[360px] h-[56px]  text-black text-[30px] font-semibold text-center flex flex-col items-center justify-center gap-2  ">
                     <h1 className="text-[#0A051F] text-[24px] font-inter font-semibold  leading-[100%] tracking-[0%] flex items-center justify-center text-center ">
                       {" "}
                       CONGRATS
                     </h1>
         
                     <div className=" text-[#666060] text-[16px] font-inter font-medium leading-[19px] text-center ">
                       Password Reset Successful
                     </div>
                   </div>

                   
          <div onClick={() => navigate("/")}
            className="mt-8 w-[81px] h-[19px] text-[16px] leading-[100%] font-inter font-medium text-center text-[#004AAD] flex items-center justify-center cursor-pointer select-none"
          >
            Login Now
          </div>
                   </div>
         
                   



        </form>




      </div>

    </div>





  );
};


export default PasswordResetSuccessfully;