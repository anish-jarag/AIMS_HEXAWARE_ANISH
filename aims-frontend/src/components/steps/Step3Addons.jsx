import React, { useEffect, useState } from "react";

const Step3Addons = ({
  policyId,
  addonIds,
  setAddonIds,
  nextStep,
  prevStep,
}) => {
  const [addons, setAddons] = useState([]);

  useEffect(() => {
    fetch(`/api/policy-addons/policy/${policyId}`)
      .then((res) => res.json())
      .then((data) => setAddons(data))
      .catch((err) => console.error("Failed to load addons", err));
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
      <h5>Select Add-ons (optional)</h5>
      <p className="text-muted">Choose additional benefits for your policy.</p>

      {addons.length === 0 ? (
        <p>No add-ons available for this policy.</p>
      ) : (
        <ul className="list-group mb-3">
          {addons.map((addon) => (
            <li
              key={addon.addonId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{addon.name}</strong>
                <p className="mb-0 text-muted small">{addon.description}</p>
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

      <div className="d-flex justify-content-between">
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
