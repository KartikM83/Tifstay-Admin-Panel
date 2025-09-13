import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Navigate, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import logo from "../../../assets/image.png";
import bookingConfig from "./BookingConfig";
import userProfile from "../../../assets/profile.png";

function EditProvider({ users, setUsers }) {
  const navigate = useNavigate();
  const location = useLocation();
const { id } = useParams();
const [isEditable ,setIsEditable] = useState(false);
 const [showPopup, setShowPopup] = useState(false);
 const { booking } = useParams(); 
const cfg = bookingConfig[booking] ?? bookingConfig.guests;



    const user = users.find((u) => u.id === parseInt(id));
  //   const [showPopup, setShowPopup] = useState(false);

    if (!user) {
      return (
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Guest Details</h2>
          <p>No user data found for ID: {id}</p>
        </div>
      );
    }


const [profile, setProfile] = useState(user.profile);
const [name, setName] = useState(user.name);
const [phone, setPhone] = useState(user.phone);
const [email, setEmail] = useState(user.email);
const [dob, setDob] = useState(user.dob);
const [address, setAddress] = useState(user.address);
const [status, setStatus] = useState(user.status);
const [aadhaar, setAadhaar] = useState(user.aadhaar);
const [password, setPassword] = useState(user.password);
const [accountNumber, setAccountNumber] = useState(user.accountNumber);
const [ifscCode, setIfscCode] = useState(user.ifscCode);
const [accountType, setAccountType] = useState(user.accountType);
const [accountHolderName, setAccountHolderName] = useState(user.accountHolderName);

  //   const handleConfirm = () => {
  //     setUsers((prev) =>
  //       prev.map((u) =>
  //         u.id === user.id
  //           ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
  //           : u
  //       )
  //     );
  //     setShowPopup(false);
  //   };

  const handleSave=()=>{
    const updateUser ={
      ...user,
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

    setUsers((prevUser)=>
      prevUser.map((u)=>(u.id ===user.id ?updateUser:u))
    );
    setIsEditable(false);
  };

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
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow border border-[#D9D9D9] flex flex-col gap-6 border border-[#A5A5A5]">
          {/* Profile Info */}

          {/* Form Section */}

          <div className=" p-4 border border-[#A5A5A5] rounded-[16px] flex flex-col gap-4">
            <h2 className="text-[#0A051F] text-[24px] font-semibold">
             Booking Details
            </h2>

            {/* Row 1 */}

            <div className="flex gap-4 ">
              <div className="flex flex-col w-full gap-1">
                <label className="text-[16px] font-medium text-[#666060]">
                  Booking Id:
                </label>
                <input
                  type="text"
                  value={user.customerName}
                  readOnly
                 placeholder="Mahesh Pawar"
                  className="bg-white border border-[#A5A5A5] rounded-[8px] px-4 py-3 outline-none"
                  
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="text-[16px] font-medium text-[#666060]">
                  Booking Date :
                </label>
                <input
                  type="text"
                  value={user.dob}
                  readOnly
                  placeholder="PG/Hostel Owner"
                  className="bg-white border border-[#A5A5A5] rounded-[8px] px-4 py-3 outline-none"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-4 mr-4">
              <div className="flex flex-col w-1/2 gap-1 ">
                <label className="text-[16px] font-medium text-[#666060]">
                  Booking Status :
                </label>
                <input
                  type="text"
                  value={user.status}
                  readOnly
                  placeholder="9876543210"
                  className={`bg-white border border-[#A5A5A5] rounded-[8px] px-4 py-3 outline-none ${
                      user.status === "Confirmed"
                        ? "text-[#34C759]"
                        : user.status==="Pending" ?"text-[#FFCC00]":"text-[#FF383C]"
                    }`}
                 
                />
              </div>
             
            </div>

           
          </div>

          <div className=" p-4 border border-[#A5A5A5] rounded-[16px] flex flex-col gap-4">
            <h2 className="text-[#0A051F] text-[24px] font-semibold">
              Customer Details
            </h2>

            <div className="min-w-[290px] min-h-[100px] flex gap-2 items-center ">
                <img src={userProfile} alt="userProfile"  className="w-[100px] h-[100px] rounded-[8px]"/>
                <h3 className="font-medium text-[24px]">Vijay Karmarkar</h3>
            </div>

            {/* Row 1 */}

            <div className="flex gap-4 ">
              <div className="flex flex-col w-full gap-1">
                <label className="text-[16px] font-medium text-[#666060]">
                  Profile :
                </label>
                <input
                  type="text"
                  value={user.profile}
                  readOnly
                  className="bg-white border border-[#A5A5A5] rounded-[8px] px-4 py-3 outline-none"
                 
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="text-[16px] font-medium text-[#666060]">
                  Phone Number :
                </label>
                <input
                  type="text"
                  value={user.phoneNumber}
                  readOnly
                  className="bg-white border border-[#A5A5A5] rounded-[8px] px-4 py-3 outline-none"
                 
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-4 ">
              <div className="flex flex-col w-full gap-1">
                <label className="text-[16px] font-medium text-[#666060]">
                  Email Id :
                </label>
                <input
                  type="text"
                  value={user.email}
                  readOnly
                  className="bg-white border border-[#A5A5A5] rounded-[8px] px-4 py-3 outline-none"
                 
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label className="text-[16px] font-medium text-[#666060]">
                  Date Of Birth :
                </label>
                <input
                  type="text"
                  value={user.dob}
                  readOnly
                  className="bg-white border border-[#A5A5A5] rounded-[8px] px-4 py-3 outline-none"
                />
              </div>
            </div>
            <div className="flex gap-4 mr-4">
              <div className="flex flex-col w-1/2 gap-1 mr-4">
                <label className="text-[16px] font-medium text-[#666060]">
                  Address :
                </label>
                <input
                  type="text"
                  value={user.address}
                  readOnly
                  className="bg-white border border-[#A5A5A5] rounded-[8px] px-4 py-3 outline-none"
                 
                />
              </div>
              </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
}

export default EditProvider;
