// components/ApplyProposalForm.jsx
import React, { useState, useEffect } from "react";
import Step1Vehicle from "./steps/Step1Vehicle";
import Step2Policy from "./steps/Step2Policy";
import Step3Addons from "./steps/Step3Addons";
import Step4UploadDocuments from "./steps/Step4UploadDocuments";
import Step5ReviewSubmit from "./steps/Step5ReviewSubmit";

const ApplyProposalForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    vehicle: {
      registrationNumber: "",
      vehicleType: "",
      make: "",
      model: "",
      yearOfManufacture: "",
    },
    policyId: null,
    addonIds: [],
    documents: [], // Array of { file, documentType }
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Apply for Vehicle Insurance</h3>

      <div className="card shadow-sm p-4">
        {step === 1 && (
          <Step1Vehicle
            data={formData.vehicle}
            setData={(data) => updateFormData("vehicle", data)}
            nextStep={nextStep}
          />
        )}

        {step === 2 && (
          <Step2Policy
            vehicleType={formData.vehicle.vehicleType}
            policyId={formData.policyId}
            setPolicyId={(id) => updateFormData("policyId", id)}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 3 && (
          <Step3Addons
            policyId={formData.policyId}
            addonIds={formData.addonIds}
            setAddonIds={(ids) => updateFormData("addonIds", ids)}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 4 && (
          <Step4UploadDocuments
            documents={formData.documents}
            setDocuments={(docs) => updateFormData("documents", docs)}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 5 && (
          <Step5ReviewSubmit formData={formData} prevStep={prevStep} />
        )}
      </div>
    </div>
  );
};

export default ApplyProposalForm;
