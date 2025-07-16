import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";
import { useNavigate } from "react-router-dom";

const MyProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Fetch user proposals
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await axiosInstance.get("/proposal/my");
        setProposals(res.data);

        // Fetch quotes for QUOTE_GENERATED proposals
        const quoteMap = {};
        await Promise.all(
          res.data.map(async (p) => {
            if (p.status === "QUOTE_GENERATED") {
              const quoteRes = await axiosInstance.get(
                `/quotes/proposal/${p.proposalId}`
              );
              quoteMap[p.proposalId] = quoteRes.data;
            }
          })
        );
        setQuotes(quoteMap);
      } catch (err) {
        console.error("Error fetching proposals or quotes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [token]);

  const handlePayment = async (proposalId, amount) => {
    const transactionRef = prompt("Enter your transaction reference ID:");
    if (!transactionRef) return;

    try {
      const res = await axiosInstance.post("/payments/pay", null, {
        params: {
          proposalId,
          amount,
          mode: "UPI",
          transactionRef,
        },
      });

      alert(res.data);
      window.location.reload(); // reload proposals
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="container my-5">
        <h3 className="mb-4 text-center">My Insurance Proposals</h3>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : proposals.length === 0 ? (
          <div className="alert alert-info text-center">
            You haven't submitted any proposals yet.
          </div>
        ) : (
          <div className="row">
            {proposals.map((p) => (
              <div key={p.proposalId} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Proposal #{p.proposalId}</h5>
                    <p className="card-text mb-1">
                      <strong>Vehicle:</strong> {p.vehicle?.registrationNumber}{" "}
                      ({p.vehicle?.vehicleType})
                    </p>
                    <p className="card-text mb-1">
                      <strong>Policy:</strong> {p.policy?.policyName}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          p.status === "ACTIVE"
                            ? "bg-success"
                            : p.status === "REJECTED"
                            ? "bg-danger"
                            : p.status === "QUOTE_GENERATED"
                            ? "bg-info text-dark"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {p.status}
                      </span>
                    </p>
                    <p className="card-text">
                      <strong>Submitted on:</strong> {p.submissionDate}
                    </p>

                    {p.status === "QUOTE_GENERATED" && quotes[p.proposalId] && (
                      <>
                        <hr />
                        <p className="card-text">
                          <strong>Quote Amount:</strong> ₹
                          {quotes[p.proposalId].totalPremium}
                        </p>
                        <p className="card-text">
                          <strong>Coverage:</strong> ₹
                          {quotes[p.proposalId].totalPremium * 10}
                        </p>

                        <button
                          className="btn btn-sm btn-success"
                          onClick={() =>
                            navigate(
                              `/user/pay?proposalId=${p.proposalId}&amount=${
                                quotes[p.proposalId].totalPremium
                              }`
                            )
                          }
                        >
                          Pay Now
                        </button>
                      </>
                    )}
                  </div>
                  <div className="card-footer bg-white border-0 text-end">
                    <a
                      href={`/user/documents/${p.proposalId}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      View Documents
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyProposals;
