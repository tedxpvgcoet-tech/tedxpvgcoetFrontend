// Editorial.jsx
import React from "react";
import "./Editorial.css";
import EdiImage from "../assets/edi.png"; // Replace with actual image path
import { Link } from "react-router-dom";

const Editorial = () => {
  return (
    <section className="editorial-section">
      <div className="editorial-image-container">
        <img src={EdiImage} alt="Editorial Team" className="editorial-image" />
      </div>
      <div className="editorial-text">
        <p className="editorial-description">
          The TEDxPVGCOET Editorial Team crafts compelling content and ensures every
          message aligns with our event’s voice, clarity, and storytelling excellence.
        </p>
        <Link to="/editorial-team" className="editorial-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Editorial;
