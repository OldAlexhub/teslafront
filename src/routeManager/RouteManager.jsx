import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../routes/Home";
import Login from "../routes/Login";

const ProtectedRoute = ({ children }) => {
  const checkAuthorized = () => {
    const userId = localStorage.getItem("userId");
    return !!userId; // Convert to boolean: true if userId exists, false otherwise
  };

  if (!checkAuthorized()) {
    // If not authorized, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If authorized, render the children components
  return children;
};

const RouteManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteManager;
