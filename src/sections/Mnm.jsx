// Lno.jsx
import React from "react";
import "./Mnm.css";
import mnmImage from "../assets/MnM.png";
import { Link } from "react-router-dom";

const Mnm = () => {
  return (
    <section className="mnm-section">
      <div className="mnm-image-container">
        <img src={mnmImage} alt="Mnm Team" className="lno-image" />
      </div>
      <div className="mnm-text">
        <p className="mnm-description">
          The TEDxPVGCOET Logistics and Operations (LNO) Team ensures smooth execution,
          from stage setup to speaker coordination, enabling a seamless TEDx experience.
        </p>
        <Link to="/mnm-team" className="mnm-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Mnm;
