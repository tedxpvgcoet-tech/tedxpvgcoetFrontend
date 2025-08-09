/*
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
        <button className="hero-btn" onClick={handleWatchClick}>
          Watch
        </button>
        <button
          className="hero-btn"
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
*/
import React from "react";
import "./DristiHeroSection.css";
import sampleVideo from "../assets/Event-bg.mp4";

const DristiHeroSection = () => {
  const handleWatchClick = () => {
    window.open("https://your-instapage-link.com", "_blank");
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
        <button className="hero-btn" onClick={handleWatchClick}>
          Watch
        </button>
        <button className="hero-btn" onClick={handleLearnMoreClick}>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default DristiHeroSection;

