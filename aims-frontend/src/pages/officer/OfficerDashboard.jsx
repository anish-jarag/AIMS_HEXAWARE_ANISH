import React, { useEffect, useState } from "react";
import OfficerSidebar from "../../components/OfficerSidebar";

const OfficerDashboard = () => {
  const officerName = localStorage.getItem("name") || "Officer";

  const [summary, setSummary] = useState({
    totalProposals: 0,
    pendingProposals: 0,
    approvedProposals: 0,
    totalClaims: 0,
    approvedClaims: 0,
    rejectedClaims: 0,
  });

  // Load summary counts from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/dashboard/summary", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Failed to fetch summary", err));
  }, []);

  const cards = [
    {
      title: "Total Proposals",
      count: summary.totalProposals,
      icon: "bi bi-folder2-open",
      bg: "primary",
    },
    {
      title: "Pending Proposals",
      count: summary.pendingProposals,
      icon: "bi bi-hourglass-split",
      bg: "warning",
    },
    {
      title: "Approved Proposals",
      count: summary.approvedProposals,
      icon: "bi bi-check2-circle",
      bg: "success",
    },
    {
      title: "Total Claims",
      count: summary.totalClaims,
      icon: "bi bi-clipboard-data",
      bg: "info",
    },
    {
      title: "Approved Claims",
      count: summary.approvedClaims,
      icon: "bi bi-patch-check",
      bg: "success",
    },
    {
      title: "Rejected Claims",
      count: summary.rejectedClaims,
      icon: "bi bi-x-circle",
      bg: "danger",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap min-vh-100">
        {/* Sidebar */}
        <div
          className="col-auto px-0 bg-light"
          style={{ width: "220px", borderRight: "1px solid #dee2e6" }}
        >
          <OfficerSidebar />
        </div>

        {/* Main Content */}
        <div className="col ps-md-4 pe-4 py-4">
          <h2 className="mt-2">Welcome, {officerName}</h2>
          <p className="text-muted">Here’s a quick overview of activity:</p>

          {/* Summary Cards */}
          <div className="row g-3 mt-3">
            {cards.map((c, i) => (
              <div className="col-md-4" key={i}>
                <div
                  className={`card shadow-sm border-0 bg-${c.bg} text-white`}
                >
                  <div className="card-body d-flex align-items-center">
                    <i className={`${c.icon} fs-2 me-3`}></i>
                    <div>
                      <h6 className="mb-0">{c.title}</h6>
                      <h4 className="fw-bold">{c.count}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;
