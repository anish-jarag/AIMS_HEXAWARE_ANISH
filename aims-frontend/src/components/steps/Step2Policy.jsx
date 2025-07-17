import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Step2Policy = ({
  vehicleType,
  policyId,
  setPolicyId,
  nextStep,
  prevStep,
}) => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchPolicies = async () => {
      if (!vehicleType) {
        toast.warn("Please select a vehicle type.");
        setPolicies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = localStorage.getItem("jwtToken");
        const res = await axios.get(
          `${BASE_URL}/vehicle/vehicle-type/${vehicleType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(res.data)) {
          setPolicies(res.data);
        } else {
          toast.error("Unexpected response from server.");
          setPolicies([]);
        }
      } catch (err) {
        console.error("Failed to fetch policies:", err);
        toast.error("Error loading available policies.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [vehicleType]);

  return (
    <div>
      <h5 className="mb-4 fw-bold">Step 2: Select Insurance Policy</h5>

      {loading ? (
        <p>Loading policies...</p>
      ) : policies.length === 0 ? (
        <p className="text-muted">
          No policies available for this vehicle type.
        </p>
      ) : (
        <div className="list-group shadow-sm mb-3">
          {policies.map((p) => (
            <label
              key={p.policyId}
              className={`list-group-item list-group-item-action border ${
                policyId === p.policyId ? "active text-white bg-primary" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              <input
                type="radio"
                className="form-check-input me-2"
                name="policy"
                value={p.policyId}
                checked={policyId === p.policyId}
                onChange={() => setPolicyId(p.policyId)}
              />
              <strong>{p.policyName}</strong> — {p.description}
              <br />
              <small className="text-muted">
                Base Premium: ₹{p.basePremium}
              </small>
            </label>
          ))}
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button
          className="btn btn-primary"
          onClick={nextStep}
          disabled={!policyId}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Step2Policy;
