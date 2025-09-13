import { IoArrowBackCircleOutline } from "react-icons/io5";
import profile from "../../../assets/profile.png";
import aadhaar from "../../../assets/Aadhaar_Card.png";
import {  useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import logo from "../../../assets/image.png";

function GuestDetails({ users, setUsers }) {
  const navigate = useNavigate();
 
  const { id } = useParams();

  const user = users.find((u) => u.id === parseInt(id));
  const [showPopup, setShowPopup] = useState(false);

  if (!user) {
    return (
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold">Guest Details</h2>
        <p>No user data found for ID: {id}</p>
      </div>
    );
  }

  const handleConfirm = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
          : u
      )
    );
    setShowPopup(false);
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
          User Management / Guest / Guest Details
        </h2>
      </div>

      {/* Main Card */}
      <div className="bg-white px-4 py-4 flex flex-col gap-6 items-center">
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
          {/* Profile Info */}
          <div className="flex flex-col items-center">
            <img
              src={profile}
              alt="profile"
              className="w-[100px] h-[100px] rounded-[10px]"
            />
            <h2 className="font-medium text-[24px]">{user.name}</h2>
            <p className="text-[14px] text-[#1DB435] font-medium">DigiLocker</p>
          </div>

          {/* Form Section */}
          <div className="p-6 flex flex-col gap-6 rounded border">
            <div className="text-gray-700 text-xl font-semibold">
              Profile Information
            </div>

            {/* Row 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Profile:
                </label>
                <input
                  type="text"
                  value={user.profile}
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                  readOnly
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Phone Number:
                </label>
                <input
                  type="text"
                  value={user.phone}
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                  readOnly
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Email ID:
                </label>
                <input
                  type="email"
                  value={user.email}
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                  readOnly
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="dob" className="text-sm font-medium text-gray-600">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  id="dob"
                  value={user.dob}
                  readOnly
                  className="border p-2 rounded"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Address:
                </label>
                <input
                  type="text"
                  value={user.address}
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                  readOnly
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Status:
                </label>
                <input
                  type="text"
                  value={user.status}
                  className={`bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none ${
                    user.status === "Active" ? "text-green-600" : "text-red-600"
                  }`}
                  readOnly
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex gap-4">
              <div className="flex flex-col w-full gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Aadhaar Number:
                </label>
                <input
                  type="text"
                  value={user.aadhaar}
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                  readOnly
                />
              </div>

              <div className="w-full">
                <label className="text-sm font-medium text-gray-600">
                  Aadhaar Card:
                </label>
                <div className="h-[280px] rounded-[8px] border-2 border-[#666060] overflow-hidden">
                  <img src={aadhaar} alt="" className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowPopup(true)}
          className={`w-[200px] h-[40px] flex justify-center items-center rounded-[8px] border ${
            user.status === "Active"
              ? "border-[#004AAD] text-[#004AAD]"
              : "border-[#004AAD] text-[#004AAD]"
          }`}
        >
          {user.status === "Active" ? "Block" : "Unblock"}
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[450px]   gap-4 flex flex-col items-center">
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
    </div>
  );
}

export default GuestDetails;
