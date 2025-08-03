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
          Because great ideas deserve to be seen, heard, and shared- with flair. They see moments before they happen, and make sure you see them too. They control the scroll, craft the frame, chase the spark. Your storytellers. Your strategists.
        </p>
        <Link to="/media-team" className="mnm-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Mnm;
