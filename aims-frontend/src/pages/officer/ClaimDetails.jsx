import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/OfficerSidebar";
import { useParams, useNavigate } from "react-router-dom";

const ClaimDetails = () => {
  const { claimId } = useParams();
  const token = localStorage.getItem("jwtToken");
  const officerId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [claim, setClaim] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (!token) return;

    axios
      .get(`http://localhost:8080/api/claims/${claimId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setClaim(res.data))
      .catch((err) => {
        console.error("Failed to fetch claim", err);
        alert("Failed to load claim details.");
      });

    axios
      .get(`http://localhost:8080/api/claim-documents/claim/${claimId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDocuments(res.data))
      .catch((err) => {
        console.error("Failed to fetch documents", err);
      });
  }, [claimId]);

  const handleDecision = async (decision) => {
    const remarks = prompt(`Enter remarks for ${decision.toLowerCase()}:`);
    if (!remarks) return;

    let amount = 0;
    if (decision === "APPROVED") {
      amount = prompt("Enter approved claim amount:");
      if (
        !amount ||
        isNaN(amount) ||
        amount > claim.issuedPolicy.coverageAmount
      ) {
        alert("Invalid amount.");
        return;
      }
    }

    try {
      await axios.put("http://localhost:8080/api/claims/decide", null, {
        params: {
          claimId,
          officerId,
          decision,
          remarks,
          amount: decision === "APPROVED" ? amount : undefined,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(`Claim ${decision.toLowerCase()} successfully.`);
      navigate("/admin/claims/settlements");
    } catch (err) {
      console.error("Error approving/rejecting:", err);
      alert("Action failed.");
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="container py-4">
        <h3 className="mb-3">Claim Review: #{claimId}</h3>

        {!claim ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : (
          <div className="card p-4 shadow-sm">
            <h5>User: {claim.submittedBy?.fullName}</h5>
            <p>
              <strong>Email:</strong> {claim.submittedBy?.email}
            </p>
            <p>
              <strong>Vehicle:</strong>{" "}
              {claim.issuedPolicy?.proposal?.vehicle?.registrationNumber}
            </p>
            <p>
              <strong>Policy:</strong> {claim.issuedPolicy?.policy?.policyName}
            </p>
            <p>
              <strong>Coverage:</strong> ₹{claim.issuedPolicy?.coverageAmount}
            </p>
            <p>
              <strong>Reason:</strong> {claim.claimReason}
            </p>
            <p>
              <strong>Submitted:</strong> {claim.submittedDate}
            </p>

            <h5 className="mt-4">Uploaded Documents</h5>
            {documents.length === 0 ? (
              <p>No documents uploaded.</p>
            ) : (
              <ul className="list-group mb-3">
                {documents.map((doc) => (
                  <li
                    key={doc.claimDocumentId}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {doc.documentType}
                    <a
                      className="btn btn-sm btn-outline-primary"
                      href={`http://localhost:8080/api/claim-documents/download/${doc.claimDocumentId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <div className="d-flex gap-3 mt-3">
              <button
                className="btn btn-success"
                onClick={() => handleDecision("APPROVED")}
              >
                Approve & Settle
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDecision("REJECTED")}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/admin/claims")}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimDetails;
