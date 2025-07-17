// src/pages/user/SubmitClaim.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8080/api";

const SubmitClaim = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId || !token) return;

    axios
      .get(`${BASE_URL}/issued/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPolicies(res.data))
      .catch((err) => {
        console.error("Error fetching policies:", err);
        toast.error("Failed to load issued policies.");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPolicyId || !reason) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    try {
      const claimRes = await axios.post(`${BASE_URL}/claims/submit`, null, {
        params: {
          issuedPolicyId: selectedPolicyId,
          userId,
          reason,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      const resData = claimRes.data;
      let claimId;

      // If backend returns structured JSON
      if (resData && typeof resData === "object") {
        claimId = resData.claimId;
      }

      if (!claimId) {
        throw new Error("Claim submitted but claim ID not found.");
      }

      // Upload image if provided
      if (file) {
        const formData = new FormData();
        formData.append("claimId", claimId);
        formData.append("userId", userId);
        formData.append("documentType", "CLAIM_IMAGE");
        formData.append("file", file);

        await axios.post(`${BASE_URL}/claim-documents/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Claim and image uploaded successfully.");
      } else {
        toast.success("Claim submitted successfully.");
      }

      // Reset fields
      setSelectedPolicyId("");
      setReason("");
      setFile(null);
    } catch (err) {
      console.error("Error submitting claim:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "❌ Unknown error occurred.";
      toast.error(msg.toString());
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="container my-5">
        <h3 className="text-center mb-4">Submit a Claim</h3>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : policies.length === 0 ? (
          <div className="alert alert-warning text-center">
            You have no active policies eligible for claims.
          </div>
        ) : (
          <form
            className="card shadow-sm p-4 mx-auto"
            onSubmit={handleSubmit}
            style={{ maxWidth: 600 }}
          >
            <div className="mb-3">
              <label className="form-label fw-semibold">Issued Policy</label>
              <select
                className="form-select"
                value={selectedPolicyId}
                onChange={(e) => setSelectedPolicyId(e.target.value)}
                required
              >
                <option value="">-- Choose Vehicle & Policy --</option>
                {policies.map((p) => (
                  <option key={p.issuedPolicyId} value={p.issuedPolicyId}>
                    #{p.issuedPolicyId} - {p.policy?.policyName} (
                    {p.proposal?.vehicle?.registrationNumber})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Claim Reason</label>
              <textarea
                className="form-control"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="4"
                placeholder="Describe your reason for claim"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Upload Image (Optional)
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Submit Claim
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default SubmitClaim;
