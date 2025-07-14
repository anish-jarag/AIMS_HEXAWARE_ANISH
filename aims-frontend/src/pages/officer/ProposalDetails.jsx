import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProposalDetails = () => {
  const { proposalId } = useParams();
  const [proposal, setProposal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/proposal/${proposalId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setProposal)
      .catch(console.error);
  }, [proposalId]);

  const handleDecision = (decision) => {
    fetch(`http://localhost:8080/api/proposal/${decision}/${proposalId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        alert(`Proposal ${decision} successfully.`);
        navigate("/admin/proposals");
      })
      .catch(console.error);
  };

  const styles = {
    tableHeader: {
      backgroundColor: "#343a40",
      color: "#fff",
    },
    badge: {
      padding: "5px 10px",
      fontSize: "0.9em",
    },
  };

  if (!proposal) return <div>Loading...</div>;

  return (
    <div className="container py-4">
      <h3 className="mb-4">Proposal Details</h3>
      <div className="card shadow-sm p-3 mb-4">
        <p>
          <strong>User:</strong> {proposal.user.fullName}
        </p>
        <p>
          <strong>Vehicle:</strong> {proposal.vehicle.registrationNumber} (
          {proposal.vehicle.vehicleType})
        </p>
        <p>
          <strong>Policy:</strong> {proposal.policy.policyName}
        </p>
        <p>
          <strong>Status:</strong> {proposal.status}
        </p>
        <p>
          <strong>Submitted on:</strong> {proposal.submissionDate}
        </p>
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-success"
          onClick={() => handleDecision("approve")}
        >
          Approve & Generate Quote
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDecision("reject")}
        >
          Reject Proposal
        </button>
        <button
          className="btn btn-warning"
          onClick={() => alert("Request Additional Documents Email Sent")}
        >
          Request Additional Documents
        </button>
      </div>
    </div>
  );
};

export default ProposalDetails;
