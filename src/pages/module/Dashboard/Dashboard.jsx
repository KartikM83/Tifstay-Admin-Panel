import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { pgListings } from "./Data.jsx";
import DonutChart from "./DonutChart";
import { FiEye } from "react-icons/fi";
import { IoEllipseSharp } from "react-icons/io5";
import { TbCalendarTime, TbMessageQuestion } from "react-icons/tb";
import { FaRegClock ,FaRegStar } from "react-icons/fa";
import PgListing from "../ListingManagementCom/PgListing.jsx";
import { PiFunnel } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";



// sample chart data
const hostelData = [
  { name: "Check-ins", value: 53, color:"#7987FF" },
  { name: "Check-outs", value: 21,color:"#A155B9" },
  { name: "Upcoming", value: 26,color:"#FF6B6B" },
];


const tiffinData = [
  { name: "Preparing", value: 40, color:"#7987FF"  },
  { name: "Out for Delivery", value: 10,color:"#A155B9" },
  { name: "Delivered", value: 15,color:"#FF6B6B" },
  { name: "Undelivered", value: 35,color:"#FFA94D" },
];


const Dashboard = ({users,setusers}) => {
  const navigate = useNavigate();
const [listing, setListing] = useState(pgListings);
const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // ✅ pagination state
  const usersPerPage = 5; // ✅ only 5 entries per page
    const [searchQuery, setSearchQuery] = useState("");

  


   const removeStatus = (status) => {
    setSelectedStatus((prev) => prev.filter((s) => s !== status));
    setCurrentPage(1);
  };

   const toggleStatus = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
    setCurrentPage(1); // reset to first page when filter changes
  };

  const searchFilteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) || user.phone.includes(query)
    );
  });

  const filteredUsers =
    selectedStatus.length === 0
      ? searchFilteredUsers
      : searchFilteredUsers.filter((user) =>
          selectedStatus.includes(user.status)
        );


   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  
  return (



    <div className="flex flex-col gap-6 font-inter">
          {/* Header Bar */}
          <div className="w-full h-[72px] flex items-center  gap-16 bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-[24px] font-medium leading-none">
              Dashboard
            </h2>

          </div>
    
          {/* Table Section */}
          <div className="w-full min-h-[600px] p-4 rounded-[8px] bg-white shadow border border-[#D9D9D9] flex flex-col gap-4">


                <div className="w-full min-h-[133px] rounded-[16px] border border-[#A5A5A5] p-4 flex justify-between">

                    <div className="w-[337.33px] h-[101px] rounded-[8px] border border-[#004AAD] flex justify-center items-center">
                          <span className="font-inter font-medium text-[24px] text-center text-[#004AAD]"> PG/Hostel <br /> Overview</span>
                    </div>
                     <div className="w-[337.33px] h-[101px] rounded-[8px] border border-[#004AAD] flex justify-center items-center">
                          <span className="font-inter font-medium text-[24px] text-center text-[#004AAD]">  Tiffin/Restaurant <br /> Overview</span>
                    </div>
                     <div className="w-[337.33px] h-[101px] rounded-[8px] border border-[#004AAD] flex justify-center items-center">
                          <span className="font-inter font-medium text-[24px] text-center text-[#004AAD]"> User <br /> Overview</span>
                    </div>
                </div>


                <div className="flex justify-between">

                <div className="w-[348px] h-[294px] rounded-[12px] border border-[#A5A5A5] shadow bg-red p-4 flex ">
                   
                    <DonutChart data={hostelData} title="Today’s Hostel Bookings Status" total={50} />

                    
                </div>


                <div className="w-[348px] h-[294px] rounded-[12px] border border-[#A5A5A5] shadow p-[16px]">
                  <DonutChart data={tiffinData} title="Today’s Tiffin order status" total={50} />
              </div>

              <div className="w-[348px] h-[294px] rounded-[12px] border border-[#A5A5A5] shadow p-[16px] space-y-4">
             <header className="flex justify-between items-center">
               <span className="font-medium text-[16px] text-black">Alerts</span>
               <Link to="/alerts" className="text-[#FF6B00] text-[12px] font-medium">See all</Link>
             </header>
             <div className="space-y-2">

               <div className="flex gap-3">
                <TbCalendarTime className="w-[20px] h-[20px] text-[#004AAD] mt-[3px]" />
                <div>
                  <p className="font-medium text-[18px] text-[#1F2937]">Vendor license expired</p>
                 <p className="text-[16px] text-[#4B5563]">Vendor license expired</p>
                </div>
               </div>


                <div className="flex gap-3">
                <FaRegClock  className="w-[20px] h-[20px] text-[#004AAD] mt-[3px]" />
              <div>
                <p className="font-medium text-[18px] text-[#1F2937]">KYC pending</p>
                <p className="text-[16px] text-[#4B5563]">5 KYC pending</p>
              </div>
              </div>


              <div className="flex gap-3">
                <TbMessageQuestion className="w-[20px] h-[20px] text-[#004AAD] mt-[3px]" />
              <div>
                <p className="font-medium text-[18px] text-[#1F2937]">High refund rate</p>
                <p className="text-[16px] text-[#4B5563]">2 Vendors have high refund rate</p>
              </div>
              </div>


                <div className="flex gap-3">
                <FaRegStar className="w-[20px] h-[20px] text-[#004AAD] mt-[3px]" />
              <div>
              <p className="font-medium text-[18px] text-[#1F2937]">Low ratings</p>
               <p className="text-[16px] text-[#4B5563]">4 vendors with low ratings</p>
              </div>

              </div>
               
            </div>
          
          </div>
 
              </div>

              <div className="w-full min-h-[600px] p-4 rounded-[8px] bg-white shadow border border-[#D9D9D9] flex flex-col gap-4">
                <h2 className="font-semibold text-[24px] text-[#0A051F]">Todays New Listings</h2>
                <div className="relative flex items-center gap-3">
                          {/* Funnel Icon */}
                          <button onClick={() => setFilterOpen(!filterOpen)}>
                            <div className="w-10 h-10 flex items-center justify-center rounded-[10px] bg-[#F8F5FF] text-[#004AAD]">
                              <PiFunnel className="w-6 h-6" />
                            </div>
                          </button>
                
                          {/* Selected Filters */}
                          <div className="flex gap-2">
                            {selectedStatus.map((status) => (
                              <div
                                key={status}
                                className="flex items-center gap-1 w-auto h-auto rounded-[40px] px-4 py-2 bg-[#F8F5FF] text-[#0A051F]"
                              >
                                {status}
                                <button onClick={() => removeStatus(status)} className="ml-1">
                                  <IoMdClose className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                
                          {/* Dropdown */}
                          {filterOpen && (
                            <div className="absolute top-12 w-[300px] bg-white border rounded-md shadow-lg p-3 z-10">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Status</span>
                                <button
                                  onClick={() => setFilterOpen(false)}
                                  className="text-gray-500"
                                >
                                  ✕
                                </button>
                              </div>
                
                              {/* Active Option */}
                              <label
                                className={`flex items-center gap-2 mb-2 px-2 py-1 rounded cursor-pointer ${
                                  selectedStatus.includes("Pending")
                                    ? "text-[#FF6B00] font-medium"
                                    : "text-gray-700"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedStatus.includes("Pending")}
                                  onChange={() => toggleStatus("Pending")}
                                  className="hidden"
                                />
                                <span
                                  className={`w-5 h-5 flex items-center justify-center border rounded ${
                                    selectedStatus.includes("Pending")
                                      ? "bg-[#FF6B00] border-[#FF6B00] text-white"
                                      : "border-gray-400 text-transparent"
                                  }`}
                                >
                                  ✓
                                </span>
                                Pending
                              </label>
                
                               <label
                                className={`flex items-center gap-2 mb-2 px-2 py-1 rounded cursor-pointer ${
                                  selectedStatus.includes("Approved")
                                    ? "text-[#FF6B00] font-medium"
                                    : "text-gray-700"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedStatus.includes("Approved")}
                                  onChange={() => toggleStatus("Approved")}
                                  className="hidden"
                                />
                                <span
                                  className={`w-5 h-5 flex items-center justify-center border rounded ${
                                    selectedStatus.includes("Approved")
                                      ? "bg-[#FF6B00] border-[#FF6B00] text-white"
                                      : "border-gray-400 text-transparent"
                                  }`}
                                >
                                  ✓
                                </span>
                                Approved
                              </label>
                
                              {/* Blocked Option */}
                              <label
                                className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${
                                  selectedStatus.includes("Rejected")
                                    ? "text-[#FF6B00] font-medium"
                                    : "text-gray-700"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedStatus.includes("Rejected")}
                                  onChange={() => toggleStatus("Rejected")}
                                  className="hidden"
                                />
                                <span
                                  className={`w-5 h-5 flex items-center justify-center border rounded ${
                                    selectedStatus.includes("Rejected")
                                      ? "bg-[#FF6B00] border-[#FF6B00] text-white"
                                      : "border-gray-400 text-transparent"
                                  }`}
                                >
                                  ✓
                                </span>
                                Rejected
                              </label>
                
                              
                            </div>
                          )}
                        </div>

                        <div className="overflow-x-auto flex-1 font-inter pb-6">
                                  <table className="w-full text-center border-separate border-spacing-y-2">
                                    <thead>
                                      <tr className="bg-gray-100">
                                        <th className="w-[80px] p-4">Sr.No.</th>
                                        <th className="px-4 py-2">Listing</th>
                                        <th className="px-4 py-2">Listing Type</th>
                                        <th className="px-4 py-2">Phone Number</th>
                                        <th className="px-4 py-2">Address</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {currentUsers.map((user, index) => (
                                        <tr key={user.id} className="bg-white shadow-sm rounded-lg">
                                          <td className="px-4 py-3 align-middle">
                                            {indexOfFirstUser + index + 1}
                                          </td> 
                                          <td className="px-4 py-3 align-middle">{user.name}</td>
                                          <td className="px-4 py-3 align-middle">{user.type}</td>
                                          <td className="px-4 py-3 align-middle">{user.phone}</td>
                                          <td className="px-4 py-3 align-middle whitespace-normal break-words text-center truncate max-w-[300px]">
                                            {user.address}
                                          </td>
                                          <td
                                            className={`px-4 py-3 align-middle font-medium ${
                                              user.status === "Approved"
                                                ? "text-[#34C759]"
                                                : user.status==="Pending" ?"text-[#FFCC00]":"text-[#FF383C]"
                                            }`}
                                          >
                                            {user.status}
                                          </td>
                                          <td className="px-4 py-3 align-middle">
                                            <div className="flex gap-3 justify-center">
                                              <button
                                                className="text-orange-500 hover:text-orange-600"
                                                title="View"
                                                onClick={() =>
                                                  navigate(`/dashboard/alerts`)
                                                }
                                              >
                                                <FiEye className="w-6 h-6" />
                                              </button>

                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
              </div>

            
                

            
            
            </div>
         
        </div>
//    <div className="flex flex-col gap-6">
//       {/* main page container */}
//       <div className="w-full h-[850px] bg-white rounded-[8px] p-[16px] gap-[16px] absolute top-[173px] left-[316px] shadow-[0px_2px_4px_0px_#00000040] overflow-y-scroll opacity-100">

//         {/* overview cards */}
//         <div className="w-[1076px] h-[133px] rounded-[16px] p-4 flex items-center space-x-4 border border-[#A5A5A5]">
//           <div className="flex flex-row gap-4 w-full">

//             {/* card1 */}
//             <div
//               onClick={() => navigate("/hostel-property-overview")}
//               className="w-[337.33px] h-[101px] rounded-[8px] p-4 flex items-center space-x-4 border border-[#004AAD] cursor-pointer transition-none"
//             >
//               <div className="w-[305.33px] h-[58px] flex items-center justify-center rounded-md">
//                 <span className="font-inter font-medium text-[24px] text-center text-[#004AAD]">
//                   PG/Hostel <br /> Overview
//                 </span>
//               </div>
//             </div>

//             {/* card2 */}
//             <div
//               onClick={() => navigate("/Tiffin & Restaurant Overview")}
//               className="w-[337.33px] h-[100px] rounded-[8px] p-4 flex items-center space-x-4 border border-[#004AAD] cursor-pointer transition-none"
//             >
//               <div className="w-[301px] h-[58px] flex items-center justify-center rounded-md">
//                 <span className="font-inter font-medium text-[24px] text-center text-[#004AAD]">
//                   Tiffin/Restaurant <br /> Overview
//                 </span>
//               </div>
//             </div>

//             {/* card3 */}
//             <div
//               onClick={() => navigate("/User Overview")}
//               className="w-[337.33px] h-[100px] rounded-[8px] p-4 flex items-center space-x-4 border border-[#004AAD] cursor-pointer transition-none"
//             >
//               <div className="w-[301px] h-[58px] flex items-center justify-center rounded-md">
//                 <span className="font-inter font-medium text-[24px] text-center text-[#004AAD]">
//                   User <br /> Overview
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* charts & alerts */}
//         <div className="w-[1076px] h-[298px] opacity-100 gap-[16px] rounded-lg flex flex-row gap-4">

//           {/* hostel chart */}
//           <div className="w-[348px] h-[294px] rounded-[12px] border border-[#A5A5A5] shadow py-[16px] px-[24px]">
//             <DonutChart data={hostelData} title="Today’s Hostel Bookings Status" total={50} />
//           </div>

//           {/* tiffin chart */}
//           <div className="w-[348px] h-[294px] rounded-[12px] border border-[#A5A5A5] shadow p-[16px]">
//             <DonutChart data={tiffinData} title="Today’s Tiffin order status" total={50} />
//           </div>

//           {/* alerts */}
//           <div className="w-[348px] h-[294px] rounded-[12px] border border-[#A5A5A5] shadow p-[16px] space-y-4">
//             <header className="flex justify-between items-center">
//               <span className="font-medium text-[16px] text-black">Alerts</span>
//               <Link to="/alerts" className="text-[#FF6B00] text-[12px] font-medium">See all</Link>
//             </header>
//             <div className="space-y-2">
//               <div>
//                 <p className="font-medium text-[18px] text-[#1F2937]">Vendor license expired</p>
//                 <p className="text-[16px] text-[#4B5563]">Vendor license expired</p>
//               </div>
//               <div>
//                 <p className="font-medium text-[18px] text-[#1F2937]">KYC pending</p>
//                 <p className="text-[16px] text-[#4B5563]">5 KYC pending</p>
//               </div>
//               <div>
//                 <p className="font-medium text-[18px] text-[#1F2937]">High refund rate</p>
//                 <p className="text-[16px] text-[#4B5563]">2 Vendors have high refund rate</p>
//               </div>
//               <div>
//                 <p className="font-medium text-[18px] text-[#1F2937]">Low ratings</p>
//                 <p className="text-[16px] text-[#4B5563]">4 vendors with low ratings</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Today’s new listing */}
//       <div className="bg-white w-[1076px] h-[384px] rounded-[8px] p-[16px] gap-[16px] border border-[#A5A5A5] shadow">
//         <div className="flex justify-between mb-4">
//           <h2 className="text-[#0A051F] font-semibold text-[24px]">Today’s New Listings</h2>
//           <Link to="/approved" className="text-[#FF6B00] font-medium text-[16px]">See all</Link>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Sr.No.</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Listings</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Listing Type</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Phone Number</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Address</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {listing.map((item, index) => (
//                 <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
//                   <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700">{item.type}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700">{item.phone}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700">{item.address}</td>
//                   <td
//                     className={`px-4 py-2 text-sm font-medium ${
//                       item.status === "Approved"
//                         ? "text-green-600"
//                         : item.status === "Rejected"
//                         ? "text-red-600"
//                         : "text-yellow-600"
//                     }`}
//                   >
//                     {item.status}
//                   </td>
//                   <td className="px-4 py-2 text-sm text-gray-700">
//                     <span
//                       className="cursor-pointer text-blue-600"
//                       onClick={() => {
//                         if (item.id === 1) {
//                           navigate("/hostel-details");
//                         }
//                       }}
//                     >
//                       <FiEye />
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
  );
};


export default Dashboard;
