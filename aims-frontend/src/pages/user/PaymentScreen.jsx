import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";

const PaymentScreen = () => {
  const [searchParams] = useSearchParams();
  const proposalId = searchParams.get("proposalId");
  const amount = searchParams.get("amount");

  const [transactionRef, setTransactionRef] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("jwtToken");
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const handlePayment = async () => {
    if (!transactionRef.trim()) {
      alert("Transaction reference is required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/payments/pay", null, {
        params: {
          proposalId,
          amount,
          mode: "UPI",
          transactionRef,
        },
      });
      alert(res.data);
      navigate("/user/my-policies");
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed: " + (err.response?.data || err.message));
      setLoading(false);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="container my-5">
        <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
          <div className="card-body">
            <h5 className="card-title mb-3">Complete Payment</h5>
            <p>
              <strong>Proposal ID:</strong> {proposalId}
              <br />
              <strong>Amount:</strong> ₹{amount}
            </p>

            <div className="mb-3">
              <label className="form-label">Transaction Reference ID</label>
              <input
                type="text"
                className="form-control"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
              />
            </div>

            <button
              className="btn btn-success w-100"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
