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

  const [users, setUsers] = useState(initialUsers);
  const [listing, setListing] = useState(pgListings);

  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="users/guests" replace />} />

      {/* Layout wrapper */}
      <Route path="/" element={<Layout />}>
        {/* -------- User Management -------- */}
        <Route path="users/:role" element={<Owner users={users} setUsers={setUsers}/>} />
        <Route path="users/:role/create" element={<CreateOwner users={users} setUsers={setUsers}/>} />
        <Route path="users/:role/edit/:id" element={<EditOwner users={users} setUsers={setUsers} />} />
        <Route path="users/:role/:id" element={<RenderDetailsByRole users={users} setUsers={setUsers} />} />

        {/* -------- Listing Management -------- */}
        <Route path="listings/:listing" element={<PgListing users={listing} setUsers={setListing} />} />
        <Route path="listings/:listing/:id" element={<Details users={listing} setUsers={setListing} />} />
        <Route path="listings/:listing/edit/:id" element={<RenderEditDetailsByRole users={listing} setUsers={setListing} />} />
      </Route>
    </Routes>
  );
}

// helper functions
function RenderDetailsByRole({ users, setUsers }) {
  const { role } = useParams();
  if (role === "guests") {
    return <GuestDetails users={users} setUsers={setUsers} />;
  }
  return <EditProvider users={users} setUsers={setUsers} />;
}

function RenderEditDetailsByRole({ users, setUsers }) {
  const { listing } = useParams();
  if (listing === "pglisting") {
    return <EditDetails users={users} setUsers={setUsers} />;
  }
  return <EditTiffinDetails users={users} setUsers={setUsers} />;
}
export default PublicRoute;
