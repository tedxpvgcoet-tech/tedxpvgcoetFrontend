// Curation.jsx
import React from "react";
import "./Curation.css";
import curationImage from "../assets/curation.png"; // Replace with actual image path
import { Link } from "react-router-dom";

const Curation = () => {
  return (
    <section className="curation-section">
      <div className="curation-image-container">
        <img src={curationImage} alt="Curation Team" className="curation-image" />
      </div>
      <div className="curation-text">
        
        <p className="curation-description">
          The TEDxPVGCOET Curation Team hunts down bold ideas and works with speakers to
          shape talks that spark curiosity, challenge norms, and leave a lasting impact.
        </p>
        <Link to="/curation-team" className="curation-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Curation;
