import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import OfficerSidebar from "../../components/OfficerSidebar";
import { FileText } from "react-feather";

const ViewProposalDocuments = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/documents/proposal/${proposalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDocuments(res.data);
      } catch (err) {
        console.error("Error fetching documents:", err);
        alert("Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [proposalId]);

  return (
    <div className="d-flex">
      <OfficerSidebar />

      <div className="flex-grow-1" style={{ marginLeft: "260px" }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Proposal #{proposalId} Documents</h2>
            <p className="text-muted">
              All documents submitted by the user for this proposal
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : documents.length === 0 ? (
            <div className="alert alert-warning text-center">
              No documents found for this proposal.
            </div>
          ) : (
            <div className="row">
              {documents.map((doc) => (
                <div key={doc.documentId} className="col-md-4 col-sm-6 mb-4">
                  <div className="card h-100 shadow-sm border-0">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div className="mb-3 text-center">
                        <FileText size={40} className="text-primary mb-2" />
                        <h6 className="fw-semibold text-uppercase">
                          {doc.documentType}
                        </h6>
                      </div>
                      <div className="d-flex justify-content-center gap-2 mt-auto">
                        <a
                          href={`http://localhost:8080/api/documents/view/${doc.documentId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-secondary btn-sm"
                        >
                          View
                        </a>
                        <a
                          href={`http://localhost:8080/api/documents/download/${doc.documentId}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-5">
            <button
              className="btn btn-outline-dark"
              onClick={() => navigate("/admin/proposals")}
            >
              ← Back to All Proposals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProposalDocuments;
