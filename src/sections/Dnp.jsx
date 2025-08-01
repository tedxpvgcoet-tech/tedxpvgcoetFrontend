// Lno.jsx
import React from "react";
import "./Dnp.css";
import dnpImage from "../assets/dnp.png";
import { Link } from "react-router-dom";

const Dnp = () => {
  return (
    <section className="dnp-section">
      <div className="dnp-image-container">
        <img src={dnpImage} alt="dnp Team" className="dnp-image" />
      </div>
      <div className="dnp-text">
        <p className="dnp-description">
          The TEDxPVGCOET Logistics and Operations (LNO) Team ensures smooth execution,
          from stage setup to speaker coordination, enabling a seamless TEDx experience.
        </p>
        <Link to="/dnp-team" className="dnp-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Dnp;
