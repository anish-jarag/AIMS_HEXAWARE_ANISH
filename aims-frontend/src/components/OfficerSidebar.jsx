import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OfficerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/policies", label: "Policy Management" },
    { path: "/admin/addons", label: "Add-on Management" },
    { path: "/admin/proposals", label: "Proposal Review" },
    { path: "/admin/payments", label: "Payment Overview" },
    { path: "/officer/issued-policies", label: "Issued Policies" },
    { path: "/admin/claims/review", label: "Claim Review" },
    { path: "/admin/claims/settlements", label: "Claim Settlements" },
    { path: "/officer/registered-users", label: "Registered Users" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column shadow-sm"
      style={{
        width: "250px",
        minHeight: "100vh",
        padding: "2rem 1.25rem",
        background: "#f8f9fa",
        borderRight: "1px solid #dee2e6",
        position: "sticky",
        top: 0,
      }}
    >
      <div className="mb-5 text-center">
        <div className="fw-bold text-dark" style={{ fontSize: "1.3rem" }}>
          HexaShield
        </div>
        <div className="text-muted" style={{ fontSize: "0.85rem" }}>
          Officer Panel
        </div>
      </div>

      <nav className="flex-grow-1">
        <ul className="nav flex-column">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li className="nav-item mb-1" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link d-block px-3 py-2 rounded ${
                    isActive
                      ? "bg-primary text-white fw-semibold shadow-sm"
                      : "text-dark"
                  }`}
                  style={{
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-top">
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger w-100 fw-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default OfficerSidebar;
