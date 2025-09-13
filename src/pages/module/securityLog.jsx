import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { PiFunnel } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

const Security = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  //   const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Dummy Users Data
  const [users] = useState([
    {
      id: 1,
      name: "User A",
      role: "Role1",
      location: "Pune",
      loginDate: "20/09/2025",
      loginTime: "11:00 Am",
      status: "Login",
    },
    {
      id: 2,
      name: "User B",
      role: "Role2",
      location: "Mumbai",
      loginDate: "10/08/2025",
      loginTime: "11:00 Am",
      status: "Login",
    },
    {
      id: 3,
      name: "User V",
      role: "Role3",
      location: "Pune City",
      loginDate: "10/08/2025",
      loginTime: "11:00 Am",
      status: "Login",
    },
    {
      id: 4,
      name: "User C",
      role: "Role4",
      location: "Pune",
      loginDate: "01/01/2025",
      loginTime: "11:00 Am",
      status: "Logout",
    },
  ]);
  const allRoles = [...new Set(users.map((u) => u.role))];
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // ✅ Search filter
  const searchFiltered = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) || u.location.toLowerCase().includes(q)
    );
  });

  // ✅ Status filter
  const filteredUsers =
    selectedRoles.length === 0 || selectedRoles.includes("ALL")
      ? searchFiltered
      : searchFiltered.filter((u) => selectedRoles.includes(u.role));

  // ✅ Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  // const toggleRole = (role) => {
  //   setSelectedRoles((prev) =>
  //     prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
  //   );
  //   setCurrentPage(1);
  // };

  const removeRole = (role) => {
    setSelectedRoles((prev) => prev.filter((r) => r !== role));
    setCurrentPage(1);
  };
  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Header Bar */}
      <div className="w-full h-[72px] flex items-center gap-16 bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-[24px] font-medium">Security & Logs</h2>

        <div className="flex items-center gap-2 w-[300px] h-[40px] border rounded-full px-4">
          <IoIosSearch className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, location"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 outline-none text-[16px] placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full min-h-[600px] p-4 rounded-[8px] bg-white shadow border border-[#D9D9D9] flex flex-col gap-4">
        {/* Filter */}
        <div className="relative flex items-center gap-3">
          <button onClick={() => setFilterOpen(!filterOpen)}>
            <div className="w-10 h-10 flex items-center justify-center rounded-[10px] bg-[#F8F5FF] text-[#004AAD]">
              <PiFunnel className="w-6 h-6" />
            </div>
          </button>

          {/* Selected role chips */}
          <div className="flex gap-2">
            {selectedRoles.map((role) => (
              <div
                key={role}
                className="flex items-center gap-1 rounded-full px-4 py-2 bg-[#F8F5FF]"
              >
                {role}
                <button onClick={() => removeRole(role)}>
                  <IoMdClose className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Dropdown */}
          {filterOpen && (
            <div className="absolute top-12 w-[200px] bg-white border rounded-md shadow-lg p-3 z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Roles</span>
                <button onClick={() => setFilterOpen(false)}>✕</button>
              </div>

              {/* ALL Option */}
              <label
                className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${
                  selectedRoles.includes("ALL")
                    ? "text-[#FF6B00] font-medium"
                    : "text-gray-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedRoles.includes("ALL")}
                  onChange={() => {
                    if (selectedRoles.includes("ALL")) {
                      setSelectedRoles([]); // unselect ALL
                    } else {
                      setSelectedRoles(["ALL"]); // select ALL
                    }
                    setCurrentPage(1);
                  }}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 flex items-center justify-center border rounded ${
                    selectedRoles.includes("ALL")
                      ? "bg-[#FF6B00] border-[#FF6B00] text-white"
                      : "border-gray-400 text-transparent"
                  }`}
                >
                  ✓
                </span>
                ALL
              </label>

              {/* Individual Roles */}
              {allRoles.map((role) => (
                <label
                  key={role}
                  className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${
                    selectedRoles.includes(role)
                      ? "text-[#FF6B00] font-medium"
                      : "text-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(role)}
                    onChange={() => {
                      if (selectedRoles.includes("ALL")) {
                        setSelectedRoles([role]); // replace ALL with selected role
                      } else {
                        setSelectedRoles((prev) =>
                          prev.includes(role)
                            ? prev.filter((r) => r !== role)
                            : [...prev, role]
                        );
                      }
                      setCurrentPage(1);
                    }}
                    className="hidden"
                  />
                  <span
                    className={`w-5 h-5 flex items-center justify-center border rounded ${
                      selectedRoles.includes(role)
                        ? "bg-[#FF6B00] border-[#FF6B00] text-white"
                        : "border-gray-400 text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  {role}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1 pb-6">
          <table className="w-full text-sm text-center border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 w-[60px]">Sr.No.</th>
                <th className="p-3">User Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Location</th>
                <th className="p-3">Login Date</th>
                <th className="p-3">Login Time</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((u, i) => (
                <tr key={u.id} className="bg-white shadow-sm rounded-lg">
                  <td className="p-3">{indexOfFirst + i + 1}</td>
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">{u.location}</td>
                  <td className="p-3">{u.loginDate}</td>
                  <td className="p-3">{u.loginTime}</td>
                  <td
                    className={`p-3 font-medium ${
                      u.status === "Login" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {u.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center text-sm text-gray-600 px-2">
          <p>
            Showing {currentUsers.length} of {filteredUsers.length} Entries
          </p>
          <div className="flex gap-2 items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-2 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
