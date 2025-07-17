import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const documentTypes = ["AADHAAR", "PAN", "RC_BOOK", "OTHER"];
const requiredDocuments = ["AADHAAR", "RC_BOOK"];

const Step4UploadDocuments = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) => {
  const [files, setFiles] = useState({});

  useEffect(() => {
    if (formData.documents) {
      setFiles(formData.documents);
    }
  }, [formData.documents]);

  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [docType]: file }));
    }
  };

  const validateDocuments = () => {
    for (const type of requiredDocuments) {
      if (!files[type]) {
        toast.error(`Please upload ${formatLabel(type)} document.`);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateDocuments()) return;

    setFormData({ ...formData, documents: files });
    nextStep();
  };

  const formatLabel = (label) => {
    return label
      .split("_")
      .map((word) => word[0] + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div>
      <h5 className="fw-bold mb-3">Step 4: Upload Required Documents</h5>
      <p className="text-muted mb-4">
        Aadhaar and RC Book are mandatory. PAN and Other are optional.
      </p>

      <div className="row">
        {documentTypes.map((type) => (
          <div className="col-md-6 mb-4" key={type}>
            <label className="form-label fw-semibold">
              {formatLabel(type)}{" "}
              {requiredDocuments.includes(type) && (
                <span className="text-danger">*</span>
              )}
            </label>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, type)}
            />
            {files[type] && (
              <div className="form-text text-success">
                ✔ {files[type].name} selected
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={prevStep}>
          ← Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default Step4UploadDocuments;
