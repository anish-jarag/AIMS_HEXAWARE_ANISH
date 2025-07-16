// src/components/AvailablePolicies.jsx
import React, { useEffect, useState } from "react";

const AvailablePolicies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/public/policies")
      .then((res) => res.json())
      .then(setPolicies)
      .catch((err) => console.error("Failed to load policies", err));
  }, []);

  return (
    <section className="container py-5">
      <h3 className="text-center mb-4">Available Policies</h3>
      <div className="row">
        {policies.length === 0 ? (
          <div className="text-center text-muted">No policies found.</div>
        ) : (
          policies.map((policy) => (
            <div className="col-md-4 mb-3" key={policy.policyId}>
              <div className="card h-100 p-3 shadow-sm">
                <h5 className="mb-2">{policy.policyName}</h5>
                <p className="mb-1 text-muted">{policy.description}</p>
                <div className="mt-2 fw-semibold">
                  ₹{policy.basePremium} —{" "}
                  <span className="badge bg-secondary">
                    {policy.vehicleType}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default AvailablePolicies;
