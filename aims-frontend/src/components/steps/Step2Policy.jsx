import React, { useEffect, useState } from "react";
import axios from "axios";

const Step2Policy = ({
  vehicleType,
  policyId,
  setPolicyId,
  nextStep,
  prevStep,
}) => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPolicies = async () => {
      if (!vehicleType) {
        setPolicies([]);
        setError("Please select a vehicle type.");
        return;
      }

      setLoading(true);
      try {
        const token = localStorage.getItem("jwtToken");

        const res = await axios.get(
          `http://localhost:8080/api/vehicle/vehicle-type/${vehicleType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(res.data)) {
          setPolicies(res.data);
          setError("");
        } else {
          console.warn("Unexpected response format:", res.data);
          setPolicies([]);
          setError("Unexpected response from server.");
        }
      } catch (err) {
        console.error("Failed to fetch policies:", err);
        setError("Something went wrong while fetching policies.");
        setPolicies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [vehicleType]);

  return (
    <div>
      <h5 className="mb-4">Step 2: Select Insurance Policy</h5>

      {loading ? (
        <p>Loading policies...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : policies.length === 0 ? (
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
              <strong>{p.policyName}</strong> – {p.description}
              <br />
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
