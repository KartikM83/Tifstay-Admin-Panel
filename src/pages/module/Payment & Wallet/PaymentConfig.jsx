 const PaymentConfig = {
  overview: {
    label: "overview",
    listTitle: "Bookings & Orders / PG or Hostel Bookings",
    detailsTitle: "Bookings & Orders / PG or Hostel Bookings / Booking Details",
    search :"Search by booking id",
   
    createButton: "Create New",
    table: {
      name: "Booking Id",
      phone: "Customer Name",
      address: "PG/Hostel Name",
      status: "Status",
    },
    // profilePlaceholder: "Student",
  },

   restaurant: {
    label: "restaurant",
    listTitle: "Bookings & Orders / Tiffin or Restaurant Orders",
    detailsTitle: "Bookings & Orders / Tiffin or Restaurant Orders / Order Details",
    search :"Search by order id",
   
    createButton: "Create New",
    table: {
      name: "Order Id",
      phone: "Customer Number",
      address: "Tiffin/Restaurant",
      status: "Status",
    },
    // profilePlaceholder: "Student",
  },
  
};

export default PaymentConfig;