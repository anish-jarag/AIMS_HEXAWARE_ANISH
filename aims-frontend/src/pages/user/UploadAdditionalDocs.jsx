import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserNavbar from "../../components/UserNavbar";

const UploadAdditionalDocs = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState({});
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const documentTypes = [
    "AADHAAR",
    "PAN",
    "RC_BOOK",
    "INSPECTION_REPORT",
    "OTHER",
  ];

  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [docType]: file }));
    }
  };

  const handleSubmit = async () => {
    const uploaded = [];

    try {
      for (const docType in files) {
        const formData = new FormData();
        formData.append("proposalId", proposalId);
        formData.append("userId", userId);
        formData.append("documentType", docType);
        formData.append("file", files[docType]);

        const res = await fetch(`${BASE_URL}/documents/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!res.ok) throw new Error(`Upload failed for ${docType}`);
        uploaded.push(docType);
      }

      toast.success(`Uploaded: ${uploaded.join(", ")}`);
      setTimeout(() => navigate("/user/my-proposals"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("One or more uploads failed.");
    }
  };

  const formatLabel = (label) =>
    label
      .split("_")
      .map((word) => word[0] + word.slice(1).toLowerCase())
      .join(" ");

  return (
    <>
      <UserNavbar />
      <ToastContainer />
      <div className="container mt-5">
        <h3 className="text-center mb-4 fw-bold">
          📤 Upload Additional Documents
        </h3>
        <p className="text-muted text-center mb-4">
          Please upload only the documents requested. You can skip the others.
        </p>

        <div className="row">
          {documentTypes.map((type) => (
            <div className="col-md-6 mb-4" key={type}>
              <label className="form-label fw-semibold">
                {formatLabel(type)}
              </label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => handleFileChange(e, type)}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-warning px-4"
            onClick={handleSubmit}
            disabled={Object.keys(files).length === 0}
          >
            Upload Selected Files
          </button>
          <button
            className="btn btn-outline-secondary ms-3"
            onClick={() => navigate("/user/proposals")}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadAdditionalDocs;
