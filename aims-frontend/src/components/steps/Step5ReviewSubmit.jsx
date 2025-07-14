// components/steps/Step5ReviewSubmit.jsx
import React from "react";

const Step5ReviewSubmit = ({ formData, prevStep }) => {
  const handleSubmit = () => {
    const form = new FormData();
    const userId = localStorage.getItem("userId");

    // Vehicle
    form.append("registrationNumber", formData.vehicle.registrationNumber);
    form.append("vehicleType", formData.vehicle.vehicleType);
    form.append("make", formData.vehicle.make);
    form.append("model", formData.vehicle.model);
    form.append("yearOfManufacture", formData.vehicle.yearOfManufacture);

    // Proposal Data
    form.append("policyId", formData.policyId);
    form.append("userId", userId);
    formData.addonIds.forEach((id) => form.append("addonIds", id));

    // Document Uploads
    formData.documents.forEach((doc) => {
      form.append("file", doc.file);
      form.append("documentType", doc.documentType);
    });

    fetch("/api/proposal/submit", {
      method: "POST",
      body: form,
    })
      .then((res) => res.text())
      .then((msg) => {
        alert(msg);
        window.location.href = "/user/dashboard";
      })
      .catch(() => alert("Failed to submit proposal"));
  };

  return (
    <div>
      <h5>Review & Submit</h5>
      <p className="text-muted">
        Please review your details before submission.
      </p>

      <div className="mb-3">
        <h6>Vehicle Details</h6>
        <p className="mb-1">
          <strong>Registration:</strong> {formData.vehicle.registrationNumber}
        </p>
        <p className="mb-1">
          <strong>Type:</strong> {formData.vehicle.vehicleType}
        </p>
        <p className="mb-1">
          <strong>Make:</strong> {formData.vehicle.make}
        </p>
        <p className="mb-1">
          <strong>Model:</strong> {formData.vehicle.model}
        </p>
        <p className="mb-1">
          <strong>Year:</strong> {formData.vehicle.yearOfManufacture}
        </p>
      </div>

      <div className="mb-3">
        <h6>Selected Policy ID:</h6>
        <p>{formData.policyId}</p>
      </div>

      <div className="mb-3">
        <h6>Add-ons Selected:</h6>
        <ul>
          {formData.addonIds.length === 0 ? (
            <li>No addons selected</li>
          ) : (
            formData.addonIds.map((id) => <li key={id}>Addon ID: {id}</li>)
          )}
        </ul>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit Proposal
        </button>
      </div>
    </div>
  );
};

export default Step5ReviewSubmit;
