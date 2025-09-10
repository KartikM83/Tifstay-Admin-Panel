// import Sidebar from "./Sidebar";
// import { IoIosSearch } from "react-icons/io";
// import { useState } from "react";
// import { PiFunnel } from "react-icons/pi";
// import { IoMdClose } from "react-icons/io";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { FiEye } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/image.png";


// function Guest({ users, setUsers }) {
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const [currentPage, setCurrentPage] = useState(1); // ✅ pagination state
//   const usersPerPage = 5; // ✅ only 5 entries per page


//   const navigate = useNavigate();

//   // ✅ Filter toggle
//   const toggleStatus = (status) => {
//     setSelectedStatus((prev) =>
//       prev.includes(status)
//         ? prev.filter((s) => s !== status)
//         : [...prev, status]
//     );
//     setCurrentPage(1); // reset to first page when filter changes
//   };

//   const removeStatus = (status) => {
//     setSelectedStatus((prev) => prev.filter((s) => s !== status));
//     setCurrentPage(1);
//   };


//   const searchFilteredUsers = users.filter((user) => {
//   const query = searchQuery.toLowerCase();
//   return (
//     user.name.toLowerCase().includes(query) ||
//     user.phone.includes(query)
//   );
// });

// const filteredUsers =
//   selectedStatus.length === 0
//     ? searchFilteredUsers
//     : searchFilteredUsers.filter((user) =>
//         selectedStatus.includes(user.status)
//       );

//   // const filteredUsers =
//   //   selectedStatus.length === 0
//   //     ? users
//   //     : users.filter((user) => selectedStatus.includes(user.status));




//   // ✅ Pagination logic
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

//   // 🗑 Trash click
//   const handleDeleteClick = (user) => {
//     setUserToDelete(user);
//     setShowDeleteModal(true);
//   };

//   // ❌ Cancel delete
//   const handleCancelDelete = () => {
//     setUserToDelete(null);
//     setShowDeleteModal(false);
//   };

//   // ✅ Remove user
//   const handleRemove = () => {
//     setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
//     setShowDeleteModal(false);
//   };

//   return (
//     <div className="flex flex-col gap-6 font-inter">
//       {/* Header Bar */}
//       <div className="w-full h-[72px] flex items-center justify-between gap-2 bg-white rounded-lg p-4 shadow-sm">
//         <h2 className="text-[24px] font-medium leading-none">
//           User Management / Guest
//         </h2>

//         {/* Search Bar */}
//         <div className="flex items-center gap-2 w-[300px] h-[40px] border rounded-full px-4">
//           <IoIosSearch className="w-5 h-5 text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search by name, mobile no."
//             className="flex-1 outline-none text-[16px] font-medium placeholder-gray-400"
//             value={searchQuery}
//             onChange={(e) => {
//             setSearchQuery(e.target.value);
//             setCurrentPage(1); // reset to first page on new search
//             }}
//           />
//         </div>

//         {/* Create Button */}
//         <div className="w-[200px] h-[40px] bg-[#FF6B00] flex items-center justify-center rounded-[8px] text-white cursor-pointer hover:bg-orange-600 transition">
//           Create New
//         </div>
//       </div>


      

//       {/* Table Section */}
//       <div className="w-full min-h-[540px] p-4 rounded-[8px] bg-white shadow border border-[#D9D9D9] flex flex-col gap-4">
// {/* Filter Section */}
//          <div className="relative flex items-center gap-3">
//     {/* Funnel Icon */}
//     <button onClick={() => setFilterOpen(!filterOpen)}>
//       <div className="w-10 h-10 flex items-center justify-center rounded-[10px] bg-[#F8F5FF] text-[#004AAD]">
//         <PiFunnel className="w-6 h-6" />
//       </div>
//     </button>

//     {/* Selected Filters */}
//     <div className="flex gap-2">
//       {selectedStatus.map((status) => (
//         <div
//           key={status}
//           className="flex items-center gap-1 w-auto h-auto rounded-[40px] px-4 py-2 bg-[#F8F5FF] text-[#0A051F]"
//         >
//           {status}
//           <button onClick={() => removeStatus(status)} className="ml-1">
//             <IoMdClose className="w-4 h-4" />
//           </button>
//         </div>
//       ))}
//     </div>

//     {/* Dropdown */}
//     {filterOpen && (
//       <div className="absolute top-12 w-[300px] bg-white border rounded-md shadow-lg p-3 z-10">
//         <div className="flex justify-between items-center mb-2">
//           <span className="font-medium">Status</span>
//           <button onClick={() => setFilterOpen(false)} className="text-gray-500">
//             ✕
//           </button>
//         </div>

