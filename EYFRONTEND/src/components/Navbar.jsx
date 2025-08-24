import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's full name from localStorage
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName); // Use the full name directly
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage and redirect to the login page
    localStorage.clear();
    navigate("/SignIn");
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#00bcd4" }}
      >
        <div className="container-fluid px-3">
          <Link className="navbar-brand text-dark fw-bold d-flex align-items-center" to={"/"}>
            <img src="src/assets/react.svg" alt="Logo" style={{ width: "30px", height: "30px", marginRight: "8px" }} /> 
            <span className="d-none d-sm-inline">AUCTIONPRO</span>
            <span className="d-sm-none">AUCTION</span>
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-dark fw-medium" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-medium" to={"/about"}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-medium" to={"/Contact"}>
                  Contact
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark fw-medium" to={"/Dashboard"}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark fw-medium" to={"/AuctionDetails"}>
                      <span className="d-none d-md-inline">Auction Details</span>
                      <span className="d-md-none">Auctions</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isAuthenticated ? (
                <>
                  <li className="nav-item d-flex align-items-center">
                    <span className="nav-link text-dark">
                      <span className="d-none d-lg-inline">Welcome </span>
                      <span className="fw-bold">{userName}</span>
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={handleLogout}
                    >
                      <span className="d-none d-sm-inline">Logout</span>
                      <span className="d-sm-none">
                        <i className="fas fa-sign-out-alt"></i>
                      </span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark fw-medium" to={"/SignIn"}>
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark fw-medium" to={"/SignUp"}>
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {isAdmin && (
              <ul className="navbar-nav ms-2">
                <li className="nav-item">
                  <Link className="btn btn-warning btn-sm" to="/admin">
                    <span className="d-none d-md-inline">Admin Dashboard</span>
                    <span className="d-md-none">Admin</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;