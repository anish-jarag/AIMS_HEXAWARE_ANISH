import React, { useEffect } from "react";

const slides = [
  {
    image: "/images/car_slide.webp",
    title: "Protect Your Ride",
    subtitle: "Affordable and trusted car insurance plans",
    cta: { text: "Get Quote", link: "/login" },
  },
  {
    image: "/images/bike_slide.jpg",
    title: "Fast Claim Settlement",
    subtitle: "Hassle‑free bike claims processed in days",
    cta: { text: "Learn More", link: "/login" },
  },
  {
    image: "/images/truck_slide.jpg",
    title: "Secure Your Truck",
    subtitle: "Heavy-duty protection for your business fleet",
    cta: { text: "Get Protected", link: "/login" },
  },
  {
    image: "/images/camper_slide.jpg",
    title: "Camper Van Cover",
    subtitle: "Explore freely with insurance you can trust",
    cta: { text: "Explore Plans", link: "/login" },
  },
];

const HeroCarousel = () => {
  useEffect(() => {
    const carousel = document.querySelector("#heroCarousel");

    if (carousel && window.bootstrap) {
      new window.bootstrap.Carousel(carousel);
    }
  }, []);

  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((s, idx) => (
          <div
            className={`carousel-item ${idx === 0 ? "active" : ""}`}
            key={idx}
          >
            <div
              style={{
                position: "relative",
                height: "80vh",
                overflow: "hidden",
              }}
            >
              <img
                src={s.image}
                className="d-block w-100"
                alt={s.title}
                style={{ height: "100%", objectFit: "cover" }}
              />
              {/* Fullscreen dark overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.6)",
                }}
              />
              {/* Centered text content */}
              <div
                className="d-flex flex-column justify-content-center align-items-center text-center px-3"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 2,
                  color: "#fff",
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
};

export default HeroCarousel;
