import React from "react";

const slides = [
  {
    image: "/images/car_slide.jpg",
    title: "Protect Your Ride",
    subtitle: "Affordable and trusted vehicle insurance plans",
    cta: { text: "Get Quote", link: "/login" },
  },
  {
    image: "/images/bike_slide.jpg",
    title: "Fast Claim Settlement",
    subtitle: "Hassle‑free, documented claims within days",
    cta: { text: "Learn More", link: "/login" },
  },
];

const HeroCarousel = () => (
  <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
      {slides.map((s, idx) => (
        <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
          <div
            style={{ position: "relative", height: "80vh", overflow: "hidden" }}
          >
            <img
              src={s.image}
              className="d-block w-100"
              alt={s.title}
              style={{ height: "100%", objectFit: "cover" }}
            />
            <div
              className="d-flex flex-column justify-content-center align-items-center text-center"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.4)",
                color: "#fff",
                padding: "20px",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  padding: "30px",
                  borderRadius: "10px",
                  maxWidth: "700px",
                }}
              >
                <h1 className="display-4 fw-bold">{s.title}</h1>
                <p className="lead">{s.subtitle}</p>
                <a href={s.cta.link} className="btn btn-light btn-lg mt-3">
                  {s.cta.text}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#heroCarousel"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" />
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#heroCarousel"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" />
    </button>
  </div>
);

export default HeroCarousel;
