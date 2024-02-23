import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    // Check for userId in localStorage
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsUserLoggedIn(true); // Hide login tab if user is logged in
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("userId");
    setIsUserLoggedIn(false); // Immediately update state to reflect logout
    navigate("/login"); // Navigate to login without delay
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {" "}
        {/* Apply Bootstrap navbar */}
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            My Tesla Health
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {isUserLoggedIn ? (
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    style={{
                      border: "none",
                      background: "none",
                      padding: 0,
                      color: "inherit",
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
