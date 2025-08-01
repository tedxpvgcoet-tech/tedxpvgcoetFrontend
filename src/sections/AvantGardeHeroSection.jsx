import React from "react";
import "./AvantGardeHeroSection.css";
import backgroundImage from "../assets/AvantGarde-bg.png"; // Replace with your actual image path

const AvantGardeHeroSection = () => {
  return (
      <div
  className="AvantGarde-hero"
  style={{ backgroundImage: `url(${backgroundImage})` }}
>
  <div className="overlay"></div> {/* Add this line */}
  <div className="AvantGarde-text">
    <h1>Avant Garde</h1>
    <p>
      The TEDx theme "Avant Garde" celebrates those ahead of their time—innovators introducing unconventional forms of art and thought. Rooted in the French term for "advance guard," it embodies bold ideas, visionary thinking, and a spirit of breaking norms. This theme invites speakers and audiences to explore new intellectual frontiers, challenging the status quo and inspiring a journey into the extraordinary.
    </p>
  </div>
</div>

  );
};

export default AvantGardeHeroSection;
