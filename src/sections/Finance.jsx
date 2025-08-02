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
          The TEDxPVGCOET Finance Team strategically manages resources, from budgeting to sponsorship, empowering the vision of an impactful TEDx event.
        </p>
        <Link to="/fin-team" className="fin-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Finance;
