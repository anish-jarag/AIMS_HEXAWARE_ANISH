import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Step3Addons = ({
  policyId,
  addonIds,
  setAddonIds,
  nextStep,
  prevStep,
}) => {
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchAddons = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/policy-addons/policy/${policyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );
        setAddons(res.data || []);
      } catch (err) {
        console.error("Failed to load addons", err);
        toast.error("Something went wrong while loading addons.");
        setAddons([]);
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
      <h5 className="fw-bold mb-3">Step 3: Select Add-ons (Optional)</h5>
      <p className="text-muted">Choose any extra coverage for this policy.</p>

      {loading ? (
        <p>Loading add-ons...</p>
      ) : addons.length === 0 ? (
        <p className="text-muted">No add-ons available for this policy.</p>
      ) : (
        <div className="list-group shadow-sm mb-3">
          {addons.map((addon) => (
            <label
              key={addon.addonId}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
            >
              <div className="me-3">
                <strong>{addon.addonName}</strong>
                <p className="mb-1 text-muted small">{addon.description}</p>
                <span className="badge bg-primary">
                  ₹{addon.additionalCost}
                </span>
              </div>
              <input
                type="checkbox"
                checked={addonIds.includes(addon.addonId)}
                onChange={() => handleToggleAddon(addon.addonId)}
              />
            </label>
          ))}
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button className="btn btn-primary" onClick={nextStep}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default Step3Addons;
