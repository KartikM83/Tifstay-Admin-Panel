import React from "react";
import { FaChevronDown } from "react-icons/fa6";
import profile from '../../assets/profile.jpg';
import logo from '../../assets/image.png';

function Navbar(){

    return(

    <div
  className="fixed w-full h-[72px] bg-[#DFE1E6] p-4 flex items-center justify-between z-[100]"
  style={{ boxShadow: '0 4px 8px -2px rgba(0, 0, 0, 0.1)' }}
>
            <div className="w-[246.01px] h-[56px] flex items-center gap-[16px]">
                <img src={logo} alt="image"></img>
            </div>


            <div className="flex items-center gap-6 auto h-[40px]">
                <img src={profile} alt="user" className="w-10 h-10 rounded-full object-cover" />
        
                <FaChevronDown className="w-6 h-6" />
            </div>
            


        </div>




    )
}

export default Navbar;