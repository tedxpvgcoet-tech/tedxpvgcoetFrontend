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
          Step one: make a plan.
           Step two: triple-check it. 
           Step three: fix what broke anyway.
          They do it all, and still stand tall. Spine of every TEDx move
        </p>
        <Link to="/logistics-team" className="lno-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Lno;
