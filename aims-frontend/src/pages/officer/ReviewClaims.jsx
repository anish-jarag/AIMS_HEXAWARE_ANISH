import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/OfficerSidebar";
import { useNavigate } from "react-router-dom";

const ReviewClaims = () => {
  const [claims, setClaims] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/claims/status/PENDING", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setClaims(res.data))
      .catch((err) => {
        console.error("Failed to fetch claims", err);
        alert("Failed to load claims.");
      });
  }, []);

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="container py-4">
        <h3 className="mb-4">Pending Claim Reviews</h3>
        {claims.length === 0 ? (
          <div className="alert alert-info">No pending claims.</div>
        ) : (
          <table className="table table-hover table-bordered">
            <thead className="table-light">
              <tr className="text-center">
                <th>#</th>
                <th>Policy ID</th>
                <th>User</th>
                <th>Reason</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim, idx) => (
                <tr key={claim.claimId} className="text-center">
                  <td>{idx + 1}</td>
                  <td>{claim.issuedPolicy?.issuedPolicyId}</td>
                  <td>{claim.submittedBy?.fullName}</td>
                  <td>{claim.claimReason}</td>
                  <td>{claim.submittedDate}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => navigate(`/admin/claims/${claim.claimId}`)}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReviewClaims;
