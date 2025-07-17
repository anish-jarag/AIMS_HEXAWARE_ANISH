import React, { useEffect, useState } from "react";
import axios from "axios";
import OfficerSidebar from "../../components/OfficerSidebar";

const ClaimSettlements = () => {
  const [approvedClaims, setApprovedClaims] = useState([]);
  const token = localStorage.getItem("jwtToken");

  const fetchApprovedClaims = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/claims/status/APPROVED",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApprovedClaims(res.data);
    } catch (err) {
      console.error("Error loading approved claims", err);
      alert("Failed to load approved claims.");
    }
  };

  const handlePayment = async (claimId) => {
    const amount = prompt(`Enter amount to pay for Claim #${claimId}`);
    if (!amount) return;

    try {
      const res = await axios.post(
        `http://localhost:8080/api/claim-payments/pay`,
        null,
        {
          params: {
            claimId,
            amount,
            status: "PAID",
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(res.data);
      fetchApprovedClaims();
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Failed to process payment.");
    }
  };

  useEffect(() => {
    fetchApprovedClaims();
  }, []);

  return (
    <div className="d-flex">
      <OfficerSidebar />
      <div className="container py-4">
        <h3 className="mb-4">Approved Claims for Settlement</h3>
        {approvedClaims.length === 0 ? (
          <div className="alert alert-info">
            No approved claims pending payment.
          </div>
        ) : (
          <table className="table table-hover table-bordered">
            <thead className="table-light text-center">
              <tr>
                <th>#</th>
                <th>Policy ID</th>
                <th>User</th>
                <th>Reason</th>
                <th>Approved By</th>
                <th>Decision Date</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {approvedClaims.map((claim, idx) => (
                <tr key={claim.claimId}>
                  <td>{idx + 1}</td>
                  <td>{claim.issuedPolicy?.issuedPolicyId}</td>
                  <td>{claim.submittedBy?.fullName}</td>
                  <td>{claim.claimReason}</td>
                  <td>{claim.approvedBy?.fullName || "—"}</td>
                  <td>{claim.decisionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ClaimSettlements;
