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
      className="d-flex flex-column shadow-sm bg-light"
      style={{
        width: "250px",
        minHeight: "100vh",
        padding: "2rem 1.25rem",
        borderRight: "1px solid #dee2e6",
        position: "sticky",
        top: 0,
      }}
    >
      <div className="mb-5 text-center">
        <div className="fw-bold text-dark fs-4">HexaShield</div>
        <div className="text-muted small">Officer Panel</div>
      </div>

      <nav className="flex-grow-1">
        <ul className="nav flex-column gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <li className="nav-item" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link w-100 text-start px-3 py-2 rounded ${
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
