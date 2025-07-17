import React, { useEffect, useState } from "react";

const Stats = () => {
  const [totals, setTotals] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/public/stats`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stats");
        return res.json();
      })
      .then((data) => {
        setTotals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Stats fetch error:", err);
        setTotals({ policies: "---", claims: "---", satisfaction: "---" });
        setLoading(false);
      });
  }, [BASE_URL]);

  return (
    <section className="bg-primary text-white py-5">
      <div className="container text-center">
        <h3 className="mb-4 fw-bold">Our Impact</h3>

        {loading ? (
          <div className="d-flex justify-content-center py-4">
            <div className="spinner-border text-light" role="status" />
          </div>
        ) : (
          <div className="row mt-4">
            <StatCard
              icon="bi-shield-check"
              value={totals.policies}
              label="Policies Issued"
            />
            <StatCard
              icon="bi-file-earmark-text"
              value={totals.claims}
              label="Claims Processed"
            />
            <StatCard
              icon="bi-emoji-smile"
              value={`${totals.satisfaction}%`}
              label="Satisfaction Rate"
            />
          </div>
        )}
      </div>
    </section>
  );
};

const StatCard = ({ icon, value, label }) => (
  <div className="col-md-4 mb-4">
    <div className="p-3">
      <i className={`bi ${icon} display-4 mb-2`} aria-hidden="true" />
      <h2 className="fw-bold">{value}</h2>
      <p className="mb-0">{label}</p>
    </div>
  </div>
);

export default Stats;
