import React, { useEffect, useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import WhyInsurance from "../components/WhyInsurance";
import Stats from "../components/Stats";
import Navbar from "../components/Navbar";
import AvailablePolicies from "./AvailablePolicies";

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
      <AvailablePolicies />
      <Stats totals={totals} />
    </>
  );
};

export default Home;
