import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const carousel = document.querySelector("#heroCarousel");
    if (carousel && window.bootstrap) {
      new window.bootstrap.Carousel(carousel, {
        interval: 5000,
        ride: "carousel",
      });
    }
  }, []);

  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`carousel-item ${idx === 0 ? "active" : ""}`}
          >
            <div
              className="position-relative"
              style={{ height: "80vh", overflow: "hidden" }}
            >
              <img
                src={s.image}
                alt={s.title}
                className="d-block w-100"
                style={{ height: "100%", objectFit: "cover" }}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              />
              <div
                className="position-absolute top-50 start-50 translate-middle text-center text-white px-3"
                style={{ zIndex: 2 }}
              >
                <h1 className="display-4 fw-bold mb-2">{s.title}</h1>
                <p className="lead">{s.subtitle}</p>
                <button
                  onClick={() => navigate(s.cta.link)}
                  className="btn btn-light btn-lg mt-3"
                >
                  {s.cta.text}
                </button>
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
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeroCarousel;
