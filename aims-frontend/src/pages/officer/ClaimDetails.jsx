import React, { useEffect, useState } from "react";
import axios from "axios";
import OfficerSidebar from "../../components/OfficerSidebar";
import { useParams, useNavigate } from "react-router-dom";

const ClaimDetails = () => {
  const { claimId } = useParams();
  const token = localStorage.getItem("jwtToken");
  const officerId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [claim, setClaim] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (!token || !BASE_URL) return;

    axios
      .get(`${BASE_URL}/claims/${claimId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setClaim(res.data))
      .catch((err) => {
        console.error("Failed to fetch claim", err);
        alert("Failed to load claim details.");
      });

    axios
      .get(`${BASE_URL}/claim-documents/claim/${claimId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDocuments(res.data))
      .catch((err) => {
        console.error("Failed to fetch documents", err);
      });
  }, [claimId, token, BASE_URL]);

  const handleDecision = async (decision) => {
    const remarks = prompt(`Enter remarks for ${decision.toLowerCase()}:`);
    if (!remarks) return;

    let amount = 0;
    if (decision === "APPROVED") {
      amount = prompt("Enter approved claim amount:");
      if (
        !amount ||
        isNaN(amount) ||
        parseFloat(amount) > claim.issuedPolicy.coverageAmount
      ) {
        alert("Invalid amount.");
        return;
      }
    }

    try {
      await axios.put(`${BASE_URL}/claims/decide`, null, {
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
      navigate("/admin/claims/review");
    } catch (err) {
      console.error("Error approving/rejecting:", err);
      alert("Action failed.");
    }
  };

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(105deg,#cbe9fd 0%, #f8fbfc 100%)",
      }}
    >
      {/* Sidebar */}
      <div>
        <OfficerSidebar />
      </div>

      {/* Main area */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-start py-4 px-2 px-md-4">
        <div
          className="card shadow-lg border-0 w-100"
          style={{
            maxWidth: 650,
            borderRadius: 16,
            background: "#fff",
            minHeight: "480px",
            marginTop: 16,
          }}
        >
          <div className="card-body p-md-4 p-3">
            <h3
              className="fw-semibold mb-4 d-flex align-items-center"
              style={{ letterSpacing: 0.3 }}
            >
              <span className="me-2 fs-3" role="img" aria-label="doc">
                📝
              </span>
              Claim Review:{" "}
              <span className="text-primary ms-2">#{claimId}</span>
            </h3>

            {!claim ? (
              <div className="d-flex justify-content-center align-items-center flex-column py-5">
                <div
                  className="spinner-border text-primary mb-2"
                  role="status"
                />
                <div className="text-muted fst-italic mt-1">
                  Loading claim details…
                </div>
              </div>
            ) : (
              <>
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                  <div>
                    <div className="h5 mb-0">{claim.submittedBy?.fullName}</div>
                    <span className="text-muted small">
                      {claim.submittedBy?.email}
                    </span>
                  </div>
                  <span
                    className={`badge rounded-pill px-3 py-2 fw-semibold
                      bg-${
                        claim.status === "APPROVED"
                          ? "success"
                          : claim.status === "REJECTED"
                          ? "danger"
                          : "warning"
                      }
                      `}
                    style={{
                      fontSize: "1em",
                      letterSpacing: 0.7,
                      textTransform: "capitalize",
                    }}
                  >
                    {claim.status}
                  </span>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6 col-12 mb-2">
                    <p className="mb-1">
                      <strong>Vehicle:</strong>{" "}
                      <span className="text-dark">
                        {
                          claim.issuedPolicy?.proposal?.vehicle
                            ?.registrationNumber
                        }
                      </span>
                    </p>
                    <p className="mb-1">
                      <strong>Policy:</strong>{" "}
                      {claim.issuedPolicy?.policy?.policyName}
                    </p>
                    <p className="mb-1">
                      <strong>Coverage:</strong>{" "}
                      <span className="fw-bold text-success">
                        ₹{claim.issuedPolicy?.coverageAmount}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <p className="mb-1">
                      <strong>Submitted:</strong> {claim.submittedDate}
                    </p>
                    <p className="mb-1">
                      <strong>Reason:</strong> {claim.claimReason}
                    </p>
                  </div>
                </div>

                <hr className="my-4" />
                <div className="mb-3">
                  <h5 className="mb-2">
                    <span className="me-2 fs-6" role="img" aria-label="files">
                      📄
                    </span>
                    Uploaded Documents
                  </h5>
                  {documents.length === 0 ? (
                    <div className="text-muted fst-italic">
                      No documents uploaded.
                    </div>
                  ) : (
                    <ul className="list-group mb-3">
                      {documents.map((doc) => (
                        <li
                          key={doc.claimDocumentId}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <span>
                            <span className="me-2" role="img" aria-label="doc">
                              📄
                            </span>
                            {doc.documentType}
                          </span>
                          <a
                            className="btn btn-sm btn-outline-primary"
                            href={`${BASE_URL}/claim-documents/download/${doc.claimDocumentId}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="d-flex flex-wrap gap-3 mt-4 justify-content-end">
                  <button
                    className="btn btn-success px-4"
                    onClick={() => handleDecision("APPROVED")}
                  >
                    Approve & Settle
                  </button>
                  <button
                    className="btn btn-danger px-4"
                    onClick={() => handleDecision("REJECTED")}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary px-4"
                    onClick={() => navigate("/admin/claims/review")}
                  >
                    Back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetails;
