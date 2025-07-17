import React, { useState, useEffect } from "react";

const documentTypes = [
  "AADHAAR",
  "PAN",
  "RC_BOOK",
  "INSPECTION_REPORT",
  "OTHER",
];

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

  const handleNext = () => {
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
      <h5 className="mb-3">Step 4: Upload Required Documents</h5>
      <p className="text-muted">
        Please upload clear and valid copies (PDF, JPG, PNG).
      </p>

      <div className="row">
        {documentTypes.map((type) => (
          <div className="col-md-6 mb-3" key={type}>
            <label className="form-label fw-semibold">
              {formatLabel(type)}
            </label>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, type)}
            />
            {files[type] && (
              <small className="text-success">
                ✔ Selected: {files[type].name}
              </small>
            )}
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step4UploadDocuments;
