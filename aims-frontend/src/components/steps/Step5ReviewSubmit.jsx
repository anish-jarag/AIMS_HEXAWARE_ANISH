import React from "react";
import axios from "axios";

const Step5ReviewSubmit = ({ formData, userId, prevStep }) => {
  const token = localStorage.getItem("jwtToken");

  const handleSubmit = async () => {
    if (!token) {
      return alert("You are not logged in. Please login and try again.");
    }

    try {
      // Submit proposal
      const proposalPayload = {
        vehicleId: formData.vehicleId,
        policyId: formData.policyId,
        addonIds: formData.addonIds || [],
      };

      await axios.post(
        "http://localhost:8080/api/proposal/submit",
        proposalPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Get latest proposal
      const { data: proposals } = await axios.get(
        "http://localhost:8080/api/proposal/my",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const latestProposal = proposals.at(-1);
      if (!latestProposal?.proposalId) {
        throw new Error("Could not fetch proposal ID for document upload.");
      }

      // Upload documents
      const documents = formData.documents || {};
      for (const [type, file] of Object.entries(documents)) {
        const form = new FormData();
        form.append("proposalId", latestProposal.proposalId);
        form.append("userId", userId);
        form.append("documentType", type);
        form.append("file", file);

        await axios.post("http://localhost:8080/api/documents/upload", form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      alert("Proposal and documents submitted successfully.");
      window.location.href = "/user/dashboard";
    } catch (err) {
      console.error("Error in submission:", err);

      const raw = err?.response?.data;
      let message = "Something went wrong during submission.";

      if (typeof raw === "string" && raw.includes("Duplicate entry")) {
        message =
          "A proposal already exists for this vehicle. Please check your applications.";
      } else if (raw?.message) {
        message = raw.message;
      } else if (err?.message) {
        message = err.message;
      }

      alert(message);
    }
  };

  return (
    <div>
      <h5 className="mb-3">Step 5: Review & Submit</h5>

      <ReviewItem label="Vehicle ID" value={formData.vehicleId} />
      <ReviewItem label="Vehicle Type" value={formData.vehicleType} />
      <ReviewItem label="Policy ID" value={formData.policyId} />

      {formData.addonIds?.length > 0 && (
        <div className="mb-3">
          <h6>Addon IDs:</h6>
          <ul>
            {formData.addonIds.map((id) => (
              <li key={id}>Addon ID: {id}</li>
            ))}
          </ul>
        </div>
      )}

      {formData.documents && (
        <div className="mb-3">
          <h6>Documents:</h6>
          <ul>
            {Object.entries(formData.documents).map(([type, file]) => (
              <li key={type}>
                {type}: <strong>{file.name}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit Proposal
        </button>
      </div>
    </div>
  );
};

const ReviewItem = ({ label, value }) => (
  <div className="mb-3">
    <h6>{label}:</h6>
    <p>{value}</p>
  </div>
);

export default Step5ReviewSubmit;
