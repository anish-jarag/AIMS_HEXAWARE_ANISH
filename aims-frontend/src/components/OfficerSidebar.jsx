import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OfficerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/policies", label: "Manage Policies" },
    { path: "/admin/addons", label: "Manage Addons" },
    { path: "/admin/proposals", label: "Manage Proposals" },
    { path: "/admin/payments", label: "Proposal Payments" },
    { path: "/admin/reports", label: "Issued Policies" },
    { path: "/admin/claims", label: "Manage Claims" },
    { path: "/admin/claim-payments", label: "Claim Payments" },
    { path: "/admin/users", label: "Registered Users" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="bg-light border-end d-flex flex-column"
      style={{
        width: "220px",
        minHeight: "100vh",
        padding: "1.5rem 1rem",
        position: "sticky",
        top: 0,
        wordWrap: "break-word",
        whiteSpace: "normal",
        flexShrink: 0,
      }}
    >
      <h5
        className="text-primary fw-bold mb-4 text-center"
        style={{ lineHeight: "1.3", fontSize: "1.1rem" }}
      >
        HexaShield Officer Panel
      </h5>

      <ul className="nav flex-column mb-4">
        {navItems.map((item) => (
          <li className="nav-item mb-2" key={item.path}>
            <Link
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path
                  ? "fw-bold text-dark"
                  : "text-secondary"
              }`}
              style={{
                fontSize: "0.95rem",
                wordBreak: "break-word",
                lineHeight: "1.4",
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-3 border-top">
        <button
          className="btn btn-danger w-100 fw-semibold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default OfficerSidebar;
