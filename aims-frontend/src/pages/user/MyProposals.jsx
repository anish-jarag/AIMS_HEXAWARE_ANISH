import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("jwtToken");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await axiosInstance.get("/proposal/my");
        setProposals(res.data);

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
        toast.error("Error fetching proposals or quotes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  return (
    <>
      <UserNavbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container my-5">
        <h3 className="mb-4 text-center fw-bold">My Insurance Proposals</h3>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : proposals.length === 0 ? (
          <div className="alert alert-info text-center">
            You haven’t submitted any proposals yet.
          </div>
        ) : (
          <div className="row g-4">
            {proposals.map((p) => (
              <div key={p.proposalId} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow border border-secondary-subtle rounded-3">
                  <div className="card-body">
                    <h5 className="fw-bold mb-2">Proposal #{p.proposalId}</h5>
                    <p className="mb-1">
                      <strong>Vehicle:</strong>{" "}
                      {p.vehicle?.registrationNumber || "N/A"} (
                      {p.vehicle?.vehicleType || "N/A"})
                    </p>
                    <p className="mb-1">
                      <strong>Policy:</strong> {p.policy?.policyName || "N/A"}
                    </p>
                    <p className="mb-1">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          p.status === "APPROVED"
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
                    <p className="mb-1">
                      <strong>Submitted:</strong>{" "}
                      {new Date(p.submissionDate).toLocaleDateString()}
                    </p>

                    {p.status === "QUOTE_GENERATED" && quotes[p.proposalId] && (
                      <>
                        <hr />
                        <p className="mb-1">
                          <strong>Quote:</strong> ₹
                          {quotes[p.proposalId].totalPremium}
                        </p>
                        <p className="mb-3">
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
                  <div className="card-footer bg-white text-end border-0">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() =>
                        navigate(`/user/proposals/documents/${p.proposalId}`)
                      }
                    >
                      View Documents
                    </button>
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
