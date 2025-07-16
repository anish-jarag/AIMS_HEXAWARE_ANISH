import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";

const UserDashboard = () => {
  const userName = localStorage.getItem("name") || "User";
  const [vehicles, setVehicles] = useState([]);
  const [proposals, setProposals] = useState([]);

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/vehicle/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error("Vehicle fetch failed", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/proposal/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProposals(res.data))
      .catch((err) => console.error("Proposal fetch failed", err));
  }, []);

  return (
    <>
      <UserNavbar />

      <div className="container py-5">
        {/* Welcome Message */}
        <div className="mb-4">
          <h2 className="fw-bold">Welcome back, {userName} 👋</h2>
          <p className="text-muted">
            Here's a quick overview of your insurance activity.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body d-flex align-items-center gap-3">
                <div>
                  <h6 className="text-muted mb-1">My Vehicles</h6>
                  <h4 className="fw-bold">{vehicles.length}</h4>
                  <Link
                    to="/user/my-vehicles"
                    className="btn btn-sm btn-outline-primary mt-2"
                  >
                    Manage Vehicles
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body d-flex align-items-center gap-3">
                <div>
                  <h6 className="text-muted mb-1">Applications Submitted</h6>
                  <h4 className="fw-bold">{proposals.length}</h4>
                  <Link
                    to="/user/proposals"
                    className="btn btn-sm btn-outline-success mt-2"
                  >
                    View Applications
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body d-flex align-items-center gap-3">
                <div>
                  <h6 className="text-muted mb-1">Need Coverage?</h6>
                  <h4 className="fw-bold">Apply Now</h4>
                  <Link
                    to="/user/proposal/new"
                    className="btn btn-sm btn-primary mt-2"
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
            <table className="table table-hover align-middle">
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
