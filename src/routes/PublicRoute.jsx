import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import Layout from "../Component/Layouts/Layout";
import Owner from "../pages/module/UserManagementComp/Owner";

import EditOwner from "../pages/module/UserManagementComp/EditOwner";
import GuestDetails from "../pages/module/UserManagementComp/GuestDetails";
import EditProvider from "../pages/module/UserManagementComp/EditProvider";
import CreateOwner from "../pages/module/UserManagementComp/CreateOwner";
import PgListing from "../pages/module/ListingManagementCom/PgListing";
import Details from "../pages/module/ListingManagementCom/Details";
import EditDetails from "../pages/module/ListingManagementCom/EditDetails";
import { list } from "postcss";
import EditTiffinDetails from "../pages/module/ListingManagementCom/EditTiffinDetails";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import CouponsPage  from "../pages/module/offers&Discount/CouponsPage";
import OffersPage  from "../pages/module/offers&Discount/OffersPage";
import DiscountPage  from "../pages/module/offers&Discount/DiscountPage";
import NotFound from "../pages/module/offers&Discount/NotFound";

=======
import Booking from "../pages/module/Booking and orders/Booking";
import BookingDetails from "../pages/module/Booking and orders/BookingDetails";
import OverView from "../pages/module/Payment & Wallet/OverView";
import Login from "../pages/auth/Login";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import PasswordResetSuccessfully from "../pages/auth/PasswordResetSuccefully";
import Dashboard from "../pages/module/Dashboard/Dashboard";
import Alerts from "../pages/module/Dashboard/Alerts";
import Reviews from "../pages/module/Reviews";
import Security from "../pages/module/securityLog";
import ChatList from "../pages/module/ChatList/chatList";
import ChatDetails from "../pages/module/ChatList/chatListDetails";
>>>>>>> 67a2b776fbc2b036b7bcae0850d1a95bc2a17c2b
=======
>>>>>>> parent of 18e6fdf (added offers&Discounts)
=======
>>>>>>> parent of 18e6fdf (added offers&Discounts)

