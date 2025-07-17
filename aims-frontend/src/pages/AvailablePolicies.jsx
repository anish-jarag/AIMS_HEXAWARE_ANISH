import React, { useEffect, useState } from "react";

const POLICIES_PER_PAGE = 6;

const AvailablePolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/public/policies`)
      .then((res) => res.json())
      .then(setPolicies)
      .catch((err) => {
        console.error("Failed to load policies", err);
        setPolicies([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(policies.length / POLICIES_PER_PAGE);
  const start = (currentPage - 1) * POLICIES_PER_PAGE;
  const visiblePolicies = policies.slice(start, start + POLICIES_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="container py-5">
      <h3 className="text-center fw-bold mb-4">Available Insurance Policies</h3>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : policies.length === 0 ? (
        <div className="alert alert-warning text-center">
          No policies found.
        </div>
      ) : (
        <>
          <div className="row">
            {visiblePolicies.map((policy) => (
              <div
                className="col-sm-12 col-md-6 col-lg-4 mb-4"
                key={policy.policyId}
              >
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <h5 className="fw-semibold">{policy.policyName}</h5>
                      <span className="badge bg-secondary">
                        {policy.vehicleType}
                      </span>
                    </div>
                    <p className="text-muted small mt-2">
                      {policy.description}
                    </p>
                    <div className="text-end mt-3">
                      <span className="fw-bold text-primary">
                        ₹{policy.basePremium}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => goToPage(currentPage - 1)}
                    >
                      ← Prev
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, idx) => (
                    <li
                      key={idx}
                      className={`page-item ${
                        currentPage === idx + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => goToPage(idx + 1)}
                      >
                        {idx + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => goToPage(currentPage + 1)}
                    >
                      Next →
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default AvailablePolicies;
