import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";

const MyProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/proposal/my")
      .then((res) => res.json())
      .then((data) => setProposals(data))
      .catch((err) => console.error("Error fetching proposals:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="container my-5">
        <h3 className="mb-4 text-center">My Insurance Proposals</h3>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : proposals.length === 0 ? (
          <div className="alert alert-info text-center">
            You haven't submitted any proposals yet.
          </div>
        ) : (
          <div className="row">
            {proposals.map((p) => (
              <div key={p.proposalId} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Proposal #{p.proposalId}</h5>
                    <p className="card-text mb-1">
                      <strong>Vehicle:</strong> {p.vehicle?.registrationNumber}{" "}
                      ({p.vehicle?.vehicleType})
                    </p>
                    <p className="card-text mb-1">
                      <strong>Policy:</strong> {p.policy?.policyName}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          p.status === "APPROVED"
                            ? "bg-success"
                            : p.status === "REJECTED"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {p.status}
                      </span>
                    </p>
                    <p className="card-text">
                      <strong>Submitted on:</strong> {p.submissionDate}
                    </p>
                  </div>
                  <div className="card-footer bg-white border-0 text-end">
                    <a
                      href={`/user/documents/${p.proposalId}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      View Documents
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyProposals;
