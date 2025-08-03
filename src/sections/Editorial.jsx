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
          Proof that a well-placed comma can be more powerful than a mic drop. Every word you hear, read, or scroll past? Brewed here. They Write. They Edit. They Refine. Until every word feels just right- making sure everything sounds as good as it looks</p>
        <Link to="/editorial-team" className="editorial-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Editorial;
