import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../../assets/image.png";
import checkmark from "../../../assets/right.png";
import { FaRegClock } from "react-icons/fa";

function EditTiffinDetails({ users, setUsers }) {
  const navigate = useNavigate();
  const { id } = useParams();

  // find selected user
  const selectedUser = users.find((u) => String(u.id) === id);

  // states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceDay, setPriceDay] = useState("");
  const [priceWeekly, setPriceWeekly] = useState("");
  const [priceMonthly, setPriceMonthly] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [offer, setOffer] = useState("");
  const [foodType, setFoodType] = useState("");
  const [includes, setIncludes] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [mealOptions, setMealOptions] = useState([
    { label: "Breakfast (7:00 AM - 9:00 AM)", checked: false, start: "", end: "" },
    { label: "Lunch (12:00 PM - 2:00 PM)", checked: false, start: "", end: "" },
    { label: "Dinner (7:00 PM - 9:00 PM)", checked: false, start: "", end: "" },
  ]);

  const [orderType, setOrderType] = useState([
    { label: "Dining", checked: false },
    { label: "Delivery", checked: false },
  ]);

  // pre-fill from selectedUser
  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name || "");
      setDescription(selectedUser.description || "");
      setPriceDay(selectedUser.priceDay || "");
      setPriceWeekly(selectedUser.priceWeekly || "");
      setPriceMonthly(selectedUser.priceMonthly || "");
      setSecurityDeposit(selectedUser.securityDeposit || "");
      setOffer(selectedUser.offer || "");
      setFoodType(selectedUser.foodType || "");

      // meal preference & timing
      if (selectedUser.mealPreference) {
        setMealOptions((prev) =>
          prev.map((opt) => ({
            ...opt,
            checked: selectedUser.mealPreference.startsWith(opt.label.split("(")[0].trim()),
            start: selectedUser.deliveryTiming?.start || "",
            end: selectedUser.deliveryTiming?.end || "",
          }))
        );
      }

      // order type
      if (selectedUser.orderType) {
        setOrderType((prev) =>
          prev.map((opt) => ({
            ...opt,
            checked: opt.label === selectedUser.orderType,
          }))
        );
      }

      // includes (array → textarea string)
      if (selectedUser.includes) {
        setIncludes(selectedUser.includes.join("\n"));
      }
    }
  }, [selectedUser]);

  // helper: time options
  const generateTimeOptions = () => {
    const times = [];
    const format = (h, m) => {
      const hour = h % 12 || 12;
      const minute = m.toString().padStart(2, "0");
      const ampm = h < 12 ? "AM" : "PM";
      return `${hour}:${minute} ${ampm}`;
    };
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m++) {
        times.push(format(h, m));
      }
    }
    return times;
  };
  const timeOptions = generateTimeOptions();

  // toggle functions
  const toggleCheckbox = (index) => {
    const updated = mealOptions.map((opt, i) =>
      i === index ? { ...opt, checked: !opt.checked } : { ...opt, checked: false }
    );
    setMealOptions(updated);
  };

  const toggleOrderType = (index) => {
    const updated = orderType.map((opt, i) =>
      i === index ? { ...opt, checked: !opt.checked } : { ...opt, checked: false }
    );
    setOrderType(updated);
  };

  // update state when time selected
  const handleTimeChange = (index, field, value) => {
    const updated = [...mealOptions];
    updated[index][field] = value;
    updated[index].openPicker = null;
    setMealOptions(updated);
  };

  // update user
  const handleUpdate = () => {
    const selectedMeal = mealOptions.find((m) => m.checked);
    const selectedOrder = orderType.find((o) => o.checked);

    const updatedUsers = users.map((u) =>
      String(u.id) === id
        ? {
            ...u,
            name,
            description,
            priceDay,
            priceWeekly,
            priceMonthly,
            securityDeposit,
            offer,
            foodType,
            mealPreference: selectedMeal?.label || "",
            deliveryTiming: {
              start: selectedMeal?.start || "",
              end: selectedMeal?.end || "",
            },
            orderType: selectedOrder?.label || "",
            includes: includes.split("\n").filter((line) => line.trim() !== ""),
          }
        : u
    );
    setUsers(updatedUsers);
    setShowPopup(true);
  };

  if (!selectedUser) {
    return <div className="p-6 text-red-600">❌ User not found</div>;
  }

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Title Bar */}
      <div className="w-full h-[72px] flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm ">
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
          {/* Basic Info */}
          <div className="p-4 border border-[#A5A5A5] rounded-[16px] flex flex-col gap-6 ">
            <div className="text-[#0A051F] text-xl font-semibold">
              Basic Information
            </div>

            <div className="flex gap-4">
              {/* Name */}
              <div className="flex flex-col w-full gap-1">
                <label className="text-[14px] font-medium text-[#0A051F]">
                  Tiffin/Restaurant Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter tiffin/restaurant name"
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col w-full gap-1">
                <label className="text-[14px] font-medium text-[#0A051F]">
                  Description *
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your service..."
                  className="bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none"
                />
              </div>
            </div>

            {/* Meal Preference */}
            <div className="min-h-[125px] flex flex-col gap-[14px]">
              <h2 className="font-medium text-[14px]">Meal Preference</h2>
              <div className="flex justify-between gap-4 flex-wrap">
                {mealOptions.map((option, index) => (
                  <div key={index} className="min-w-[318px] flex flex-col gap-[14px]">
                    <label
                      className="flex items-center gap-2 text-[14px] text-[#252525] cursor-pointer"
                      onClick={() => toggleCheckbox(index)}
                    >
                      <input
                        type="checkbox"
                        checked={option.checked}
                        onChange={() => toggleCheckbox(index)}
                        className="hidden"
                      />
                      <span
                        className={`w-5 h-5 flex items-center justify-center border border-gray-400 rounded ${
                          option.checked ? "bg-[#FF6B00] border-none" : ""
                        }`}
                      >
                        {option.checked && (
                          <img src={checkmark} alt="checked" className="w-[10px] h-[10px]" />
                        )}
                      </span>
                      {option.label}
                    </label>

                    <h3 className="text-[14px]">Delivery Timing *</h3>
                    <div className="flex gap-[10px]">
                      {["start", "end"].map((field) => (
                        <div key={field} className="relative w-[155px]">
                          <input
                            type="text"
                            placeholder={field === "start" ? "Start Time" : "End Time"}
                            value={option[field]}
                            readOnly
                            className="w-full h-[41px] border border-gray-300 rounded-[8px] px-3 pr-8 outline-none cursor-pointer"
                          />
                          <FaRegClock
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => {
                              const updated = [...mealOptions];
                              updated[index].openPicker =
                                updated[index].openPicker === field ? null : field;
                              setMealOptions(updated);
                            }}
                          />
                          {option.openPicker === field && (
                            <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto w-full">
                              {timeOptions.map((time) => (
                                <div
                                  key={time}
                                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                  onClick={() => handleTimeChange(index, field, time)}
                                >
                                  {time}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Type */}
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-[14px] text-[#0A051F]">Food Type *</h3>
              {[
                { id: "veg", label: "Vegetarian Only" },
                { id: "non-veg", label: "Non-Vegetarian Only" },
                { id: "both", label: "Both Veg & Non-Veg" },
              ].map((option) => (
                <div key={option.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={option.id}
                    name="foodType"
                    value={option.id}
                    checked={foodType === option.id}
                    onChange={() => setFoodType(option.id)}
                    className="accent-[#004AAD] w-4 h-4"
                  />
                  <label htmlFor={option.id} className="text-[#666060] font-medium text-[14px]">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>

            {/* What's included */}
            <div className="flex flex-col w-full gap-1">
              <label className="text-[14px] font-medium text-[#0A051F]">
                What's included *
              </label>
              <textarea
                value={includes}
                onChange={(e) => setIncludes(e.target.value)}
                placeholder="One item per line (e.g., Paneer, Rice, Chapati...)"
                className="min-h-[92px] bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none resize-none"
              />
            </div>

            {/* Order Type */}
            <div className="min-h-[82px] flex flex-col gap-[14px]">
              {orderType.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 text-[14px] text-[#252525] cursor-pointer"
                  onClick={() => toggleOrderType(index)}
                >
                  <input
                    type="checkbox"
                    checked={option.checked}
                    onChange={() => toggleOrderType(index)}
                    className="hidden"
                  />
                  <span
                    className={`w-5 h-5 flex items-center justify-center border border-gray-400 rounded ${
                      option.checked ? "bg-[#FF6B00] border-none" : ""
                    }`}
                  >
                    {option.checked && (
                      <img src={checkmark} alt="checked" className="w-[10px] h-[10px]" />
                    )}
                  </span>
                  {option.label}
                </label>
              ))}
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
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40"
            onClick={() => navigate(-1)}
          >
            <div className="bg-white rounded-lg shadow-lg p-6 w-[360px] flex flex-col gap-2 items-center">
              <img src={logo} alt="Logo" className="w-[246px] h-[56px]" />
              <h2 className="text-[24px] font-semibold text-[#0A051F]">
                Listing Updated!
              </h2>
              <p className="text-[#666060] text-[16px] font-inter font-semibold text-center">
                Your tiffin/restaurant details have been updated.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditTiffinDetails;
