import React from "react";
import "./TakeTheLeapHeroSection.css";
import backgroundImage from "../assets/Event/Take-the-leap-demo.png"; // Replace with your actual image path

const TakeTheLeapHeroSection = () => {
  return (
      <div
  className="AvantGarde-hero"
  style={{ backgroundImage: `url(${backgroundImage})` }}
>
  <div className="overlay"></div> {/* Add this line */}
  <div className="AvantGarde-text">
    <h1>Take The Leap</h1>
    <p>
     The TEDxPVGCOET theme "Take the Leap" is an invitation to embrace courage, step beyond conventional boundaries, and initiate transformative change. It embodies the spirit of risk-taking, the thrill of innovation, and the power of personal evolution. This theme encourages speakers and audiences alike to explore moments of decision that propel us forward—be it in career, creativity, or personal growth. "Take the Leap" challenges us to overcome hesitation, seize unforeseen opportunities, and trust in our ability to ascend to new heights, ultimately inspiring a journey of daring and discovery.</p>
  </div>
</div>

  );
};

export default TakeTheLeapHeroSection;
