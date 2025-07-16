import React, { useEffect, useState } from "react";

const Stats = () => {
  const [totals, setTotals] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/public/stats")
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
  }, []);

  return (
    <section className="bg-primary text-white py-5">
      <div className="container text-center">
        <h3 className="mb-4">Our Impact</h3>

        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="row mt-4">
            <div className="col-md-4 mb-4">
              <div className="p-3">
                <i className="bi bi-shield-check display-4 mb-2" />
                <h2>{totals.policies}</h2>
                <p className="mb-0">Policies Issued</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-3">
                <i className="bi bi-file-earmark-text display-4 mb-2" />
                <h2>{totals.claims}</h2>
                <p className="mb-0">Claims Processed</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-3">
                <i className="bi bi-emoji-smile display-4 mb-2" />
                <h2>{totals.satisfaction}%</h2>
                <p className="mb-0">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Stats;
