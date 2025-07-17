import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";
import { FileText } from "react-feather";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewUserProposalDocument = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwtToken");

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/documents/proposal/${proposalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDocuments(res.data || []);
      } catch (err) {
        toast.error("Failed to load documents.");
        console.error("Error fetching documents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [proposalId]);

  return (
    <>
      <UserNavbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Proposal #{proposalId} Documents</h2>
          <p className="text-muted">
            All documents you submitted for this proposal
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
                <div className="card h-100 shadow-sm border border-primary-subtle">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="mb-3 text-center">
                      <FileText size={40} className="text-primary mb-2" />
                      <h6 className="fw-semibold text-uppercase">
                        {doc.documentType.replace("_", " ")}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-center gap-2 mt-auto">
                      <a
                        href={`${BASE_URL}/documents/view/${doc.documentId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        View
                      </a>
                      <a
                        href={`${BASE_URL}/documents/download/${doc.documentId}`}
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
            onClick={() => navigate("/user/proposals")}
          >
            ← Back to My Proposals
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewUserProposalDocument;
