import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";

const MyClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (!userId || !token) return;

    axios
      .get(`http://localhost:8080/api/claims/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setClaims(res.data))
      .catch((err) => {
        console.error("Error loading claims:", err);
        alert("Failed to load claims.");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <>
      <UserNavbar />
      <div className="container my-5">
        <h3 className="text-center mb-4">My Claims</h3>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : claims.length === 0 ? (
          <div className="alert alert-info text-center">
            You have not submitted any claims yet.
          </div>
        ) : (
          <div className="table-responsive shadow-sm">
            <table className="table table-hover table-striped align-middle">
              <thead className="table-light text-center">
                <tr>
                  <th>#</th>
                  <th>Vehicle</th>
                  <th>Policy</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Decision</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {claims.map((c, i) => (
                  <tr key={c.claimId}>
                    <td>{i + 1}</td>
                    <td>
                      {c.issuedPolicy?.proposal?.vehicle?.registrationNumber ||
                        "—"}
                    </td>
                    <td>{c.issuedPolicy?.policy?.policyName || "—"}</td>
                    <td>{c.claimReason}</td>
                    <td>
                      <span
                        className={`badge ${
                          c.status === "APPROVED"
                            ? "bg-success"
                            : c.status === "REJECTED"
                            ? "bg-danger"
                            : c.status === "PENDING"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>{c.submittedDate || "—"}</td>
                    <td>{c.decisionDate || "—"}</td>
                    <td>{c.officerRemarks || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MyClaims;
