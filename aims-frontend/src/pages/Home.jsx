import React, { useEffect, useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import WhyInsurance from "../components/WhyInsurance";
import Stats from "../components/Stats";
import Reviews from "../components/Reviews";
import Navbar from "../components/Navbar";

const Home = () => {
  const [totals, setTotals] = useState({});

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setTotals);
  }, []);

  return (
    <>
      <Navbar />
      <HeroCarousel />
      <WhyInsurance />
      <Stats totals={totals} />
      <Reviews />
    </>
  );
};

export default Home;
