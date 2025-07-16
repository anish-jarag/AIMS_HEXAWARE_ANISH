import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProposalDetails = () => {
  const { proposalId } = useParams();
  const [proposal, setProposal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    fetch(`http://localhost:8080/api/proposal/${proposalId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load proposal");
        return res.json();
      })
      .then(setProposal)
      .catch((err) => {
        console.error(err);
      });
  }, [proposalId]);

  const handleDecision = (decision) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    fetch(`http://localhost:8080/api/proposal/${decision}/${proposalId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Action failed");
        return res.text();
      })
      .then((message) => {
        alert(message);
        navigate("/admin/proposals");
      })
      .catch((err) => {
        console.error(err);
        alert(`Failed to ${decision} proposal.`);
      });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-center">📋 Proposal Details</h2>

      {!proposal ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div className="card shadow p-4 mb-4">
          <h5 className="mb-3 border-bottom pb-2 fw-semibold">👤 User Info</h5>
          <p>
            <strong>Name:</strong> {proposal.user?.fullName}
          </p>
          <p>
            <strong>Email:</strong> {proposal.user?.email}
          </p>

          <h5 className="mt-4 mb-3 border-bottom pb-2 fw-semibold">
            🚗 Vehicle Info
          </h5>
          <p>
            <strong>Reg. Number:</strong> {proposal.vehicle?.registrationNumber}
          </p>
          <p>
            <strong>Type:</strong> {proposal.vehicle?.vehicleType}
          </p>
          <p>
            <strong>Model:</strong> {proposal.vehicle?.make}{" "}
            {proposal.vehicle?.model}
          </p>
          <p>
            <strong>Year:</strong> {proposal.vehicle?.yearOfManufacture}
          </p>

          <h5 className="mt-4 mb-3 border-bottom pb-2 fw-semibold">
            📄 Policy Info
          </h5>
          <p>
            <strong>Policy:</strong> {proposal.policy?.policyName}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="badge bg-info text-dark">{proposal.status}</span>
          </p>
          <p>
            <strong>Submitted on:</strong> {proposal.submissionDate}
          </p>
          {proposal.approvedBy && (
            <p>
              <strong>Approved By:</strong> {proposal.approvedBy.fullName}
            </p>
          )}
        </div>
      )}

      <div className="d-flex flex-wrap gap-3 mt-4 justify-content-center">
        <button
          className="btn btn-success"
          disabled={!proposal}
          onClick={() => handleDecision("approve")}
        >
          Approve & Generate Quote
        </button>
        <button
          className="btn btn-danger"
          disabled={!proposal}
          onClick={() => handleDecision("reject")}
        >
          Reject Proposal
        </button>
        <button
          className="btn btn-primary"
          disabled={!proposal}
          onClick={() =>
            navigate(`/officer/proposals/${proposal.proposalId}/documents`)
          }
        >
          View Submitted Documents
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
            alert("Feature under construction: Request Additional Documents")
          }
        >
          Request More Documents
        </button>
        <button
          className="btn btn-outline-primary"
          disabled={!proposal}
          onClick={() => navigate(`/admin/proposals`)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ProposalDetails;
