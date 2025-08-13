import React from "react";
import "./TakeTheLeapHeroSection.css";
import backgroundImage from "../assets/Event/Take-the-leap-bg-1.png"; // Replace with your actual image path
import mobileBGimg from "../assets/Event/TaekTheLeap-BG.jpg"

const TakeTheLeapHeroSection = () => {
  return (
<div className="takeLeap">
  <div className="overlay1"></div>
  <div className="AvantGarde-text">
    <h1>Take The Leap</h1>
    <p>
       The first ever event organized by TEDxPVGCOET, 'Take The Leap!', was themed aptly. Taking the leap is all about making the best of the freedom and liberty given to us, giving ourselves the chance to make mistakes and grow, paving the way for others to give their passion a chance, and throwing in all we have got and await all that life has in store for us. So, open your mind, unbound your thoughts, and let's together, Take the leap!.
    </p>
  </div>
</div>

  );
};

export default TakeTheLeapHeroSection;
