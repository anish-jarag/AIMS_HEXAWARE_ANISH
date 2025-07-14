const Stats = ({ totals }) => (
  <section className="bg-primary text-white py-5">
    <div className="container text-center">
      <h3>Our Impact</h3>
      <div className="row mt-4">
        <div className="col-md-4">
          <h2>{totals.policies || "---"}</h2>
          <p>Policies Issued</p>
        </div>
        <div className="col-md-4">
          <h2>{totals.claims || "---"}</h2>
          <p>Claims Processed</p>
        </div>
        <div className="col-md-4">
          <h2>{totals.satisfaction || "---"}%</h2>
          <p>Satisfaction Rate</p>
        </div>
      </div>
    </div>
  </section>
);

export default Stats;
