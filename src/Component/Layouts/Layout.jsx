import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right side: navbar + content */}
      <div className="flex flex-col flex-1">
        <Navbar />

        {/* Scrollable Main Area */}
        <main className="mt-[72px] h-[calc(100vh-72px)] overflow-y-auto bg-[#DFE1E6] p-6 ml-[300px]">
          <Outlet /> {/* 👈 Guest or GuestDetails will render here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
