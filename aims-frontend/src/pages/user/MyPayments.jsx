import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";

const MyPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId || !token) return;

    axios
      .get(`http://localhost:8080/api/payments/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Error fetching payments:", err))
      .finally(() => setLoading(false));
  }, [userId, token]);

  if (loading)
    return <p className="text-center mt-5">Loading payment history...</p>;

  return (
    <>
      <UserNavbar />
      <div className="container mt-5">
        <h2 className="mb-4">My Payments</h2>

        {payments.length === 0 ? (
          <div className="alert alert-info">No payment records found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Policy Number</th>
                  <th>Amount Paid (₹)</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, index) => (
                  <tr key={p.paymentId}>
                    <td>{index + 1}</td>
                    <td>{p.policyNumber || "-"}</td>
                    <td>₹{p.amountPaid.toFixed(2)}</td>
                    <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`badge ${
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
