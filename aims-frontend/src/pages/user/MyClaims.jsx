import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("jwtToken");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (!userId || !token) return;

    axios
      .get(`${BASE_URL}/claims/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setClaims(res.data))
      .catch((err) => {
        console.error("Error loading claims:", err);
        toast.error("Failed to load claims.");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <>
      <UserNavbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container my-5">
        <h3 className="text-center fw-bold mb-4">My Insurance Claims</h3>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : claims.length === 0 ? (
          <div className="alert alert-info text-center">
            You haven’t submitted any claims yet.
          </div>
        ) : (
          <div className="table-responsive shadow rounded">
            <table className="table table-hover table-striped align-middle">
              <thead className="table-light text-center">
                <tr>
                  <th>#</th>
                  <th>Vehicle</th>
                  <th>Policy</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Submitted On</th>
                  <th>Decision Date</th>
                  <th>Officer Remarks</th>
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
                    <td>{c.claimReason || "—"}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 ${
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
                    <td>
                      {c.submittedDate
                        ? new Date(c.submittedDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td>
                      {c.decisionDate
                        ? new Date(c.decisionDate).toLocaleDateString()
                        : "—"}
                    </td>
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
