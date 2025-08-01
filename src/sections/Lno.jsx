// Lno.jsx
import React from "react";
import "./Lno.css";
import lnoImage from "../assets/lno.png";
import { Link } from "react-router-dom";

const Lno = () => {
  return (
    <section className="lno-section">
      <div className="lno-image-container">
        <img src={lnoImage} alt="LNO Team" className="lno-image" />
      </div>
      <div className="lno-text">
        <p className="lno-description">
          The TEDxPVGCOET Logistics and Operations (LNO) Team ensures smooth execution,
          from stage setup to speaker coordination, enabling a seamless TEDx experience.
        </p>
        <Link to="/lno-team" className="lno-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Lno;
