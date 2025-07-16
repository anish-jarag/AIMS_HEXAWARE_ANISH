import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OfficerSidebar from "../../components/OfficerSidebar";

const ManageProposals = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); // correct key name
    if (!token) return;

    fetch("http://localhost:8080/api/proposal/all-submitted", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch proposals");
        return res.json();
      })
      .then((data) => setProposals(data))
      .catch((err) => {
        console.error("Error fetching proposals:", err);
      });
  }, []);

  return (
    <div className="d-flex">
      <OfficerSidebar />
      <div className="container py-4">
        <h2 className="mb-4">Manage Proposals</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="bg-dark text-white">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Vehicle</th>
                <th>Policy</th>
                <th>Status</th>
                <th>Submitted On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal, index) => (
                <tr key={proposal.proposalId}>
                  <td>{index + 1}</td>
                  <td>{proposal.user?.fullName || "N/A"}</td>
                  <td>{proposal.vehicle?.registrationNumber || "N/A"}</td>
                  <td>{proposal.policy?.policyName || "N/A"}</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      {proposal.status}
                    </span>
                  </td>
                  <td>{proposal.submissionDate || "N/A"}</td>
                  <td>
                    <Link
                      to={`/admin/proposals/${proposal.proposalId}`}
                      className="btn btn-sm btn-primary"
                    >
                      View & Approve
                    </Link>
                  </td>
                </tr>
              ))}
              {proposals.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No submitted proposals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProposals;
