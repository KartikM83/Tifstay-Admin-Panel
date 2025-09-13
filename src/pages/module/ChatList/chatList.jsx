import { useState } from "react";
import { PiFunnel } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ChatList() {
      const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const chatsPerPage = 5;

  const chatData = [
    {
      id: 1,
      from: "Scholars Den Boys Hostel",
      type: "Hostel Owner",
      date: "01/01/2025",
    },
    {
      id: 2,
      from: "Albert Boys Hostel",
      type: "Hostel Owner",
      date: "01/01/2025",
    },
    { id: 3, from: "Wade Warren", type: "Customer", date: "01/01/2025" },
    {
      id: 4,
      from: "Albert Boys Hostel",
      type: "Hostel Owner",
      date: "01/01/2025",
    },
    { id: 5, from: "Wade Canteen", type: "Tiffin Owner", date: "01/01/2025" },
    { id: 6, from: "XYZ Hostel", type: "Hostel Owner", date: "01/01/2025" },
    { id: 7, from: "John Doe", type: "Customer", date: "01/01/2025" },
  ];

  // Apply filter
  const filteredChats =
    selectedFilters.length === 0
      ? chatData
      : chatData.filter((c) => selectedFilters.includes(c.type));

  // Pagination
  const totalPages = Math.ceil(filteredChats.length / chatsPerPage);
  const indexOfLast = currentPage * chatsPerPage;
  const indexOfFirst = indexOfLast - chatsPerPage;
  const currentChats = filteredChats.slice(indexOfFirst, indexOfLast);

  const toggleFilter = (type) => {
    setSelectedFilters((prev) =>
      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const removeFilter = (type) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== type));
  };

  return (
    <div className="flex flex-col gap-6 font-inter">
      <div className="w-full h-[72px] flex items-center  gap-16 bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-[24px] font-medium leading-none">Chat List</h2>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg shadow border  p-4 flex flex-col gap-4">
        {/* Summary */}
        <div className="flex gap-2 w-1/2 h-20">
          <div className="flex-1 bg-white rounded-md p-4 shadow text-left border border-blue-700">
            <h2 className="text-2xl font-semibold">30</h2>
            <p className="text-blue-400 text-md">Total Chat</p>
          </div>
          <div className="flex-1 bg-white rounded-md p-4 shadow text-left border border-blue-700">
            <h2 className="text-2xl font-semibold">13</h2>
            <p className="text-yellow-400 text-md">New Chat</p>
          </div>
        </div>

        {/* Filter Row */}
        <div className="relative flex items-center gap-3">
          <button onClick={() => setFilterOpen(!filterOpen)}>
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#F8F5FF] text-[#004AAD]">
              <PiFunnel className="w-6 h-6" />
            </div>
          </button>

          {/* Selected Filters */}
          <div className="flex gap-2">
            {selectedFilters.map((f) => (
              <div
                key={f}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F8F5FF] text-[#0A051F]"
              >
                {f}
                <button onClick={() => removeFilter(f)}>
                  <IoMdClose className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Dropdown */}
          {filterOpen && (
            <div className="absolute top-12 w-[250px] bg-white border rounded-md shadow-lg p-3 z-10">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">User/Provider</h4>
                <button
                  onClick={() => setFilterOpen(false)} // Assuming setFilterOpen is your state setter function
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  ✕
                </button>
              </div>
              {["Customer", "Tiffin Owner", "Hostel Owner"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 mb-2 cursor-pointer ${
                    selectedFilters.includes(type)
                      ? "text-[#FF6B00] font-medium"
                      : "text-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedFilters.includes(type)}
                    onChange={() => toggleFilter(type)}
                  />
                  <span
                    className={`w-5 h-5 border flex items-center justify-center rounded ${
                      selectedFilters.includes(type)
                        ? "bg-[#FF6B00] border-[#FF6B00] text-white"
                        : "border-gray-400 text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  {type}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-500 rounded-md ">
          <table className="w-full text-center ">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 w-[60px]">Sr.No.</th>
                <th className="p-3">Chat From</th>
                <th className="p-3">User Type</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentChats.map((c, idx) => (
                <tr key={c.id} className="bg-white shadow-sm">
                  <td className="p-3">{indexOfFirst + idx + 1}</td>
                  <td className="p-3">{c.from}</td>
                  <td className="p-3">{c.type}</td>
                  <td className="p-3">{c.date}</td>
                  <td className="p-3">
                    <button className="text-orange-500 hover:text-orange-600" onClick={() => navigate(`/chats/${c.id}`, { state: { name: c.from } })}>
                      <FiEye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center text-sm text-gray-600 px-2">
          <p>
            Showing {currentChats.length} of {filteredChats.length} Entries
          </p>
          <div className="flex gap-2">
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
}

export default ChatList;
