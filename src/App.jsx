// import { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import "./App.css";
// import Login from "./Pages/Onboarding/Login/Login";
// import ProtectedRoute from "./Utils/ProtectedRoutes";
// import Dashboard from "./Pages/Dashboard/Dashboard";
// import FlowSide from "./Pages/Components/FlowSide";
// import Customer from "./Pages/Customer/Customer";
// import AllEvents from "./Pages/AllEvents/AllEvents";
// import AllCoupons from "./Pages/AllCoupons/AllCoupons";
// import AddEvents from "./Pages/AllEvents/RelatedPages/AddEvents";
// import AddCoupons from "./Pages/AllCoupons/RelatedPages/AddCoupons";
// import Bookings from "./Pages/Bookings/Bookings";
// import { Toaster } from "react-hot-toast";

// import EditCoupons from "./Pages/AllCoupons/RelatedPages/EditCoupons";
// import EditEvents from "./Pages/AllEvents/RelatedPages/EditEvents";
// import AllService from "./Pages/Service/AllService";
// import AddService from "./Pages/Service/AddService";
// import EditService from "./Pages/Service/EditService";
// import ForgotPassword from "./Pages/Onboarding/forgot-password/ForgotPassword";

// function App() {
//   return (
//     <div className="min-h-screen text-left">
//       <Router>
//         <Toaster position="top-right" />
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="forgot-password" element={<ForgotPassword />} />

//           <Route element={<ProtectedRoute />}>
//             <Route element={<FlowSide />}>
//               <Route path="dashboard" element={<Dashboard />} />
//               <Route path="customer" element={<Customer />} />
//               <Route path="service" element={<AllService />} />
//               <Route path="addservice" element={<AddService />} />
//               <Route path="editservice/:id" element={<EditService />} />
//               <Route path="bookings" element={<Bookings />} />
//             </Route>
//           </Route>

//           {/* Catch all route for any undefined paths */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./Pages/Onboarding/Login/Login";
import ProtectedRoute from "./Utils/ProtectedRoutes";
import Dashboard from "./Pages/Dashboard/Dashboard";
import FlowSide from "./Pages/Components/FlowSide";
import Customer from "./Pages/Customer/Customer";
import AllEvents from "./Pages/AllEvents/AllEvents";
import AllCoupons from "./Pages/AllCoupons/AllCoupons";
import AddEvents from "./Pages/AllEvents/RelatedPages/AddEvents";
import AddCoupons from "./Pages/AllCoupons/RelatedPages/AddCoupons";
import Bookings from "./Pages/Bookings/Bookings";
import { Toaster } from "react-hot-toast";

import EditCoupons from "./Pages/AllCoupons/RelatedPages/EditCoupons";
import EditEvents from "./Pages/AllEvents/RelatedPages/EditEvents";
import AllService from "./Pages/Service/AllService";
import AddService from "./Pages/Service/AddService";
import EditService from "./Pages/Service/EditService";
import ForgotPassword from "./Pages/Onboarding/forgot-password/ForgotPassword";
import AddBooking from "./Pages/Booking/AddBooking";
import BookingDetails from "./Pages/Bookings/BookingDetails";
// import Bookingdetails from "./Pages/Bookings/Bookingdetails";

function App() {
  return (
    <div className="min-h-screen text-left">
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="Addbooking" element={<AddBooking />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<FlowSide />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="customer" element={<Customer />} />
              <Route path="service" element={<AllService />} />
              <Route path="addservice" element={<AddService />} />
              <Route path="editservice/:id" element={<EditService />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookingdetails/:id" element={<BookingDetails />} />
            </Route>
          </Route>

          {/* Catch all route for any undefined paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
