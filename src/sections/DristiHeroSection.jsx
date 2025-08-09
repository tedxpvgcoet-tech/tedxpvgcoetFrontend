import React from "react";
import "./DristiHeroSection.css";
import sampleVideo from "../assets/Event-bg.mp4"; // Optional: still keep as background

const DristiHeroSection = () => {
  const handleWatchClick = () => {
    window.open("https://your-instapage-link.com", "_blank"); // Opens Instapage in new tab
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
