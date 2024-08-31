import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!sessionStorage.getItem("token"); // Check if user is authenticated

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
