import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import roleConfig from "./roleConfig";

function CreateOwner({ setUsers }) {
  const navigate = useNavigate();

   const { role } = useParams(); 
   const cfg = roleConfig[role] ?? roleConfig.guests;







 const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob ] = useState("");
  const [address, setAddress] = useState("");
  const [status] = useState("Active");
  const [aadhaar] = useState("");
  const [password, setPassword] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");



  const handleCreate = () => {

    if (
    !name.trim() ||
    !profile.trim() ||
    !phone.trim() ||
    !email.trim() ||
    !address.trim() ||
    !password.trim() ||
    !accountNumber.trim() ||
    !ifscCode.trim() ||
    !accountType.trim() ||
    !accountHolderName.trim()
  ) {
    alert("All fields are required. Please fill in all details.");
    return;
  }


  const newUser = {
    id: Date.now(), // Unique ID
    name,
    profile,
    phone,
    email,
    dob, 
    address,
    status, 
    aadhaar, 
    password,
    accountNumber,
    ifscCode,
    accountType,
    accountHolderName,
    
  };

  setUsers((prevUsers) => [...prevUsers, newUser]);

  // Optional: Navigate back to user list or details page
  navigate(-1);
};

  

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Title Bar */}
      <div className="w-full h-[72px] flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm">
        <IoArrowBackCircleOutline
          className="w-[33.33px] h-[33.33px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-[24px] font-medium leading-none">
          {cfg.createTitle}
        </h2>
      </div>

      {/* Main Card */}
      <div className="bg-white px-4 py-4 flex flex-col gap-6 items-center">
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow border border-[#D9D9D9] flex flex-col gap-6 border border-[#A5A5A5]">
         

          <div className=" p-4 border border-[#A5A5A5] rounded-[16px] flex flex-col gap-4">
            <div className="text-gray-700 text-xl font-semibold">
              Basic Information
            </div>

            {/* Row 1 */}

            <div className="flex gap-4 ">
              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Name:
                </label>
                <input
                  type="text"
                  value={name}
                  
                  onChange={(e)=>setName(e.target.value)}
                 placeholder="Mahesh Pawar"
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                  
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Profile
                </label>
                <input
                  type="text"
                  value={profile}
                
                  onChange={(e)=>setProfile(e.target.value)}
                  placeholder="PG/Hostel Owner"
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-4 ">
              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Phone Number:
                </label>
                <input
                  type="text"
                  value={phone}
                
                  onChange={(e)=>{
                    const value = e.target.value;
                    if(/^\d*$/.test(value)){
                      setPhone(value);
                    }
                  }}
                  placeholder="9876543210"
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                 
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Email ID:
                </label>
                <input
                  type="email"
                  value={email}
                  
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                  
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-4 ">
              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Password:
                </label>
                <input
                  type="text"
                  value={password}
                 
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="SDBH@2025"
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                  
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Address:
                </label>
                <input
                  type="text"
                  value={address}
                 
                  onChange={(e)=>setAddress(e.target.value)}
                  placeholder="4517 Washington Ave. Manchester, Kentucky 39495"
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                 
                />
              </div>
            </div>
          </div>

          <div className=" p-4 border border-[#A5A5A5] rounded-[16px] flex flex-col gap-4">
            <div className="text-gray-700 text-xl font-semibold">
              Bank Details
            </div>

            {/* Row 1 */}

            <div className="flex gap-4 ">
              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Account Number:
                </label>
                <input
                  type="text"
                  placeholder="98765432101"
                  maxLength={18}
                  value={accountNumber}
                  
                  onChange={(e)=>{
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setAccountNumber(value);
                    }
                   
                  }}
                  
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                 
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  IFSC Code:
                </label>
                <input
                  type="text"
                  value={ifscCode}
                  
                  onChange={(e)=>setIfscCode(e.target.value)}
                  placeholder="SBIN0001234"
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                 
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-4 ">
              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Account Type
                </label>
                <input
                  type="text"
                  value={accountType}
                 
                  onChange={(e)=>setAccountType(e.target.value)}
                  placeholder="Current"
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                 
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Account holder name:
                </label>
                <input
                  type="text"
                  value={accountHolderName}
                  
                  onChange={(e)=>setAccountHolderName(e.target.value)}
                  placeholder="Mahesh Pawar"
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">

            
            
            <button onClick={handleCreate} className="w-[200px] h-[40px] bg-[#004AAD] rounded-[8px] text-white">
          Create
        </button>
        </div>
        
      </div>
    </div>
  );
}

export default CreateOwner;
