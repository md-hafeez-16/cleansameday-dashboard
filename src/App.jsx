import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Onboarding/Login/Login";
import ProtectedRoute from "./Utils/ProtectedRoutes";
import Dashboard from "./Pages/Dashboard/Dashboard";
import FlowSide from "./Pages/Components/FlowSide";
import Costumer from "./Pages/Costumer/Costumer";
import AllEvents from "./Pages/AllEvents/AllEvents";
import AllTickets from "./Pages/AllTickets/AllTickets";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen text-left">
      
      <Router>
      <Toaster
          position="top-right"/>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route element={<ProtectedRoute />}> */}
            <Route element={<FlowSide />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="costumer" element={<Costumer />} />
              <Route path="events" element={<AllEvents />} />
              <Route path="tickets" element={<AllTickets />} />
              {/* <Route path="coupons" element={<AllCoupons />} /> */}
              
            </Route>
          {/* </Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
