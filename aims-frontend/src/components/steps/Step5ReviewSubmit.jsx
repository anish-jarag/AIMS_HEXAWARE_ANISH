import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Step5ReviewSubmit = ({ formData, userId, prevStep }) => {
  const token = localStorage.getItem("jwtToken");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async () => {
    if (!token) {
      toast.error("You are not logged in. Please login again.");
      return;
    }

    try {
      // Step 1: Submit proposal
      const proposalPayload = {
        vehicleId: formData.vehicleId,
        policyId: formData.policyId,
        addonIds: formData.addonIds || [],
      };

      await axios.post(`${BASE_URL}/proposal/submit`, proposalPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Step 2: Get latest proposal ID
      const { data: proposals } = await axios.get(`${BASE_URL}/proposal/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const latestProposal = proposals?.[proposals.length - 1];
      if (!latestProposal?.proposalId) {
        throw new Error("Proposal ID not found for document upload.");
      }

      // Step 3: Upload documents
      const documents = formData.documents || {};
      for (const [type, file] of Object.entries(documents)) {
        const form = new FormData();
        form.append("proposalId", latestProposal.proposalId);
        form.append("userId", userId);
        form.append("documentType", type);
        form.append("file", file);

        await axios.post(`${BASE_URL}/documents/upload`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      toast.success("Proposal and documents submitted successfully!");
      setTimeout(() => {
        window.location.href = "/user/dashboard";
      }, 1500);
    } catch (err) {
      console.error("Error during proposal submission:", err);

      let message = "Something went wrong during submission.";
      const raw = err?.response?.data;

      if (typeof raw === "string") {
        if (raw.includes("Duplicate entry")) {
          message =
            "You've already submitted a proposal for this vehicle. Please check your Applications.";
        } else if (raw.includes("already has an active policy")) {
          message =
            "This vehicle already has an active insurance policy. You cannot apply again.";
        } else {
          message = raw;
        }
      } else if (raw?.message) {
        message = raw.message;
      } else if (err?.message) {
        message = err.message;
      }

      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        closeOnClick: true,
      });
    }
  };

  return (
    <div>
      <h5 className="mb-3 fw-bold">Step 5: Review & Submit</h5>

      <ReviewItem label="Vehicle ID" value={formData.vehicleId} />
      <ReviewItem label="Vehicle Type" value={formData.vehicleType} />
      <ReviewItem label="Policy ID" value={formData.policyId} />

      {formData.addonIds?.length > 0 && (
        <div className="mb-3">
          <h6>Selected Add-ons:</h6>
          <ul className="mb-0">
            {formData.addonIds.map((id) => (
              <li key={id}>Addon ID: {id}</li>
            ))}
          </ul>
        </div>
      )}

      {formData.documents && (
        <div className="mb-3">
          <h6>Uploaded Documents:</h6>
          <ul className="mb-0">
            {Object.entries(formData.documents).map(([type, file]) => (
              <li key={type}>
                {type}: <strong>{file.name}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit Proposal →
        </button>
      </div>
    </div>
  );
};

const ReviewItem = ({ label, value }) => (
  <div className="mb-2">
    <strong>{label}:</strong> <span>{value}</span>
  </div>
);

export default Step5ReviewSubmit;
