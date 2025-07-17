import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";

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
      .get(`http://localhost:8080/api/issued/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPolicies(res.data))
      .catch((err) => {
        console.error("Error fetching issued policies:", err);
        alert("Failed to load policies.");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPolicyId || !reason) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // 1. Submit claim
      const claimRes = await axios.post(
        `http://localhost:8080/api/claims/submit`,
        null,
        {
          params: {
            issuedPolicyId: selectedPolicyId,
            userId,
            reason,
            amount: 10000, // or some fixed/test amount
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const claimMessage = claimRes.data;
      alert(claimMessage);

      // 2. Upload document if file is selected
      if (file) {
        const uploadForm = new FormData();
        uploadForm.append("claimId", claimMessage.match(/\d+/)[0]); // If message returns "Claim submitted with ID: 12"
        uploadForm.append("userId", userId);
        uploadForm.append("documentType", "CLAIM_IMAGE"); // enum
        uploadForm.append("file", file);

        await axios.post(
          "http://localhost:8080/api/claim-documents/upload",
          uploadForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Image uploaded successfully.");
      }

      setReason("");
      setFile(null);
      setSelectedPolicyId("");
    } catch (err) {
      console.error("Error submitting claim:", err);
      alert("Claim submission failed.");
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
              <label className="form-label">Select Issued Policy</label>
              <select
                className="form-select"
                value={selectedPolicyId}
                onChange={(e) => setSelectedPolicyId(e.target.value)}
                required
              >
                <option value="">-- Choose Vehicle & Policy --</option>
                {policies.map((p) => (
                  <option key={p.issuedPolicyId} value={p.issuedPolicyId}>
                    #{p.issuedPolicyId} - [
                    {p.proposal?.vehicle?.registrationNumber}]{" "}
                    {p.proposal?.vehicle?.make} {p.proposal?.vehicle?.model} (
                    {p.policy?.policyName})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Claim Reason</label>
              <textarea
                className="form-control"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="4"
                placeholder="Describe your reason for claim"
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Image (Optional)</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <button className="btn btn-primary w-100">Submit Claim</button>
          </form>
        )}
      </div>
    </>
  );
};

export default SubmitClaim;
