import React from "react";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const OverviewPage = ({ title, data = [] }) => {
  const navigate = useNavigate();

  return (
     <div className="flex flex-col gap-6 font-inter">
      {/* Header */}
      <div className="w-full h-[72px] flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm">
        <IoArrowBackCircleOutline
                  className="w-[33.33px] h-[33.33px] cursor-pointer"
                  onClick={() => navigate(-1)}
                />
        <h2 className="text-[24px] font-medium leading-none">Dashboard / {title}</h2>
      </div>

        
      {/* Cards */}
      {data.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <div className="bg-white px-4 py-4 flex flex-col gap-6 items-center">
        <div className="w-full min-h-[600px] p-4 rounded-[8px] bg-white shadow  gap-6 border border-[#A5A5A5]">
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-10">
          {data.map((item, index) => (
            <div
              key={item.title || index}
              className="w-[317px] h-[214px] rounded-[16px] border border-[#A5A5A5] p-4 flex flex-col gap-6"
            >
              {/* Title + Calendar */}
              <div className="flex justify-between ">
                <h3 className={`font-medium text-[20px] ${item.color}`}>{item.title}</h3>
                <FaCalendarAlt className={`w-6 h-6 ${item.color} cursor-pointer`} />
              </div>

              
              <div className="flex flex-col gap-6 mt-6">
                <p className={`font-semibold text-[26px] ${item.color} `}>{item.value}</p>

              {/* Percentage */}
              <p
                className={`mt-2 text-sm ${
                  item.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.percent}
              </p>
              </div>
            </div>
          ))}
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default OverviewPage;