function PublicRoute() {
  const initialUsers = [
    {
      id: 1,
      kind: "guests",
      profile: "Student",
      name: "Mahesh Pawar",
      phone: "9876543210",
      email: "mahesh.pawar@gmail.com",
      dob: "2002-01-01",
      address: "4517 Washington Ave. Manchester, Kentucky 39495",
      status: "Active",
      aadhaar: "837975978954",
      password: "Mahesh@123",
      accountNumber: "123456789012",
      ifscCode: "SBIN0001234",
      accountType: "Savings",
      accountHolderName: "Mahesh Pawar",
    },
    {
      id: 2,
      kind: "guests",
      profile: "Student",
      name: "Somnath Ashok Karpe",
      phone: "9876543211",
      email: "somnath.karpe@gmail.com",
      dob: "1998-07-14",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      status: "Active",
      aadhaar: "123456789012",
      password: "Somnath@123",
      accountNumber: "234567890123",
      ifscCode: "HDFC0005678",
      accountType: "Savings",
      accountHolderName: "Somnath Ashok Karpe",
    },
    {
      id: 3,
      kind: "guests",
      profile: "Student",
      name: "Sunny Jhamandas Ramwani",
      phone: "9876543212",
      email: "sunny.ramwani@gmail.com",
      dob: "1995-11-22",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      status: "Blocked",
      aadhaar: "456789123654",
      password: "Sunny@123",
      accountNumber: "345678901234",
      ifscCode: "ICIC0007890",
      accountType: "Current",
      accountHolderName: "Sunny Jhamandas Ramwani",
    },
    // sample owners
    {
      id: 101,
      kind: "owners",
      profile: "PG/Hostel Owner",
      name: "Aarav Sharma",
      phone: "9998887771",
      email: "aarav.sharma@hostel.com",
      dob: "1985-03-11",
      address: "Pune, Maharashtra",
      status: "Active",
      aadhaar: "123412341234",
      password: "Aarav@2025",
      accountNumber: "998877665544",
      ifscCode: "SBIN0009988",
      accountType: "Current",
      accountHolderName: "Aarav Sharma",
    },
    // sample providers
    {
      id: 201,
      kind: "providers",
      profile: "Tiffin/Restaurant Provider",
      name: "Spice Tiffins",
      phone: "8887776665",
      email: "order@spicetiffins.com",
      dob: "",
      address: "Baner, Pune",
      status: "Active",
      aadhaar: "",
      password: "Spice@2025",
      accountNumber: "778899001122",
      ifscCode: "HDFC0001122",
      accountType: "Current",
      accountHolderName: "Spice Foods LLP",
    },
  ];


  const pgListings = [
    {
      id: 1,
      name: "Scholars Den Boys Hostel",
      phone: "9876543210",
      address: "123, Green Valley Road, Dharampeth, Nagpur - 440010",
      status: "Rejected",
      type:"Boys Hostel",
      troom:6,
      tbed:30,
      description:"A well-maintained girls hostel with all modern amenities. Located in a prime area with easy access to colleges and hospitals. Safe and secure environment with 24/7 security.",
      priceDay:300,
      priceWeekly:2000,
      priceMonthly:8000,
      offer:10,
      securityDeposit:15000
      
   
    },
    {
    id: 2,
    name: "CityNest Girls Hostel",
    phone: "9123456789",
    address: "45, Rosewood Lane, Ramdaspeth, Nagpur - 440012",
    status: "Approved",
    type: "Girls Hostel",
    troom: 8,
    tbed: 40,
    description: "Modern girls hostel with study rooms, WiFi, and nutritious meals. Walking distance from major coaching centers and colleges.",
    priceDay: 350,
    priceWeekly: 2200,
    priceMonthly: 8500,
    offer: 5,
    securityDeposit: 12000
  },
  {
    id: 3,
    name: "Comfort Stay PG",
    phone: "9812345670",
    address: "78, Lake View Society, Pratap Nagar, Nagpur - 440015",
    status: "Pending",
    type: "Co-ed PG",
    troom: 10,
    tbed: 50,
    description: "Affordable co-ed PG with all facilities including AC rooms, laundry, and mess. Peaceful locality, ideal for students and professionals.",
    priceDay: 280,
    priceWeekly: 1800,
    priceMonthly: 7500,
    offer: 8,
    securityDeposit: 10000
  },
  {
    id: 4,
    name: "Elite Homes Boys Hostel",
    phone: "9988776655",
    address: "201, Shankar Nagar, Hingna Road, Nagpur - 440016",
    status: "Approved",
    type: "Boys Hostel",
    troom: 12,
    tbed: 60,
    description: "Spacious hostel with gym, recreational room, and hygienic mess. CCTV surveillance and biometric entry for security.",
    priceDay: 320,
    priceWeekly: 2100,
    priceMonthly: 7800,
    offer: 12,
    securityDeposit: 14000
  },
  {
    id: 5,
    name: "Student Nest Girls PG",
    phone: "9090909090",
    address: "5, Lotus Apartments, Trimurti Nagar, Nagpur - 440022",
    status: "Rejected",
    type: "Girls Hostel",
    troom: 5,
    tbed: 25,
    description: "Cozy PG for girls with friendly staff, homely food, and individual study tables. Perfect for serious students.",
    priceDay: 310,
    priceWeekly: 1950,
    priceMonthly: 7900,
    offer: 15,
    securityDeposit: 13000
  },
  {
    id: 6,
    name: "Aspire PG for Working Men",
    phone: "9876512345",
    address: "12, Tech Park Road, IT Hub, Nagpur - 440024",
    status: "Approved",
    type: "Boys Hostel",
    troom: 15,
    tbed: 70,
    description: "Ideal PG for working professionals. High-speed internet, backup power, and workstations available 24/7.",
    priceDay: 400,
    priceWeekly: 2500,
    priceMonthly: 9000,
    offer: 10,
    securityDeposit: 16000
  }
  ];

  const bookingDetails = [
  {
    id: 1,
    bookingId: 56464994,
    customerName: "Ananya Sharma",
    pgName: "CityNest Girls Hostel",
    status: "Confirmed",
    bookingDate: "2025-09-08",
    profile: "Student",
    phoneNumber: "9123456789",
    email: "ananya.sharma@example.com",
    dob: "2003-04-15",
    address: "22, Hill Top Residency, Dharampeth, Nagpur - 440010",
    img: "https://example.com/images/ananya-sharma.jpg"
  },
  {
    id: 2,
    bookingId: 56464995,
    customerName: "Rahul Verma",
    pgName: "Elite Homes Boys Hostel",
    status: "Confirmed",
    bookingDate: "2025-09-09",
    profile: "Student",
    phoneNumber: "9988776655",
    email: "rahul.verma@example.com",
    dob: "2002-11-10",
    address: "77, Pearl Residency, Hingna Road, Nagpur - 440016",
    img: "https://example.com/images/rahul-verma.jpg"
  },
  {
    id: 3,
    bookingId: 56464996,
    customerName: "Priya Deshmukh",
    pgName: "Comfort Stay PG",
    status: "Pending",
    bookingDate: "2025-09-10",
    profile: "Student",
    phoneNumber: "9812345670",
    email: "priya.deshmukh@example.com",
    dob: "2004-01-22",
    address: "88, Lake View Apartments, Pratap Nagar, Nagpur - 440015",
    img: "https://example.com/images/priya-deshmukh.jpg"
  },
  {
    id: 4,
    bookingId: 56464997,
    customerName: "Aditya Kulkarni",
    pgName: "Aspire PG for Working Men",
    status: "Confirmed",
    bookingDate: "2025-09-07",
    profile: "Student",
    phoneNumber: "9876512345",
    email: "aditya.kulkarni@example.com",
    dob: "2001-08-30",
    address: "14, Skyline Enclave, IT Hub, Nagpur - 440024",
    img: "https://example.com/images/aditya-kulkarni.jpg"
  },
  {
    id: 5,
    bookingId: 56464998,
    customerName: "Sneha Patil",
    pgName: "Student Nest Girls PG",
    status: "Canceled",
    bookingDate: "2025-09-05",
    profile: "Student",
    phoneNumber: "9090909090",
    email: "sneha.patil@example.com",
    dob: "2003-06-05",
    address: "9, Blossom Heights, Trimurti Nagar, Nagpur - 440022",
    img: "https://example.com/images/sneha-patil.jpg"
  }
];


const restaurantListings = [
  {
    id: 1,
    name: "Green Spoon Veg Delight",
    phone: "9876543210",
    address: "123, Green Valley Road, Dharampeth, Nagpur - 440010",
    status: "Rejected",
    foodType: "Veg",
    description: "A clean and cozy vegetarian restaurant offering homemade-style meals. Known for its hygiene and quick service, popular among college students and families.",
    priceDay: 300,
    priceWeekly: 2000,
    priceMonthly: 8000,
    offer: 10,
    startTime:"7:00 AM",
    endTime:"10:00 PM",
    orderType: "Dining, Delivery",
    mealPreference: "Breakfast, Lunch, Dinner",
    deliveryTiming: {
      start: "7:00 AM",
      end: "9:00 AM"
    },
    includes: [
      "Thali with 2 Sabzis",
      "Dal & Rice",
      "Roti/Chapati",
      "Pickle & Salad",
      "Sweet Dish (once a week)"
    ]
  },
  {
    id: 2,
    name: "City Bites Multi-Cuisine",
    phone: "9123456789",
    address: "45, Rosewood Lane, Ramdaspeth, Nagpur - 440012",
    status: "Approved",
    foodType: "Veg, Non-Veg",
    description: "Multi-cuisine family restaurant offering Indian, Chinese, and Tandoor dishes. Dine-in and quick delivery available within city limits.",
    priceDay: 350,
    priceWeekly: 2400,
    priceMonthly: 8800,
    offer: 15,
    startTime:"9:00 AM",
    endTime:"11:00 PM",
    orderType: "Dining, Delivery",
    mealPreference: "Lunch,Dinner",
    deliveryTiming: {
      start: "1:00 PM",
      end: "3:00 PM"
    },
    includes: [
      "Butter Chicken / Paneer Butter Masala",
      "Naan / Roti",
      "Biryani",
      "Raita",
      "Soft Drink (optional)"
    ]
  },
  {
    id: 3,
    name: "Healthy Bites Cafe",
    phone: "9812345670",
    address: "78, Lake View Society, Pratap Nagar, Nagpur - 440015",
    status: "Pending",
    foodType: "Veg",
    description: "A health-focused cafe serving low-oil, low-sugar vegetarian meals with fresh ingredients. Ideal for fitness enthusiasts and health-conscious eaters.",
    priceDay: 280,
    priceWeekly: 1800,
    priceMonthly: 7500,
    offer: 5,
    startTime:"10:00 AM",
    endTime:"12:00 PM",
    orderType: "Delivery Only",
    mealPreference: "Breakfast,Lunch",
    deliveryTiming: {
      start: "6:30 AM",
      end: "8:30 AM"
    },
    includes: [
      "Oats Upma",
      "Sprout Salad",
      "Grilled Sandwich",
      "Fruit Bowl",
      "Detox Juice"
    ]
  },
  {
    id: 4,
    name: "The Spice Lounge",
    phone: "9988776655",
    address: "201, Shankar Nagar, Hingna Road, Nagpur - 440016",
    status: "Approved",
    foodType: "Non-Veg",
    description: "Premium non-veg dining with classic Indian and Mughlai dishes. Elegant ambience for dine-in and quick delivery options.",
    priceDay: 420,
    priceWeekly: 2700,
    priceMonthly: 9500,
    offer: 12,
    startTime:"7:00 AM",
    endTime:"10:00 PM",
    orderType: "Dining,Delivery",
    mealPreference: "Dinner",
    deliveryTiming: {
      start: "7:00 PM",
      end: "11:00 PM"
    },
    includes: [
      "Mutton Rogan Josh",
      "Chicken Biryani",
      "Butter Naan",
      "Gulab Jamun",
      "Mineral Water"
    ]
  },
  {
    id: 5,
    name: "Budget Tiffins",
    phone: "9090909090",
    address: "5, Lotus Apartments, Trimurti Nagar, Nagpur - 440022",
    status: "Rejected",
    foodType: "Veg",
    description: "Affordable tiffin service for students and working professionals. Home-cooked food delivered fresh daily.",
    priceDay: 220,
    priceWeekly: 1400,
    priceMonthly: 6000,
    offer: 18,
    startTime:"9:00 AM",
    endTime:"10:30 PM",
    orderType: "Delivery",
    mealPreference: "Lunch",
    deliveryTiming: {
      start: "12:00 PM",
      end: "2:00 PM"
    },
    includes: [
      "Rice",
      "Chapati (4)",
      "Dal / Curry",
      "Dry Veg",
      "Pickle"
    ]
  },
  {
    id: 6,
    name: "Office Meals by Aspire",
    phone: "9876512345",
    address: "12, Tech Park Road, IT Hub, Nagpur - 440024",
    status: "Approved",
    foodType: "Veg, Non-Veg",
    description: "Corporate lunch provider with customizable weekly plans. Ideal for office lunches with scheduled delivery.",
    priceDay: 380,
    priceWeekly: 2250,
    priceMonthly: 8200,
    offer: 10,
    startTime:"8:00 AM",
    endTime:"12:00 PM",
    orderType: "Delivery",
    mealPreference: "Lunch",
    deliveryTiming: {
      start: "12:30 PM",
      end: "2:00 PM"
    },
    includes: [
      "Paneer / Chicken Gravy",
      "Rice / Pulao",
      "Chapati",
      "Curd",
      "Fruit / Sweet"
    ]
  }
];


const dashboardDatas = [
  {
    id: 1,
    name: "Green Valley Boys Hostel",
    type: "Hostel",
    phone: "9876543210",
    address: "Near VNIT",
    status: "Pending",
  },
  {
    id: 2,
    name: "Scholler Den Boys Hostel",
    type: "Hostel",
    phone: "9876543210",
    address: "CRPF",
    status: "Pending",
  },
  {
    id: 3,
    name: "Ghar Ka Khana",
    type: "Tiffin",
    phone: "9876543210",
    address: "Trimurti Nagar",
    status: "Approved",
  },
  {
    id: 4,
    name: "Maharashtrian Khana",
    type: "Tiffin",
    phone: "9876543210",
    address: "Near VNIT",
    status: "Rejected",
  },
  {
    id: 5,
    name: "Scholler Den Boys Hostel",
    type: "Hostel",
    phone: "9876543210",
    address: "Near VNIT",
    status: "Approved",
  },
];

  

  const [users, setUsers] = useState(initialUsers);
  const [listingData, setListingData] = useState(pgListings);
  const [booking, setBooking] = useState(bookingDetails);
  const [restaurants, setRestaurants] = useState(restaurantListings);
  const [overView, setOverview] = useState(bookingDetails);
  const [dashboardData ,setDashboardData] =useState(dashboardDatas)

  // ✅ Render based on role (guest/provider)
  function RenderDetailsByRole({ users, setUsers }) {
    const { role } = useParams();
    if (role === "guests") {
      return <GuestDetails users={users} setUsers={setUsers} />;
    }
    return <EditProvider users={users} setUsers={setUsers} />;
  }

  // ✅ Shared listing page for PG and Restaurants
  function RenderListingByType() {
    const { listing } = useParams();
    if (listing === "pglisting") {
      return <PgListing users={listingData} setUsers={setListingData} />;
    }
    if (listing === "restaurantlisting") {
      return <PgListing users={restaurants} setUsers={setRestaurants} />;
    }
    return <div>Invalid listing type.</div>;
  }

  // ✅ Shared details page
  function RenderDetailsByType() {
    const { listing } = useParams();
    if (listing === "pglisting") {
      return <Details users={listingData} setUsers={setListingData} />;
    }
    if (listing === "restaurantlisting") {
      return <Details users={restaurants} setUsers={setRestaurants} />;
    }
    return <div>Invalid listing type.</div>;
  }

  // ✅ Shared edit page (with separate EditTiffinDetails for restaurants)
  function RenderEditDetailsByType() {
    const { listing } = useParams();
    if (listing === "pglisting") {
      return <EditDetails users={listingData} setUsers={setListingData} />;
    }
    if (listing === "restaurantlisting") {
      return <EditTiffinDetails users={restaurants} setUsers={setRestaurants} />;
    }
    return <div>Invalid listing type.</div>;
  }

  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="users/guests" replace />} /> */}
      <Route path="/" element={<Login />}></Route>
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="/password-reset-successfully" element={<PasswordResetSuccessfully />} />
      <Route path="/" element={<Layout />}>

      <Route path="dashboard" element={<Dashboard users={dashboardData} setUsers={setDashboardData}/>} /> dashboard/alerts
