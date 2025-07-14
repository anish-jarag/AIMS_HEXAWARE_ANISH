import React, { useEffect, useState } from "react";

const Step2Policy = ({
  vehicleType,
  policyId,
  setPolicyId,
  nextStep,
  prevStep,
}) => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetch(`/api/policies/vehicle-type/${vehicleType}`)
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error("Failed to fetch policies:", err));
  }, [vehicleType]);

  return (
    <div>
      <h5 className="mb-4">Step 2: Select Insurance Policy</h5>

      {policies.length === 0 ? (
        <p>No available policies for the selected vehicle type.</p>
      ) : (
        <div className="list-group">
          {policies.map((p) => (
            <label
              key={p.policyId}
              className={`list-group-item ${
                policyId === p.policyId ? "active text-white" : ""
              }`}
            >
              <input
                type="radio"
                name="policy"
                value={p.policyId}
                checked={policyId === p.policyId}
                onChange={() => setPolicyId(p.policyId)}
                className="me-2"
              />
              <strong>{p.policyName}</strong> - {p.description} <br />
              <span className="text-muted">Base Premium: ₹{p.basePremium}</span>
            </label>
          ))}
        </div>
      )}

      <div className="mt-4 d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={prevStep}>
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={nextStep}
          disabled={!policyId}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2Policy;
