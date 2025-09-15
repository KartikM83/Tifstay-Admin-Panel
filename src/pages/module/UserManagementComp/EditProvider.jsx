import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import logo from "../../../assets/image.png";
import roleConfig from "./roleConfig";

function EditProvider({ users, setUsers }) {
  
  const navigate = useNavigate();
  const { id, role } = useParams();
  const [isEditable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // find user early
  const user = users.find((u) => u.id === parseInt(id));

  // define states safely (with fallback values if user is undefined)
  const [profile, setProfile] = useState(user?.profile ?? "");
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  
  const [address, setAddress] = useState(user?.address ?? "");
 
  const [password, setPassword] = useState(user?.password ?? "");
  const [accountNumber, setAccountNumber] = useState(user?.accountNumber ?? "");
  const [ifscCode, setIfscCode] = useState(user?.ifscCode ?? "");
  const [accountType, setAccountType] = useState(user?.accountType ?? "");
  const [accountHolderName, setAccountHolderName] = useState(user?.accountHolderName ?? "");

  const cfg = roleConfig[role] ?? roleConfig.guests;

  // now safely return if user not found
  if (!user) {
    return (
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold">Guest Details</h2>
        <p>No user data found for ID: {id}</p>
      </div>
    );
  }

  
  const handleConfirm =()=>{
    setUsers((prev)=>
      prev.map((u)=>u.id === user.id? {...u,status: u.status ==="Active" ?"Blocked" :"Active"}:u)


  );
  setShowPopup(false);
  }

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Title Bar */}
      <div className="w-full h-[72px] flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm">
        <IoArrowBackCircleOutline
          className="w-[33.33px] h-[33.33px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-[24px] font-medium leading-none">
          {cfg.detailsTitle}
        </h2>
      </div>

      {/* Main Card */}
      <div className="bg-white px-4 py-4 flex flex-col gap-6 items-center">
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
          {/* Profile Info */}

          {/* Form Section */}

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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
                  onChange={(e)=>setAccountHolderName(e.target.value)}
                  placeholder="Mahesh Pawar"
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">

            <button onClick={()=>setShowPopup(true)} className={`w-[200px] h-[40px] border border-[#004AAD] rounded-[8px] text-[#004AAD] ${isEditable ===true ? "hidden" :""}`}>
          {user.status === "Active"?"Block":"Unblock"}
        </button>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[450px]  flex flex-col gap-4  items-center">
              <img src={logo} alt="" className="w-[246px] h-[56px] "/>
              <h2 className="text-lg font-semibold">{user.status=="Active" ? "Block User" : "Unblock User"}</h2>
              <p className="text-[#666060] text-[16px] font-inter font-regular font-semibold text-center ">
                  {user.status === "Active"
                              ? "Are you sure you want to block this user?"
                              : "Are you sure you want to unblock this user?"}
              </p>

                 <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="w-[200px] h-[40px] rounded-[8px] border border-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="w-[200px] h-[40px] rounded-[8px] bg-[#004AAD] text-white"
              >
                {user.status === "Active" ? "Block" : "Unblock"}
              </button>
            </div>
                          
            </div>

          </div>
        )}
            <NavLink to={`/users/${role}/edit/${user.id}`}
            >
               <button  className="w-[200px] h-[40px] bg-[#004AAD] rounded-[8px] text-white">
          Edit
        </button>
            </NavLink>
           
       
        </div>
        
      </div>
    </div>
  );
}

export default EditProvider;
