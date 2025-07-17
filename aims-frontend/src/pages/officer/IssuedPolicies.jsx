import React, { useEffect, useState } from "react";
import axios from "axios";
import OfficerSidebar from "../../components/OfficerSidebar";
import { useNavigate } from "react-router-dom";

const IssuedPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !BASE_URL) return;

    axios
      .get(`${BASE_URL}/issued/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPolicies(res.data))
      .catch((err) =>
        console.error("Failed to load issued policies:", err.message)
      );
  }, [token, BASE_URL]);

  return (
    <div className="d-flex">
      <OfficerSidebar />

      <div className="flex-grow-1 p-4">
        <h3 className="mb-4 fw-semibold">All Issued Policies</h3>

        <div className="table-responsive">
          <table className="table table-hover table-bordered shadow-sm">
            <thead className="table-light text-center">
              <tr>
                <th>#</th>
                <th>Policy</th>
                <th>User</th>
                <th>Vehicle Reg. No.</th>
                <th>Start</th>
                <th>End</th>
                <th>Document</th>
              </tr>
            </thead>
            <tbody>
              {policies.length > 0 ? (
                policies.map((p, idx) => (
                  <tr
                    key={p.issuedPolicyId}
                    className="text-center align-middle"
                  >
                    <td>{idx + 1}</td>
                    <td>{p.policy?.policyName || "—"}</td>
                    <td>{p.user?.fullName || "—"}</td>
                    <td>{p.proposal?.vehicle?.registrationNumber || "—"}</td>
                    <td>{p.startDate}</td>
                    <td>{p.endDate}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() =>
                          navigate(
                            `/officer/proposals/${p.proposal?.proposalId}/documents`
                          )
                        }
                      >
                        View Documents
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No issued policies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IssuedPolicies;
