import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OfficerSidebar from "../../components/OfficerSidebar";

const ManageProposals = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/proposal/all-submitted", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setProposals)
      .catch(console.error);
  }, []);

  return (
    <div className="d-flex">
      <OfficerSidebar />
      <div className="container py-4">
        <h2 className="mb-4">Manage Proposals</h2>
        <table className="table table-bordered table-hover shadow-sm">
          <thead className="bg-dark text-white">
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Vehicle</th>
              <th>Policy</th>
              <th>Status</th>
              <th>Date Submitted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal, index) => (
              <tr key={proposal.proposalId}>
                <td>{index + 1}</td>
                <td>{proposal.user.fullName}</td>
                <td>{proposal.vehicle.registrationNumber}</td>
                <td>{proposal.policy.policyName}</td>
                <td>
                  <span className="badge bg-warning text-dark">
                    {proposal.status}
                  </span>
                </td>
                <td>{proposal.submissionDate}</td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProposals;
