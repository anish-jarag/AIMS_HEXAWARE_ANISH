import React, { useEffect, useState } from "react";
import axios from "axios";
import OfficerSidebar from "../../components/OfficerSidebar";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PaymentOverview = () => {
  const token = localStorage.getItem("jwtToken");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [view, setView] = useState("proposal");
  const [proposalPayments, setProposalPayments] = useState([]);
  const [claimPayments, setClaimPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proposalRes, claimRes] = await Promise.all([
          axios.get(`${BASE_URL}/payments/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/claim-payments/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setProposalPayments(proposalRes.data);
        setClaimPayments(claimRes.data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };

    if (token && BASE_URL) fetchData();
  }, [token, BASE_URL]);

  const data = view === "proposal" ? proposalPayments : claimPayments;

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`${view === "proposal" ? "Proposal" : "Claim"} Payments`, 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [
        view === "proposal"
          ? ["#", "Proposal ID", "Amount", "Status", "Date"]
          : ["#", "Claim ID", "Amount", "Status", "Date"],
      ],
      body: data.map((p, i) =>
        view === "proposal"
          ? [
              i + 1,
              p.proposal?.proposalId,
              p.amountPaid,
              p.status,
              p.paymentDate?.slice(0, 10),
            ]
          : [
              i + 1,
              p.claim?.claimId,
              p.claimAmountPaid,
              p.claimPaymentStatus,
              p.claimPaymentDate?.slice(0, 10),
            ]
      ),
    });
    doc.save(`${view}_payments.pdf`);
  };

  return (
    <div className="d-flex">
      <OfficerSidebar />
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Payment Overview</h5>
          <div>
            <button
              className={`btn btn-sm me-2 ${
                view === "proposal" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setView("proposal")}
            >
              Proposal
            </button>
            <button
              className={`btn btn-sm ${
                view === "claim" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setView("claim")}
            >
              Claim
            </button>
          </div>
        </div>

        <div className="mb-3 d-flex gap-2">
          <CSVLink
            filename={`${view}_payments.csv`}
            data={data}
            className="btn btn-outline-success btn-sm"
          >
            Export CSV
          </CSVLink>
          <button onClick={exportPDF} className="btn btn-outline-danger btn-sm">
            Export PDF
          </button>
        </div>

        <div className="table-responsive bg-white shadow-sm rounded p-3">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>{view === "proposal" ? "Proposal ID" : "Claim ID"}</th>
                <th>Amount (₹)</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {view === "proposal"
                        ? p.proposal?.proposalId
                        : p.claim?.claimId}
                    </td>
                    <td>{p.amountPaid || p.claimAmountPaid}</td>
                    <td>
                      <span
                        className={`badge bg-${
                          (p.status || p.claimPaymentStatus) === "SUCCESS"
                            ? "success"
                            : (p.status || p.claimPaymentStatus) === "PENDING"
                            ? "warning"
                            : "danger"
                        }`}
                      >
                        {p.status || p.claimPaymentStatus}
                      </span>
                    </td>
                    <td>
                      {(p.paymentDate || p.claimPaymentDate)?.slice(0, 10)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-muted">
                    No records found.
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

export default PaymentOverview;
