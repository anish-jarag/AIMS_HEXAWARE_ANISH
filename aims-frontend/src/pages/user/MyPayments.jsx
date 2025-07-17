import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (!userId || !token) return;

    axios
      .get(`${BASE_URL}/payments/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPayments(res.data))
      .catch((err) => {
        console.error("Error fetching payments:", err);
        toast.error("Failed to load payment history.");
      })
      .finally(() => setLoading(false));
  }, [userId, token]);

  return (
    <>
      <UserNavbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mt-5">
        <h2 className="mb-4 fw-bold text-center">My Payments</h2>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : payments.length === 0 ? (
          <div className="alert alert-info text-center">
            No payment records found.
          </div>
        ) : (
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle table-bordered">
              <thead className="table-light">
                <tr className="text-center">
                  <th>#</th>
                  <th>Proposal ID</th>
                  <th>Amount Paid (₹)</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, index) => (
                  <tr key={p.paymentId} className="text-center">
                    <td>{index + 1}</td>
                    <td>{p.proposal?.proposalId || "-"}</td>
                    <td className="fw-semibold text-success">
                      ₹{p.amountPaid.toFixed(2)}
                    </td>
                    <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 ${
                          p.status === "SUCCESS" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MyPayments;
