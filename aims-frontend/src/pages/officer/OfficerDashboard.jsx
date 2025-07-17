import React, { useEffect, useState } from "react";
import OfficerSidebar from "../../components/OfficerSidebar";

const OfficerDashboard = () => {
  const officerName = localStorage.getItem("name") || "Officer";
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("jwtToken");

  const [summary, setSummary] = useState({
    totalProposals: 0,
    pendingProposals: 0,
    approvedProposals: 0,
    totalClaims: 0,
    approvedClaims: 0,
    rejectedClaims: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !BASE_URL) return;

    const fetchSummary = async () => {
      try {
        const res = await fetch(`${BASE_URL}/dashboard/officer-summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard summary.");
        }

        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [BASE_URL, token]);

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
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div style={{ width: "250px", flexShrink: 0 }}>
        <OfficerSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 px-4 py-4 bg-white">
        <h2 className="mb-1">Welcome, {officerName}</h2>
        <p className="text-muted mb-4">Here’s a quick overview of activity:</p>

        {loading ? (
          <div className="text-center text-muted">Loading data...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-3">
            {cards.map((c, i) => (
              <div className="col-sm-6 col-md-4" key={i}>
                <div
                  className={`card shadow-sm border-0 bg-${c.bg} text-white h-100`}
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
        )}
      </div>
    </div>
  );
};

export default OfficerDashboard;
