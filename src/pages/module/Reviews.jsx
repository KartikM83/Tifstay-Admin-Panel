import React, { useState, useEffect, useRef } from "react";
import { PiFunnel } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", rating: 2 },
  { day: "Tue", rating: 3 },
  { day: "Wed", rating: 6 },
  { day: "Thu", rating: 2.5 },
  { day: "Fri", rating: 4 },
  { day: "Sat", rating: 5.5 },
  { day: "Sun", rating: 4.2 },
];

const Reviews = () => {
  const filterRef = useRef(null);
  const buttonRef = useRef(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [reviewsData, setReviewsData] = useState([
    {
      id: 1,
      user: "John B",
      vendor: "Vendor A",
      rating: "★★★★★",
      review: "Fresh Food",
      date: "20/10/2025",
      status: "Pending",
    },
    {
      id: 2,
      user: "Aditya K",
      vendor: "Vendor B",
      rating: "★★★★★",
      review: "Loved the Food",
      date: "25/08/2025",
      status: "Approved",
    },
    {
      id: 3,
      user: "Harsh B",
      vendor: "Vendor C",
      rating: "★★★★★",
      review: "No Variety",
      date: "25/08/2025",
      status: "Rejected",
    },
    {
      id: 4,
      user: "Mohit C",
      vendor: "Vendor D",
      rating: "★★★★",
      review: "Healthy and Taste Food",
      date: "01/01/2025",
      status: "Pending",
    },
    {
      id: 5,
      user: "Sneha A",
      vendor: "Vendor E",
      rating: "★★★★★",
      review: "Food was Good",
      date: "10/01/2025",
      status: "Pending",
    },
  ]);

  const vendorReplies = [
    {
      review: "Good Food",
      date: "11-05-2025",
      reply: "Thank you for your review",
    },
    {
      review: "Fresh Food",
      date: "09-07-2025",
      reply: "Thank You for your review",
    },
    {
      review: "No Variety",
      date: "10-07-2025",
      reply: "Sorry for inconvenience we are trying to add more variety",
    },
    {
      review: "Healthy Food",
      date: "11-07-2025",
      reply: "Thank you for your review",
    },
  ];

  const updateStatus = (id, newStatus) => {
    const updated = reviewsData.map((review) =>
      review.id === id ? { ...review, status: newStatus } : review
    );
    setReviewsData(updated);
  };

  const toggleVendor = (vendor) => {
    if (vendor === "All Vender") {
      if (selectedVendors.includes("All Vender")) {
        setSelectedVendors([]);
      } else {
        setSelectedVendors(["All Vender"]);
      }
    } else {
      setSelectedVendors((prev) => {
        const filtered = prev.filter((v) => v !== "All Vender");
        return prev.includes(vendor)
          ? filtered.filter((v) => v !== vendor)
          : [...filtered, vendor];
      });
    }
  };

  const toggleStatus = (status) => {
    if (status === "All Status") {
      if (selectedStatus.includes("All Status")) {
        setSelectedStatus([]);
      } else {
        setSelectedStatus(["All Status"]);
      }
    } else {
      setSelectedStatus((prev) => {
        const filtered = prev.filter((s) => s !== "All Status");
        return prev.includes(status)
          ? filtered.filter((s) => s !== status)
          : [...filtered, status];
      });
    }
  };

  const removeStatus = (status) => {
    setSelectedStatus((prev) => prev.filter((s) => s !== status));
  };

  const filteredReviews = reviewsData.filter((review) => {
    const statusMatch =
      selectedStatus.length === 0 ||
      selectedStatus.includes("All Status") ||
      selectedStatus.includes(review.status);

    const vendorMatch =
      selectedVendors.length === 0 ||
      selectedVendors.includes("All Vender") ||
      selectedVendors.includes(review.vendor);

    return statusMatch && vendorMatch;
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setFilterOpen(false);
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Title Bar */}
      <div className="w-full h-[72px] flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-[24px] font-medium leading-none">
          Rating and Review
        </h2>
      </div>

      {/* Main Card */}
      <div className="bg-white px-4 py-4 flex flex-col gap-6 items-center">
        <div className="p-6">
          {/* Top Cards */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Vendor Reply Card */}
            <div className="bg-white shadow rounded-lg p-4 border">
              <h2 className="font-medium text-base mb-4 flex items-center gap-2">
                Vendor Reply{" "}
                <button className="ml-2">
                  <SlCalender />
                </button>
              </h2>
              <table className="w-full text-sm border-2 rounded-full border-gray-300">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4">Customer Review</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Vendor Reply</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorReplies.map((item, index) => (
                    <tr key={index}>
                      <td className="py-3 px-4">{item.review}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="py-3 px-4">{item.reply}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Rating Analytics */}
            <div className="bg-white shadow rounded-lg p-4 border">
              <h2 className="font-medium mb-3">Rating Trend Analytics</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#f97316"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Filters */}
          {/* Filters with funnel */}
          <div className="relative flex items-center gap-3 mb-4">
            <div ref={buttonRef}>
              <button onClick={() => setFilterOpen(!filterOpen)}>
                <div className="w-10 h-10 flex items-center justify-center rounded-[10px] bg-[#F8F5FF] text-[#004AAD]">
                  <PiFunnel className="w-6 h-6" />
                </div>
              </button>
            </div>

            {/* Selected filter chips */}
            {/* Selected filter chips */}
            <div className="flex gap-2 flex-wrap">
              {/* Status Chips */}
              {selectedStatus.map((status) => (
                <div
                  key={status}
                  className="flex items-center gap-1 rounded-full px-3 py-1 bg-[#F8F5FF] text-[#0A051F]"
                >
                  {status}
                  <button onClick={() => removeStatus(status)}>✕</button>
                </div>
              ))}

              {/* Vendor Chips */}
              {selectedVendors.map((vendor) => (
                <div
                  key={vendor}
                  className="flex items-center gap-1 rounded-full px-3 py-1 bg-[#F8F5FF] text-[#0A051F]"
                >
                  {vendor}
                  <button
                    onClick={() =>
                      setSelectedVendors((prev) =>
                        prev.filter((v) => v !== vendor)
                      )
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Dropdown */}
            {filterOpen && (
              <div
                ref={filterRef}
                className="absolute top-12 w-[260px] bg-white border rounded-md shadow-lg p-4 z-10 flex flex-col gap-4 text-sm"
              >
                {/* Date filter */}
                <div>
                  <div className="relative">
                    {/* Date filter */}
                    <div>
                      <h4 className="text-[#000] font-semibold mb-2">Date</h4>
                      <div className="relative">
                        <button
                          onClick={() => setShowDatePicker(!showDatePicker)}
                          className="w-full border px-3 py-2 rounded text-left text-[#333] flex justify-between items-center"
                        >
                          <span>
                            {`${format(
                              dateRange[0].startDate,
                              "dd MMM yyyy"
                            )} - ${format(
                              dateRange[0].endDate,
                              "dd MMM yyyy"
                            )}`}
                          </span>
                          <SlCalender />
                        </button>

                        {showDatePicker && (
                          <div className="absolute z-50 w-auto h-72 mt-1 flex bg-white shadow-lg border rounded-md overflow-hidden">
                            {/* Quick Filters */}
                            <div className="flex flex-col text-sm border-r w-40 px-3 py-4 gap-1 text-[#0A051F] font-medium">
                              {[
                                {
                                  label: "Today",
                                  range: [new Date(), new Date()],
                                },
                                {
                                  label: "Yesterday",
                                  range: [
                                    subDays(new Date(), 1),
                                    subDays(new Date(), 1),
                                  ],
                                },
                                {
                                  label: "Last week",
                                  range: [
                                    startOfWeek(subDays(new Date(), 7)),
                                    endOfWeek(subDays(new Date(), 7)),
                                  ],
                                },
                                {
                                  label: "Last month",
                                  range: [
                                    startOfMonth(subMonths(new Date(), 1)),
                                    endOfMonth(subMonths(new Date(), 1)),
                                  ],
                                },
                                {
                                  label: "Last quarter",
                                  range: [subMonths(new Date(), 3), new Date()],
                                },
                              ].map((option) => (
                                <button
                                  key={option.label}
                                  onClick={() =>
                                    setDateRange([
                                      {
                                        startDate: option.range[0],
                                        endDate: option.range[1],
                                        key: "selection",
                                      },
                                    ])
                                  }
                                  className="text-left px-2 py-1 rounded hover:bg-[#F5F5F5] transition-colors duration-150"
                                >
                                  {option.label}
                                </button>
                              ))}

                              <button
                                onClick={() =>
                                  setDateRange([
                                    {
                                      startDate: new Date(),
                                      endDate: new Date(),
                                      key: "selection",
                                    },
                                  ])
                                }
                                className="text-left px-2 py-1 text-[#004AAD] mt-2 font-semibold hover:underline"
                              >
                                Reset
                              </button>
                            </div>
                            <style>
                              {`
                                    .rdrMonthName {
                                     display: none !important;
                                        }
                             `}
                            </style>
                            {/* Date Range Picker */}
                            <div>
                              <DateRange
                                editableDateInputs={true}
                                onChange={(item) =>
                                  setDateRange([item.selection])
                                }
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                                rangeColors={["#004AAD"]} // blue selection highlight
                                showDateDisplay={false}
                                months={1}
                                direction="horizontal"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vendor filter */}
                <div>
                  <h4 className="text-[#000] font-semibold mb-2">Vendor</h4>
                  {["All Vender", "Tiffin/Restaurant", "PG/Hostel"].map(
                    (vendor) => (
                      <label
                        key={vendor}
                        className={`flex items-center gap-2 py-1 cursor-pointer ${
                          selectedVendors.includes(vendor)
                            ? "text-[#FF6B00] font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedVendors.includes(vendor)}
                          onChange={() => toggleVendor(vendor)}
                          className="hidden" // Hide the default checkbox
                        />
                        <span
                          className={`w-5 h-5 flex items-center justify-center border rounded ${
                            selectedVendors.includes(vendor)
                              ? "bg-[#FF6B00] border-[#FF6B00] text-white" // Custom checked styling
                              : "border-gray-400 text-transparent" // Default unchecked styling
                          }`}
                        >
                          {selectedVendors.includes(vendor) ? "✓" : ""}{" "}
                          {/* Add tick mark when checked */}
                        </span>
                        <span>{vendor}</span>
                      </label>
                    )
                  )}
                </div>

                {/* Status filter */}
                <div className="border-t pt-2 h-24 overflow-auto">
                  <h4 className="text-[#000] font-semibold mb-2">Status</h4>
                  {["All Status", "Pending", "Approved", "Rejected"].map(
                    (status) => (
                      <label
                        key={status}
                        className={`flex items-center gap-2 py-1 cursor-pointer ${
                          selectedStatus.includes(status)
                            ? "text-orange-500 font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedStatus.includes(status)}
                          onChange={() => toggleStatus(status)}
                          className="hidden" // Hide the default checkbox
                        />
                        <span
                          className={`w-5 h-5 flex items-center justify-center border rounded ${
                            selectedStatus.includes(status)
                              ? "bg-orange-500 border-orange-500 text-white" // Custom checked styling
                              : "border-gray-400 text-transparent" // Default unchecked styling
                          }`}
                        >
                          {selectedStatus.includes(status) ? "✓" : ""}{" "}
                          {/* Add tick mark when checked */}
                        </span>
                        <span>{status}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Review Table */}
          <div className="bg-white shadow rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Sr.No</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Vendor</th>
                  <th className="p-3 text-left">Rating</th>
                  <th className="p-3 text-left">Review</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((row) => (
                  <tr key={row.id}>
                    <td className="p-3">{row.id}</td>
                    <td className="p-3">{row.user}</td>
                    <td className="p-3">{row.vendor}</td>
                    <td className="p-3 text-yellow-500">{row.rating}</td>
                    <td className="p-3">{row.review}</td>
                    <td className="p-3">{row.date}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          row.status === "Approved"
                            ? "bg-green-100 text-green-600"
                            : row.status === "Rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => updateStatus(row.id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                        onClick={() => updateStatus(row.id, "Flagged")}
                      >
                        Flag
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => updateStatus(row.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
