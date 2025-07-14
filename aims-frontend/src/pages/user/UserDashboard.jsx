import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";

const UserDashboard = () => {
  const userName = localStorage.getItem("name") || "User";
  const [vehicles, setVehicles] = useState([]);
  const [proposals, setProposals] = useState([]);

  // Fetch user's vehicles
  useEffect(() => {
    fetch("http://localhost:8080/api/vehicle/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => res.json())
      .then(setVehicles)
      .catch((err) => console.error("Vehicle fetch failed", err));
  }, []);

  // Fetch user's proposals
  useEffect(() => {
    fetch("http://localhost:8080/api/proposal/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => res.json())
      .then(setProposals)
      .catch((err) => console.error("Proposal fetch failed", err));
  }, []);

  return (
    <>
      <UserNavbar />

      <div className="container py-4">
        {/* Welcome */}
        <h2 className="fw-bold">Welcome back, {userName}</h2>
        <p className="text-muted mb-4">Your insurance activity at a glance</p>

        {/* Summary Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex align-items-center">
                <i className="bi bi-car-front fs-2 text-primary me-3" />
                <div>
                  <h6 className="mb-1 text-muted">My Vehicles</h6>
                  <h4 className="fw-bold mb-1">{vehicles.length}</h4>
                  <Link
                    to="/user/vehicles"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Manage Vehicles
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex align-items-center">
                <i className="bi bi-file-text fs-2 text-success me-3" />
                <div>
                  <h6 className="mb-1 text-muted">Applications Submitted</h6>
                  <h4 className="fw-bold mb-1">{proposals.length}</h4>
                  <Link
                    to="/user/proposals"
                    className="btn btn-sm btn-outline-success"
                  >
                    View Applications
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex align-items-center">
                <i className="bi bi-file-plus fs-2 text-info me-3" />
                <div>
                  <h6 className="mb-1 text-muted">Need Coverage?</h6>
                  <h4 className="fw-bold mb-1">Apply Now</h4>
                  <Link
                    to="/user/proposal/new"
                    className="btn btn-sm btn-primary"
                  >
                    Apply for Insurance
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Proposals Table */}
        <h4 className="mb-3">Recent Applications</h4>
        {proposals.length === 0 ? (
          <p className="text-muted">You haven’t applied for insurance yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Vehicle</th>
                  <th>Policy</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {proposals.slice(0, 5).map((p) => (
                  <tr key={p.proposalId}>
                    <td>{p.proposalId}</td>
                    <td>{p.vehicle?.registrationNumber || "N/A"}</td>
                    <td>{p.policy?.policyName}</td>
                    <td>
                      <span
                        className={`badge ${
                          p.status === "APPROVED"
                            ? "bg-success"
                            : p.status === "REJECTED"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td>{p.submissionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDashboard;
