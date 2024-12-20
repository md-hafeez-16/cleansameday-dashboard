import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Onboarding/Login/Login";
import ProtectedRoute from "./Utils/ProtectedRoutes";
import Dashboard from "./Pages/Dashboard/Dashboard";
import FlowSide from "./Pages/Components/FlowSide";
import Customer from "./Pages/Customer/Customer";
import AllEvents from "./Pages/AllEvents/AllEvents";
import AllTickets from "./Pages/AllTickets/AllTickets";
import AllCoupons from "./Pages/AllCoupons/AllCoupons";
import AddEvents from "./Pages/AllEvents/RelatedPages/AddEvents";
import AddTickets from "./Pages/AllTickets/RelatedPages/AddTickets";
import AddCoupons from "./Pages/AllCoupons/RelatedPages/AddCoupons";
import Bookings from "./Pages/Bookings/Bookings";

function App() {
  return (
    <div className="min-h-screen text-left">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route element={<ProtectedRoute />}> */}
            <Route element={<FlowSide />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="customer" element={<Customer />} />
              <Route path="events" element={<AllEvents />} />
              <Route path="events/addEvents" element={<AddEvents />} />
              <Route path="tickets" element={<AllTickets />} />
              <Route path="tickets/addTickets" element={<AddTickets />} />
              <Route path="coupons" element={<AllCoupons />} />
              <Route path="coupons/addCoupons" element={<AddCoupons />} />
              <Route path="bookings" element={<Bookings />} />
            </Route>
          {/* </Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
