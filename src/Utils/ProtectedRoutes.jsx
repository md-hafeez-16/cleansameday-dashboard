import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
 const userId= localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
