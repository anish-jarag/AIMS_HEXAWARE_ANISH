import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("name") || "User";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-3 shadow-sm">
      <Link className="navbar-brand fw-bold" to="/user/dashboard">
        <i className="bi bi-shield-lock me-2" />
        HexaShield
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#userNavbar"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="userNavbar">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0 ms-4 gap-4">
          <li className="nav-item">
            <Link to="/user/dashboard" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/my-vehicles" className="nav-link">
              My Vehicles
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/proposal/new" className="nav-link">
              Apply for Insurance
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/proposals" className="nav-link">
              My Applications
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/my-policies" className="nav-link">
              My Policies
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/my-payments" className="nav-link">
              Payments
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/claims" className="nav-link">
              My Claims
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/profile" className="nav-link">
              Profile
            </Link>
          </li>
        </ul>

        <div className="d-flex align-items-center gap-3">
          <span className="text-white fw-semibold">Hi, {userName}</span>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
