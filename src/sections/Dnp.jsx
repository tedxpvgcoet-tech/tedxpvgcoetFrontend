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
          The Vibe? Built. The Set? Engineered. The Elegance? Intentional. They dream in colour, build in rhythm, and leave no screw untightened. If the space speaks to you, they are the one's who taught it how.  </p>
        <Link to="/design-team" className="dnp-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Dnp;
