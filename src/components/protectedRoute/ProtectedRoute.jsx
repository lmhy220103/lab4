// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

// Nhận `isAuthenticated` và `userRole` từ props hoặc context
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== 1) {
    // Redirect to unauthorized page if not admin
    return <Navigate to="/home" />;
  } else {
    // Render component if authenticated and role is admin
    return <Outlet />;
  }
};

export default ProtectedRoute;