<Route path="dashboard/alerts" element={<Alerts />} />
        {/* -------- User Management -------- */}
        <Route path="users/:role" element={<Owner users={users} setUsers={setUsers} />} />
        <Route path="users/:role/create" element={<CreateOwner users={users} setUsers={setUsers} />} />
        <Route path="users/:role/edit/:id" element={<EditOwner users={users} setUsers={setUsers} />} />
        <Route path="users/:role/:id" element={<RenderDetailsByRole users={users} setUsers={setUsers} />} />

        {/* -------- Listing Management -------- */}
<<<<<<< HEAD
        <Route path="listings/:listing" element={<PgListing users={listing} setUsers={setListing} />} />
        <Route path="listings/:listing/:id" element={<Details users={listing} setUsers={setListing} />} />
        <Route path="listings/:listing/edit/:id" element={<RenderEditDetailsByRole users={listing} setUsers={setListing} />} />
<<<<<<< HEAD
<<<<<<< HEAD
        
        {/* -------- offers & Discount -------- */}
        {/* Sidebar-friendly paths */}
        <Route path ="offers/coupon" element={<CouponsPage />}/>
        <Route path ="offers/offer" element={<OffersPage />}/>
        <Route path ="offers/discount" element={<DiscountPage />}/>
        {/* Short aliases (optional) */}
        <Route path ="coupons" element={<CouponsPage />}/>
        <Route path ="offers" element={<OffersPage />}/>
        <Route path ="discount" element={<DiscountPage />}/>
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
        </Route>
