import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";

const MyPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    if (!userId) return;

    axiosInstance
      .get(`/issued/user/${userId}`)
      .then((res) => setPolicies(res.data))
      .catch((err) => console.error("Error loading policies:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <>
      <UserNavbar />
      <div className="container my-5">
        <h3 className="mb-4 text-center">My Active Policies</h3>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : policies.length === 0 ? (
          <div className="alert alert-info text-center">
            You have no active policies.
          </div>
        ) : (
          <div className="row">
            {policies.map((policy) => (
              <div
                key={policy.issuedPolicyId}
                className="col-md-6 col-lg-4 mb-4"
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">
                      Policy #{policy.issuedPolicyId}
                    </h5>
                    <p className="mb-1">
                      <strong>Policy Type:</strong> {policy.policy?.policyName}
                    </p>
                    <p className="mb-1">
                      <strong>Coverage Amount:</strong> ₹{policy.coverageAmount}
                    </p>
                    <p className="mb-1">
                      <strong>Valid From:</strong> {policy.startDate}
                    </p>
                    <p className="mb-1">
                      <strong>Valid To:</strong> {policy.endDate}
                    </p>
                    <p className="mb-1">
                      <strong>Vehicle:</strong>{" "}
                      {policy.proposal?.vehicle?.registrationNumber} (
                      {policy.proposal?.vehicle?.vehicleType})
                    </p>
                    <p className="mb-1">
                      <strong>Coverage Amount:</strong> ₹{policy.coverageAmount}
                    </p>
                  </div>
                  <div className="card-footer bg-white border-0 text-end">
                    <a
                      href={`http://localhost:8080/api/issued/download/issued/${policy.issuedPolicyId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      Download PDF
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

export default MyPolicies;
