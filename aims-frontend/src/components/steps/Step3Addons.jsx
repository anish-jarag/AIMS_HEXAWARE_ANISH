import React, { useEffect, useState } from "react";
import axios from "axios";

const Step3Addons = ({
  policyId,
  addonIds,
  setAddonIds,
  nextStep,
  prevStep,
}) => {
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAddons = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/api/policy-addons/policy/${policyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );
        setAddons(res.data);
        setError("");
      } catch (err) {
        console.error("Failed to load addons", err);
        setError("Something went wrong while loading addons.");
      } finally {
        setLoading(false);
      }
    };

    if (policyId) fetchAddons();
  }, [policyId]);

  const handleToggleAddon = (id) => {
    if (addonIds.includes(id)) {
      setAddonIds(addonIds.filter((aid) => aid !== id));
    } else {
      setAddonIds([...addonIds, id]);
    }
  };

  return (
    <div>
      <h5 className="mb-3">Step 3: Select Add-ons (optional)</h5>
      <p className="text-muted">Choose additional benefits for your policy.</p>

      {loading ? (
        <p>Loading add-ons...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : addons.length === 0 ? (
        <p>No add-ons available for this policy.</p>
      ) : (
        <ul className="list-group mb-3">
          {addons.map((addon) => (
            <li
              key={addon.addonId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{addon.addonName}</strong>
                <p className="mb-0 text-muted small">{addon.description}</p>
                <span className="badge bg-primary mt-1">
                  ₹{addon.additionalCost}
                </span>
              </div>
              <input
                type="checkbox"
                checked={addonIds.includes(addon.addonId)}
                onChange={() => handleToggleAddon(addon.addonId)}
              />
            </li>
          ))}
        </ul>
      )}

      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-secondary" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-primary" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3Addons;