=======
        <Route path="listings/:listing" element={<RenderListingByType />} />
        <Route path="listings/:listing/:id" element={<RenderDetailsByType />} />
        <Route path="listings/:listing/edit/:id" element={<RenderEditDetailsByType />} />

        {/* -------- Booking & Orders -------- */}
        <Route path="bookings/:booking" element={<Booking users={booking} setUsers={setBooking} />} />
        <Route path="bookings/:booking/:id" element={<BookingDetails users={booking} setUsers={setBooking} />} />

        {/* -------- Payment & Wallet -------- */}
        <Route path="/payments/:payment" element={<OverView users={overView} setUsers={setOverview} />}/>

        {/*Rating and reviews part */}
        <Route path="/reviews" element={<Reviews />} />

        {/*Chatlist part */}
        <Route path="/chats" element={<ChatList />} />
        <Route path="/chats/:chatId" element={<ChatDetails />} />

         {/*Security Log part */}
        <Route path="/security" element={<Security />} />


      </Route>
>>>>>>> 67a2b776fbc2b036b7bcae0850d1a95bc2a17c2b
=======
      </Route>
>>>>>>> parent of 18e6fdf (added offers&Discounts)
=======
      </Route>
>>>>>>> parent of 18e6fdf (added offers&Discounts)
    </Routes>
  );
}

export default PublicRoute;
