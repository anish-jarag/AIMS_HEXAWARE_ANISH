import React, { useState, useEffect } from "react";
import Step1Vehicle from "./steps/Step1Vehicle";
import Step2Policy from "./steps/Step2Policy";
import Step3Addons from "./steps/Step3Addons";
import Step4UploadDocuments from "./steps/Step4UploadDocuments";
import Step5ReviewSubmit from "./steps/Step5ReviewSubmit";

const ApplyProposalForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vehicleId: null,
    vehicleType: "",
    policyId: null,
    addonIds: [],
    documents: {},
  });
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetch("http://localhost:8080/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch user")
      )
      .then((data) => setUserId(data.userId))
      .catch((err) => {
        console.error("Failed to fetch user ID:", err);
        alert("Authentication failed. Please login again.");
        window.location.href = "/login";
      });
  }, [token]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Vehicle
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2Policy
            vehicleType={formData.vehicleType}
            policyId={formData.policyId}
            setPolicyId={(id) =>
              setFormData((prev) => ({ ...prev, policyId: id }))
            }
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3Addons
            policyId={formData.policyId}
            addonIds={formData.addonIds}
            setAddonIds={(ids) =>
              setFormData((prev) => ({ ...prev, addonIds: ids }))
            }
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <Step4UploadDocuments
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <Step5ReviewSubmit
            formData={formData}
            userId={userId}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      default:
        return <p>Invalid step</p>;
    }
  };

  return (
    <div className="container py-5">
      <h4 className="mb-4">Submit New Insurance Proposal</h4>
      <div className="card p-4 shadow-sm">{renderStep()}</div>
      <div className="text-muted mt-3 text-end">Step {step} of 5</div>
    </div>
  );
};

export default ApplyProposalForm;
