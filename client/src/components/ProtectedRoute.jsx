import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    // If user not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
}
