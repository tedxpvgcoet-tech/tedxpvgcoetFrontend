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
          From backstage bandwidth to centre-stage brilliance. Shifting screens, crafting digital marvels, making websites work in tandem with our ideas and vision, a brilliant network that connects us. And when something inevitably breaks? Well.. "it was working yesterday" Guardians of the Grid. </p>
        <Link to="/technical-team" className="technical-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Technical;
