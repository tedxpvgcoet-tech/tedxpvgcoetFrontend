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
          They find the voices. You hear the echoes. Curation is where TEDx begins. They research, refine, and reach out- all to bring the right voices to the stage. Seekers of voices. Shapers of vision.
        </p>
        <Link to="/curation-team" className="curation-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Curation;
