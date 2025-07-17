import React from "react";

const reasons = [
  {
    title: "Financial Safety",
    description: "Protects you from unexpected repair or medical costs.",
    icon: "bi-currency-rupee",
  },
  {
    title: "Legal Compliance",
    description:
      "Stay compliant with government regulations on vehicle insurance.",
    icon: "bi-file-earmark-check",
  },
  {
    title: "Peace of Mind",
    description: "Travel worry‑free knowing you have reliable coverage.",
    icon: "bi-shield-lock",
  },
];

const WhyInsurance = () => (
  <section className="bg-light py-5">
    <div className="container text-center">
      <h2 className="fw-bold mb-4">Why Choose Insurance?</h2>

      <div className="row justify-content-center">
        {reasons.map((r, idx) => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={idx}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="mb-3">
                  <i className={`bi ${r.icon} display-5 text-primary`} />
                </div>
                <h5 className="card-title fw-semibold">{r.title}</h5>
                <p className="card-text text-muted">{r.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyInsurance;
