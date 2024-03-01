import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../routes/Home";
import Login from "../routes/Login";
import GraphOne from "../components/GraphOne";
import GraphTwo from "../components/GraphTwo";
import GraphThree from "../components/GraphThree";
import GraphFour from "../components/GraphFour";

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
          <Route
            path="graphone"
            element={
              <ProtectedRoute>
                <GraphOne />
              </ProtectedRoute>
            }
          />
          <Route
            path="graphtwo"
            element={
              <ProtectedRoute>
                <GraphTwo />
              </ProtectedRoute>
            }
          />
          <Route
            path="graphthree"
            element={
              <ProtectedRoute>
                <GraphThree />
              </ProtectedRoute>
            }
          />
          <Route
            path="graphfour"
            element={
              <ProtectedRoute>
                <GraphFour />
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
