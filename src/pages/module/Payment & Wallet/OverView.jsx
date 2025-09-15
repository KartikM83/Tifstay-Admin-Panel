import Sidebar from "../../../Component/Layouts/Sidebar";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { PiFunnel } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEye } from "react-icons/fi";

import { FaRegEdit } from "react-icons/fa";

import paymentConfig from "./PaymentConfig";
import { useParams } from "react-router-dom";
import NotFound from "../offers&Discount/NotFound";

function OverView() {
  const { payment } = useParams();
  const cfg = paymentConfig[payment];
 


  const [filterOpen, setFilterOpen] = useState(true); // ✅ Filter box open by default
  const [selectedStatus, setSelectedStatus] = useState(["Today"]);

  const [searchQuery, setSearchQuery] = useState("");
  const [setCurrentPage] = useState(1);

   if (!cfg) {
    return <NotFound />;
  }
  const toggleStatus = (status) => {
    if (selectedStatus[0] === status) return; // Do nothing if already selected
    setSelectedStatus([status]);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Header Bar */}
      <div className="w-full h-[72px] flex items-center  gap-16 bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-[24px] font-medium leading-none">
          {cfg.listTitle}
        </h2>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-[300px] h-[40px] border rounded-full px-4">
          <IoIosSearch className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder={cfg.search}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset to first page on new search
            }}
            className="flex-1 outline-none text-[16px] font-medium placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="relative w-full min-h-[600px] p-4 rounded-[8px] bg-white shadow border border-[#D9D9D9] flex flex-col gap-4 font-inter">
        <div className="w-full min-h-[270px] rounded-[8px] border border-[#A5A5A5] p-6 flex flex-col gap-6 ">
          <div className="w-full flex justify-between min-h-[28px] bg-red-600 items-center">
            <h2 className="font-medium text-[24px] text-[#0A051F]">
              Payment Overview
            </h2>

            {/* Filter Funnel */}
            <div className="min-w-[120px] h-[32px] rounded-[8px] border-[1.5px] border-[#A5A5A5] px-2 flex justify-center items-center gap-2">
              <PiFunnel
                className="w-[18px] h-[18px] text-[#004AAD] cursor-pointer"
                onClick={() => setFilterOpen(!filterOpen)}
              />
              <span className="text-[#004AAD]">{selectedStatus[0]}</span>
            </div>

            {/* Filter Box */}
            {filterOpen && (
              <div className="absolute top-12 right-24 w-[168px] min-h-[161px] bg-white border rounded-md shadow-lg p-2 z-10">
                <div className="min-h-[40px] flex justify-between p-2">
                  <span className="font-semibold text-[16px] text-[#0D2E28]">
                    Day
                  </span>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="w-[16px] h-[16px] text-[#0A051F] text-sm"
                  >
                    ✕
                  </button>
                </div>

                {/* Filter Options */}
                {["Today", "This Week", "This Month"].map((status) => (
                  <label
                    key={status}
                    className={`flex items-center gap-2 mb-2 px-2 py-1 rounded cursor-pointer ${
                      selectedStatus[0] === status
                        ? "text-[#FF6B00] font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatus[0] === status}
                      onChange={() => toggleStatus(status)}
                      className="hidden"
                    />
                    <span
                      className={`w-5 h-5 flex items-center justify-center border rounded ${
                        selectedStatus[0] === status
                          ? "bg-[#FF6B00] border-[#FF6B00] text-white"
                          : "border-gray-400 text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                    {status}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="w-full min-h-[166px] bg-red-600">
            <div
              className="w-[338px] h-[166px] bg-blue-600 rounded-[16px] p-6"
              style={{
                background:
                  "linear-gradient(180deg, #FFE7D6 0.86%, #F7E8DE 55.15%, #ECE9E9 76.27%)",
              }}
            >
              <div className="w-[290px] h-[127px] "></div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverView;
