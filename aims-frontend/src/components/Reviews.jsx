const reviews = [
  { text: "Smooth and fast claims!", author: "Priya Sharma" },
  { text: "Great support team. Highly recommended.", author: "Rahul Verma" },
  { text: "Clear terms and easy navigation.", author: "Sunita Mehta" },
];

const Reviews = () => (
  <section className="container py-5">
    <h3 className="text-center mb-4">Customer Reviews</h3>
    <div className="row">
      {reviews.map((r, i) => (
        <div className="col-md-4 mb-3" key={i}>
          <div className="card shadow-sm p-4">
            <p className="mb-1">“{r.text}”</p>
            <strong>- {r.author}</strong>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Reviews;
