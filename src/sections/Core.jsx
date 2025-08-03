// Lno.jsx
import React from "react";
import "./Core.css";
import coreImage from "../assets/core.png";
import { Link } from "react-router-dom";

const Core = () => {
  return (
    <section className="core-section">
      <div className="core-image-container">
        <img src={coreImage} alt="core Team" className="core-image" />
      </div>
      <div className="core-text">
        <p className="core-description">
          he roots that sustain our ever-growing tree of ideas. Those who build, those who believe, and more importantly, those who continually support the notion of a community dedicated to spreading knowledge and provoking thought. Three Eyes. One Vision. </p>
        <Link to="/organizers-team" className="core-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Core;
