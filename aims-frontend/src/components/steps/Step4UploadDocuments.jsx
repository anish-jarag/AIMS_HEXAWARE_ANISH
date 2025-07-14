import React, { useState } from "react";

const Step4UploadDocuments = ({
  documents,
  setDocuments,
  nextStep,
  prevStep,
}) => {
  const [newDoc, setNewDoc] = useState({ file: null, documentType: "" });

  const handleFileChange = (e) => {
    setNewDoc({ ...newDoc, file: e.target.files[0] });
  };

  const handleTypeChange = (e) => {
    setNewDoc({ ...newDoc, documentType: e.target.value });
  };

  const addDocument = () => {
    if (newDoc.file && newDoc.documentType) {
      setDocuments([...documents, newDoc]);
      setNewDoc({ file: null, documentType: "" });
    }
  };

  return (
    <div>
      <h5>Upload Supporting Documents</h5>
      <p className="text-muted">Upload driving license, RC book, etc.</p>

      <div className="mb-3">
        <select
          className="form-select mb-2"
          value={newDoc.documentType}
          onChange={handleTypeChange}
        >
          <option value="">Select Document Type</option>
          <option value="DRIVING_LICENSE">Driving License</option>
          <option value="RC_BOOK">RC Book</option>
          <option value="VEHICLE_INSPECTION">Vehicle Inspection Report</option>
        </select>
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
        <button className="btn btn-outline-primary mt-2" onClick={addDocument}>
          Add Document
        </button>
      </div>

      {documents.length > 0 && (
        <ul className="list-group mb-3">
          {documents.map((doc, index) => (
            <li
              className="list-group-item d-flex justify-content-between"
              key={index}
            >
              <span>{doc.documentType}</span>
              <span>{doc.file.name}</span>
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

export default Step4UploadDocuments;