//         {/* Active Option */}
//         <label
//           className={`flex items-center gap-2 mb-2 px-2 py-1 rounded cursor-pointer ${
//             selectedStatus.includes("Active")
//               ? "text-[#FF6B00] font-medium"
//               : "text-gray-700"
//           }`}
//         >
//           <input
//             type="checkbox"
//             checked={selectedStatus.includes("Active")}
//             onChange={() => toggleStatus("Active")}
//             className="hidden"
//           />
//           <span
//             className={`w-5 h-5 flex items-center justify-center border rounded ${
//               selectedStatus.includes("Active")
//                 ? "bg-[#FF6B00] border-[#FF6B00] text-white"
//                 : "border-gray-400 text-transparent"
//             }`}
//           >
//             ✓
//           </span>
//           Active
//         </label>

//         {/* Blocked Option */}
//         <label
//           className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${
//             selectedStatus.includes("Blocked")
//               ? "text-[#FF6B00] font-medium"
//               : "text-gray-700"
//           }`}
//         >
//           <input
//             type="checkbox"
//             checked={selectedStatus.includes("Blocked")}
//             onChange={() => toggleStatus("Blocked")}
//             className="hidden"
//           />
//           <span
//             className={`w-5 h-5 flex items-center justify-center border rounded ${
//               selectedStatus.includes("Blocked")
//                 ? "bg-[#FF6B00] border-[#FF6B00] text-white"
//                 : "border-gray-400 text-transparent"
//             }`}
//           >
//             ✓
//           </span>
//           Blocked
//         </label>
//       </div>
//     )}
//   </div>
//         {/* Table */}
//         <div className="overflow-x-auto flex-1 font-inter pb-6">
//           <table className="w-full text-center border-separate border-spacing-y-2">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="w-[80px] p-4">Sr.No.</th>
//                 <th className="px-4 py-2">Customer Name</th>
//                 <th className="px-4 py-2">Phone Number</th>
//                 <th className="px-4 py-2">Address</th>
//                 <th className="px-4 py-2">Status</th>
//                 <th className="px-4 py-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentUsers.map((user, index) => (
//                 <tr key={user.id} className="bg-white shadow-sm rounded-lg">
//                   <td className="px-4 py-3 align-middle">
//                     {indexOfFirstUser + index + 1}
//                   </td>
//                   <td className="px-4 py-3 align-middle">{user.name}</td>
//                   <td className="px-4 py-3 align-middle">{user.phone}</td>
//                   <td className="px-4 py-3 align-middle whitespace-normal break-words text-center truncate max-w-[200px]">
//                     {user.address}
//                   </td>
//                   <td
//                     className={`px-4 py-3 align-middle font-medium ${
//                       user.status === "Active"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {user.status}
//                   </td>
//                   <td className="px-4 py-3 align-middle">
//                     <div className="flex gap-3 justify-center">
//                       <button
//                         className="text-orange-500 hover:text-orange-600"
//                         onClick={() =>
//                           navigate(`/guests/${user.id}`, { state: { user } })
//                         }
//                       >
//                         <FiEye className="w-6 h-6" />
//                       </button>
//                       <button
//                         className="text-orange-500 hover:text-orange-600"
//                         onClick={() => handleDeleteClick(user)}
//                       >
//                         <RiDeleteBin6Line className="w-6 h-6" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer Pagination */}
//         <div className="flex justify-between items-center text-sm text-gray-600 px-2">
//           <p>
//             Showing {currentUsers.length} of {filteredUsers.length} Entries
//           </p>
//           <div className="flex gap-2 items-center">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => prev - 1)}
//               className="px-2 py-1 border rounded disabled:opacity-50"
//             >
//               &lt;
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-2 py-1 border rounded ${
//                   currentPage === i + 1 ? "bg-blue-600 text-white" : ""
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//               className="px-2 py-1 border rounded disabled:opacity-50"
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* 🟦 Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-[450px] flex flex-col gap-4 items-center">
//             <img src={logo} alt="" className="w-[246px] h-[56px]" />
//             <h2 className="text-lg font-semibold">Remove User</h2>
//             <p className="text-[#666060] text-[16px] text-center">
//               Are you sure you want to remove this user? This action cannot be
//               undone.
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleCancelDelete}
//                 className="w-[200px] h-[40px] rounded-[8px] border border-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleRemove}
//                 className="w-[200px] h-[40px] rounded-[8px] bg-[#004AAD] text-white"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Guest;
