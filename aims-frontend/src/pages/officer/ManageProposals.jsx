import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OfficerSidebar from "../../components/OfficerSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProposals = () => {
  const [proposals, setProposals] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchProposals = async () => {
      if (!token || !BASE_URL) return;

      try {
        const res = await fetch(`${BASE_URL}/proposal/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch proposals");

        const data = await res.json();
        const filtered = data.filter(
          (p) => p.status === "SUBMITTED" || p.status === "AWAITING_DOCUMENTS"
        );
        setProposals(filtered);

        if (filtered.length > 0) {
          toast.success("Proposals loaded successfully!");
        } else {
          toast.info("No submitted or awaiting proposals found.");
        }
      } catch (err) {
        console.error("Error fetching proposals:", err);
        toast.error("Failed to load proposals.");
      }
    };

    fetchProposals();
  }, [token, BASE_URL]);

  return (
    <div className="d-flex">
      <ToastContainer position="top-right" autoClose={3000} />
      <OfficerSidebar />
      <div className="container py-4">
        <h2 className="mb-4">Manage Proposals</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="bg-dark text-white">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Vehicle</th>
                <th>Policy</th>
                <th>Status</th>
                <th>Submitted On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {proposals.length > 0 ? (
                proposals.map((proposal, index) => (
                  <tr key={proposal.proposalId}>
                    <td>{index + 1}</td>
                    <td>{proposal.user?.fullName || "N/A"}</td>
                    <td>{proposal.vehicle?.registrationNumber || "N/A"}</td>
                    <td>{proposal.policy?.policyName || "N/A"}</td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        {proposal.status}
                      </span>
                    </td>
                    <td>{proposal.submissionDate || "N/A"}</td>
                    <td>
                      <Link
                        to={`/admin/proposals/${proposal.proposalId}`}
                        className="btn btn-sm btn-primary"
                      >
                        View & Approve
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No submitted or awaiting proposals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProposals;
