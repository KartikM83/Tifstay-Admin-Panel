import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import logo from "../../../assets/image.png";
import checkmark from "../../../assets/right.png";
function EditTiffinDetails({ users, setUsers }) {
  const navigate = useNavigate();
  const { id } = useParams(); // get id from route

  // find the user by id
  const selectedUser = users.find((u) => String(u.id) === id);

  // initialize state from selectedUser
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [priceDay, setPriceDay] = useState("");
  const [priceWeekly, setPriceWeekly] = useState("");
  const [priceMonthly, setPriceMonthly] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [offer, setOffer] = useState("");
   const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name || "");
      setType(selectedUser.type || "");
      setDescription(selectedUser.description || "");
      setPriceDay(selectedUser.priceDay || "");
      setPriceWeekly(selectedUser.priceWeekly || "");
      setPriceMonthly(selectedUser.priceMonthly || "");
      setSecurityDeposit(selectedUser.securityDeposit || "");
      setOffer(selectedUser.offer || "");
    }
  }, [selectedUser]);

  const handleChange = (e, setter) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && Number(value) >= 0)) {
      setter(value);
    }
  };

  const increment = (value, setter) =>
    setter((prev) => Number(prev || 0) + 1);
  const decrement = (value, setter) =>
    setter((prev) => Math.max(0, Number(prev || 0) - 1));

  const handleUpdate = () => {
    // update user in state
    const updatedUsers = users.map((u) =>
      String(u.id) === id
        ? {
            ...u,
            name,
            type,
            description,
            priceDay,
            priceWeekly,
            priceMonthly,
            securityDeposit,
            offer,
          }
        : u
    );
    setUsers(updatedUsers);

    setShowPopup(true)
    // navigate(-1);
  };

  if (!selectedUser) {
    return <div className="p-6 text-red-600">❌ User not found</div>;
  }

  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
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
          Listing Management / Edit PG or Hostel
        </h2>
      </div>

      {/* Main Form */}
      <div className="bg-white px-4 py-4 flex flex-col gap-6 items-center">
        <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow border border-[#A5A5A5] flex flex-col gap-6">
          {/* Basic Information */}
          <div className="p-4 border border-[#A5A5A5] rounded-[16px] flex flex-col gap-4">
            <div className="text-[#0A051F] text-xl font-semibold">
              Basic Information
            </div>

            <div className="flex gap-4">
              {/* Hostel Name */}
              <div className="flex flex-col w-full gap-1">
                <label className="text-[14px] font-medium text-[#0A051F]">
                  Tiffin/Restaurant Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter hostel name"
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                />
              </div>

              {/* Hostel Type */}
              <div className="flex flex-col w-full gap-1">
                <label className="text-[14px] font-medium text-[#0A051F]">
                  Description *
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your hostel, amenities, and what makes it special..."
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div className="min-h-[125px] bg-red-600">

                <h2 className="font-inter font-medium text-[14px] ">Meal Preference</h2>

                <div className="flex justify-between">
                    <div className="min-w-[318px] min-h-[97px] bg-blue-600">
                        <label
      className="flex items-center gap-2 font-inter text-[14px] text-[#252525] cursor-pointer"
      onClick={toggleCheckbox}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleCheckbox}
        className="hidden"
      />
      <span className={`w-5 h-5 flex items-center justify-center border border-gray-400 rounded ${checked ? "bg-blue-500" : ""}`}>
        {checked && <img src={checkmark} alt="checked" />}
      </span>
      Breakfast (7:00 AM - 9:00 AM)
    </label>

                    </div>
                    <div className="min-w-[318px] min-h-[97px] bg-blue-600"></div>
                    <div className="min-w-[318px] min-h-[97px] bg-blue-600"></div>
                </div>
              
            </div>
          </div>

          
          
        </div>

        {/* Update Button */}
        <div className="flex gap-4">
          <button
            onClick={handleUpdate}
            className="w-[200px] h-[40px] bg-[#004AAD] rounded-[8px] text-white"
          >
            Update
          </button>
        </div>

        {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40" onClick={()=>navigate(-1)}>
          <div className="bg-white rounded-lg shadow-lg p-6 w-[360px] flex flex-col gap-2 items-center">
            <img src={logo} alt="Logo" className="w-[246px] h-[56px]" />
            <h2 className="text-[24px] font-semibold text-[#0A051F]">
              Listing Updated!
            </h2>
            <p className="text-[#666060] text-[16px] font-inter font-semibold text-center">
              Your PG/Hostel details has been updated now.
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default EditTiffinDetails;
