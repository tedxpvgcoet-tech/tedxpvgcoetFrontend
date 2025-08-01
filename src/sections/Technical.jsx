// Lno.jsx
import React from "react";
import "./Technical.css";
import technicalImage from "../assets/tech.png";
import { Link } from "react-router-dom";

const Technical = () => {
  return (
    <section className="technical-section">
      <div className="technical-image-container">
        <img src={technicalImage} alt="technical Team" className="technical-image" />
      </div>
      <div className="technical-text">
        <p className="technical-description">
          The TEDxPVGCOET Logistics and Operations (LNO) Team ensures smooth execution,
          from stage setup to speaker coordination, enabling a seamless TEDx experience.
        </p>
        <Link to="/technical-team" className="technical-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Technical;
