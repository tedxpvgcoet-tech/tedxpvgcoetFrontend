import React from "react";
import "./PunarutthanHeroSection.css";
import backgroundImage from "../assets/punarutthan-bg1.png"; // Replace with your actual image path

const PunarutthanHeroSection = () => {
  return (
    <div
      className="punarutthan-hero"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay3"></div> {/* Add this line */}
      <div className="punarutthan-text">
        <h1>Punarutthan</h1>
        <p>
          At TEDxPVGCOET, "Punarutthan" signifies our commitment to renewing
          ideas, creativity, and hope. It’s about catalyzing a renaissance
          within our community—reviving meaningful conversations, fostering
          innovation, and empowering action. This theme resonates deeply with
          our mission to awaken fresh perspectives and inspire transformation.
        </p>
      </div>
    </div>
  );
};

export default PunarutthanHeroSection;
