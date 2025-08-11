import React from "react";
import "./DristiHeroSection.css";
import desktopVideo from "../assets/themeReveal.mp4";  // Desktop video
import mobileVideo from "../assets/mobile-video.mp4"; // Mobile video

const DristiHeroSection = () => {
  const handleWatchClick = () => {
    window.open("https://www.instagram.com/p/DNEFw7_ImjI/", "_blank");
  };

  const handleLearnMoreClick = () => {
        window.open("https://your-newsletter-link.com", "_blank"); // <-- replace with actual link
  };

  // Choose video based on screen size
  const videoSrc = window.innerWidth <= 768 ? mobileVideo : desktopVideo;

  return (
    <div className="hero-container">
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="hero-overlay">
        <button className="btn watch-btn" onClick={handleWatchClick}>
          Watch
        </button>
        <button className="btn learn-btn" onClick={handleLearnMoreClick}>
          NewsLetter
        </button>
      </div>
    </div>
  );
};

export default DristiHeroSection;
