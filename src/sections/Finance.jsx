// Lno.jsx
import React from "react";
import "./Finance.css";
import finImage from "../assets/fin.png";
import { Link } from "react-router-dom";

const Finance = () => {
  return (
    <section className="fin-section">
      <div className="fin-image-container">
        <img src={finImage} alt="fin Team" className="fin-image" />
      </div>
      <div className="fin-text">
        <p className="fin-description">
          Plan. Pitch. Provide. Garnering sponsorships, facilitating support and seamlessly tracking revenue and expenditure are all vital efforts being executed suently.
They fund the dream and account for every detail. </p>
        <Link to="/finance-team" className="fin-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Finance;
