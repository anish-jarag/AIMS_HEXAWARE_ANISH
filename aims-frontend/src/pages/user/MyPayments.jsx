import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";

const MyPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/payments/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch payments");

        const data = await res.json();
        setPayments(data);
      } catch (error) {
        console.error("Error loading payments:", error);
        alert("Failed to load payments.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchPayments();
  }, [userId]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <UserNavbar />
      <div className="container my-5">
        <h3 className="text-center mb-4 fw-semibold">My Payment History</h3>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : payments.length === 0 ? (
          <div className="alert alert-info text-center">
            No payments found yet.
          </div>
        ) : (
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-bordered table-hover text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Amount Paid</th>
                  <th>Status</th>
                  <th>Payment Date</th>
                  <th>Policy ID</th>
                  <th>Reference</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment.paymentId}>
                    <td>{index + 1}</td>
                    <td>₹{payment.amountPaid}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 ${
                          payment.status === "SUCCESS"
                            ? "bg-success"
                            : payment.status === "PENDING"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td>{formatDate(payment.paymentDate)}</td>
                    <td>{payment.proposal?.proposalId || "—"}</td>
                    <td className="text-truncate" style={{ maxWidth: "180px" }}>
                      {payment.transactionReference}
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
