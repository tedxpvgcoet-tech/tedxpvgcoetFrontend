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
          The TEDxPVGCOET Logistics and Operations (LNO) Team ensures smooth execution,
          from stage setup to speaker coordination, enabling a seamless TEDx experience.
        </p>
        <Link to="/core-team" className="core-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Core;
