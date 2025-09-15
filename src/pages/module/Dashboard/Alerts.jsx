import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { TbCalendarTime } from "react-icons/tb";
import { TbMessageQuestion } from "react-icons/tb";
import { FaRegClock, FaRegStar } from "react-icons/fa";

const Alerts = () => {
  const navigate = useNavigate();

  const alerts = [
    {
      id: 1,
      title: "Vendor license expired",
      date: "September 30, 2023, 10:00AM",
      vendor: "Vikram Joshi",
      subject: "Vendor license is expired",
      bg: "bg-[#EBF6FE]",
      icon: <TbCalendarTime className="w-6 h-6 text-[#004AAD]" />,
    },
    {
      id: 2,
      title: "KYC pending",
      date: "September 30, 2023, 10:00AM",
      vendor: "Vikram Joshi",
      subject: "Inquiry about Pending KYC",
      bg: "bg-[#FCEBFE]",
      icon: <TbCalendarTime className="w-6 h-6 text-[#004AAD]" />,
    },
    {
      id: 3,
      title: "High refund rate",
      email: "Rahul124@example.com",
      contact: "9645-878-224",
      received: "September 28, 2025, 2:15 PM",
      subject: "Inquiry about High refund rate",
      bg: "bg-[#EBF6FE]",
      icon: <TbMessageQuestion className="w-6 h-6 text-[#004AAD]" />,
    },
    {
      id: 4,
      title: "Low ratings",
      vendor: "Green valley boys hostel",
      received: "September 29, 2025, 2:15 PM",
      subject: "Inquiry about low ratings",
      bg: "bg-[#FCF4EE]",
      icon: <TbMessageQuestion className="w-6 h-6 text-[#004AAD]" />,
    },
  ];

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Header Bar */}
      <div className="w-full h-[72px] flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm">
        <IoArrowBackCircleOutline
          className="w-[33.33px] h-[33.33px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-[24px] font-medium leading-none">
          Dashboard / Alerts
        </h2>
      </div>

      {/* Alerts Section */}
      <div className="w-full min-h-[600px] p-4 rounded-[8px] bg-white shadow border border-[#D9D9D9] flex flex-col gap-4">
        <div className="w-full h-full rounded-[8px] border border-[#A5A5A5] p-6 flex flex-col gap-6">
          <h3 className="font-semibold text-[24px] text-[#272727] flex gap-2 items-center">
            <GoBell className="w-6 h-6" /> See All Alerts
          </h3>

          <div className="flex flex-col gap-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-xl p-4 flex flex-col gap-2 ${alert.bg}`}
              >
                <div className="flex gap-2">
                {alert.icon}
                <div className="flex flex-col  gap-2 font-medium text-[18px] text-[#1F2937]">
                  {/* {alert.icon} */}
                  {alert.title}

                  {alert.date && (
                  <p className="text-sm text-gray-700">
                    <strong>Date & Time:</strong> {alert.date}
                  </p>
                )}

                {alert.vendor && (
                  <p className="text-sm text-gray-700">
                    <strong>Vendor / Name:</strong> {alert.vendor}
                  </p>
                )}

                {alert.email && (
                  <p className="text-sm text-gray-700">
                    <strong>Email:</strong> {alert.email}
                  </p>
                )}
                {alert.contact && (
                  <p className="text-sm text-gray-700">
                    <strong>Contact Number:</strong> {alert.contact}
                  </p>
                )}
                {alert.received && (
                  <p className="text-sm text-gray-700">
                    <strong>Received:</strong> {alert.received}
                  </p>
                )}
                <p className="text-sm font-medium text-green-600">
                  Subject: {alert.subject}
                </p>
                </div>
                
                
                
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
