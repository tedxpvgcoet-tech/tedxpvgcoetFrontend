import React from "react";
import backgroundVideo from "../assets/background.mp4";
import sphereLogo from "../assets/sphere.png"; // It's a sphere visually
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <video autoPlay loop muted className="hero-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-text">
  <h1><span className="slide-in line-1">Idea’s</span></h1>
  <h1><span className="slide-in line-2">Worth</span></h1>
  <h1><span className="slide-in line-3">Spreading</span></h1>
</div>

      <img src={sphereLogo} alt="TEDx Sphere" className="hero-sphere" />
    </div>
  );
};

export default HeroSection;
