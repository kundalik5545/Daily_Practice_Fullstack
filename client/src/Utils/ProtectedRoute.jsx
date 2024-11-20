import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const savedUser = sessionStorage.getItem("user");
  return savedUser ? <Outlet /> : <Navigate to="/" />;
  // return isLogIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
