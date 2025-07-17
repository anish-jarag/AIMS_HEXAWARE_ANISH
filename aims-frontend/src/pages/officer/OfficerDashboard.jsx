import React from "react";
import OfficerSidebar from "../../components/OfficerSidebar";

const OfficerDashboard = () => {
  const officerName = localStorage.getItem("name") || "Officer";

  const summary = {
    totalProposals: 12,
    pendingProposals: 3,
    approvedProposals: 9,
    totalClaims: 8,
    approvedClaims: 5,
    rejectedClaims: 2,
  };

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
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div
          className="col-auto bg-light d-flex flex-column p-0"
          style={{
            width: "220px",
            borderRight: "1px solid #dee2e6",
            minHeight: "100vh",
          }}
        >
          <OfficerSidebar />
        </div>

        {/* Main Content */}
        <div className="col ps-4 pe-4 py-4" style={{ marginLeft: "220px" }}>
          <h2 className="mt-2">Welcome, {officerName}</h2>
          <p className="text-muted">Here’s a quick overview of activity:</p>

          {/* Cards */}
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
