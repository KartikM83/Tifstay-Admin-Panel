import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaUser } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoMdRestaurant } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { GiCardboardBox } from "react-icons/gi";
import { BsFillCreditCardFill } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";
import { RiCoupon4Line } from "react-icons/ri";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";




const menuItems = [
  {
    label: "Dashboard",
    icon: <MdDashboard className="w-6 h-6" />,
    path: "/dashboard",
    type: "link",
  },
  {
    label: "User Management",
    icon: <FaUsers className="w-6 h-6" />,
    type: "dropdown",
    children: [
      { label: "Guests", path: "/users/guests", icon: <FaUser className="w-5 h-5" /> },
      {
        label: "PG/Hostel Owners",
        path: "/users/owners",
        icon: <HiBuildingOffice2 className="w-5 h-5" />,
      },
      {
        label: "Tiffin/Restaurant Providers",
        path: "/users/providers",
        icon: <IoMdRestaurant className="w-5 h-5" />,
      },
    ],
  },

  {
    label: "Listing Management",
    icon: <CiViewList className="w-6 h-6" />,
    type: "dropdown",
    children: [
      {
        label: "PG/Hostel Listings",
        path: "/listings/pglisting",
        icon: <HiBuildingOffice2 className="w-5 h-5" />,
      },
      {
        label: "Tiffin/Restaurant Listings",
        path: "/listings/restaurantlisting",
        icon: <IoMdRestaurant className="w-5 h-5" />,
      },
    ],
  },

  {
    label: "Bookings & Orders",
    icon: <GiCardboardBox className="w-6 h-6" />,
    type: "dropdown",
    children: [
      {
        label: "PG/Hostel Bookings",
        path: "/bookings/pg",
        icon: <HiBuildingOffice2 className="w-5 h-5" />,
      },
      {
        label: "TTiffin/Restaurant Orders",
        path: "/bookings/restaurant",
        icon: <IoMdRestaurant className="w-5 h-5" />,
      },
    ],
  },

  {
    label: "Payment & Wallet",
    icon: <BsFillCreditCardFill className="w-6 h-6" />,
    type: "dropdown",
    children: [
      {
        label: "Payments Overview",
        path: "/payments/overview",
        icon: <HiBuildingOffice2 className="w-5 h-5" />,
      },
      {
        label: "Wallet Transactions",
        path: "/payments/wallet-transactions",
        icon: <IoMdRestaurant className="w-5 h-5" />,
      },
      {
        label: "Payout History",
        path: "/payments/payout-history",
        icon: <IoMdRestaurant className="w-5 h-5" />,
      },
      {
        label: "Deposit Refund Requests",
        path: "/payments/deposit-refund-requests",
        icon: <IoMdRestaurant className="w-5 h-5" />,
      },
    ],
  },

  {
    label: "Offers & Discount",
    icon: <MdOutlineLocalOffer className="w-5 h-5" />,
    type: "dropdown",
    children: [
      {
        label: "Coupon",
        path: "/offers/coupon",
        icon: <RiCoupon4Line className="w-5 h-5" />,
      },
      {
        label: "Offer",
        path: "/offers/offer",
        icon: <MdOutlineLocalOffer className="w-5 h-5" />,
      },  
            {
        label: "Discount",
        path: "/offers/discount",
        icon: <RiDiscountPercentLine className="w-5 h-5" />,
      },
    ],
  },
  {
    label: "Rating & Reviews",
    icon: <MdDashboard className="w-6 h-6" />,
    path: "/reviews",
    type: "link",
  },
  {
    label: "Reports & Analytics",
    icon: <MdDashboard className="w-6 h-6" />,
    path: "/reports",
    type: "link",
  },
  {
    label: "CMS",
    icon: <FaUsers className="w-6 h-6" />,
    type: "dropdown",
    children: [
      { label: "Pages", path: "/cms/pages", icon: <FaUser className="w-5 h-5" /> },
      { label: "Banners", path: "/cms/banners", icon: <FaUser className="w-5 h-5" /> },
    ],
  },
  {
    label: "Security & Logs",
    icon: <MdDashboard className="w-6 h-6" />,
    path: "/security",
    type: "link",
  },
  {
    label: "Chat List",
    icon: <MdDashboard className="w-6 h-6" />,
    path: "/chats",
    type: "link",
  },
  {
    label: "Settings",
    icon: <FaUsers className="w-6 h-6" />,
    type: "dropdown",
    children: [
      { label: "Profile", path: "/settings/profile", icon: <FaUser className="w-5 h-5" /> },
      { label: "Preferences", path: "/settings/preferences", icon: <FaUser className="w-5 h-5" /> },
    ],
  },
];

function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <div className="fixed top-[72px] left-0 w-[300px] h-[calc(100vh-72px)] p-4 flex flex-col gap-4 bg-[#DFE1E6] shadow-right z-50 font-inter overflow-y-auto scrollbar-hide">
      {menuItems.map((item) =>
        item.type === "link" ? (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `w-[268px] h-[40px] rounded-[8px] py-2 px-4 flex items-center gap-2 font-inter font-medium text-[16px] 
              ${isActive ? "bg-[#004AAD] text-white" : "bg-white text-[#004AAD]"}`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ) : (
          <div key={item.label}>
            <div
              className={`w-[268px] h-[40px] py-2 px-4 flex items-center justify-between cursor-pointer transition-all duration-200 ${
                openDropdown === item.label
                  ? "bg-[#004AAD] text-white rounded-t-[8px]"
                  : "bg-white text-[#004AAD] rounded-[8px]"
              }`}
              onClick={() => toggleDropdown(item.label)}
            >
              <div className="flex items-center gap-2 font-inter font-medium text-[16px]">
                {item.icon}
                {item.label}
              </div>
              {openDropdown === item.label ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {openDropdown === item.label && (
              <div className="flex flex-col">
                {item.children.map((child, index) => {
                  const isLast = index === item.children.length - 1;
                  return (
                    <NavLink
                      key={child.label}
                      to={child.path}
                      className={({ isActive }) =>
                        `w-[268px] h-[40px] py-2 px-4 flex items-center gap-2 font-inter font-medium text-[14px] cursor-pointer hover:bg-[#5E9BED] hover:text-white 
                        ${isActive ? "bg-[#5E9BED] text-white" : "bg-white text-[#004AAD]"} 
                        ${isLast ? "rounded-b-[8px]" : ""}`
                      }
                    >
                      {child.icon}
                      {child.label}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Sidebar;
