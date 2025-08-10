
import React from "react";
import "./DristiHeroSection.css";
import sampleVideo from "../assets/themeReveal.mp4";

const DristiHeroSection = () => {
  const handleWatchClick = () => {
    window.open("https://www.instagram.com/p/DNEFw7_ImjI/", "_blank");
  };

  const handleLearnMoreClick = () => {
    const section = document.getElementById("learn-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-container">
      <video
        className="hero-video"
        src={sampleVideo}
        muted
        loop
        autoPlay
        playsInline
      ></video>

      <div className="hero-overlay">
       <button className="watch-btn" onClick={handleWatchClick}>
  Watch
</button>
<button
  className="learn-btn"
  onClick={() =>
    document.getElementById("learn-section").scrollIntoView({
      behavior: "smooth",
    })
  }
>
  Learn More
</button>

      </div>
    </div>
  );
};

export default DristiHeroSection;

