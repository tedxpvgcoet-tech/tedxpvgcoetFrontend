import React from "react";
import backgroundVideo from "../assets/Event-bg.mp4";
import "./EventHeroSection.css";

const EventHeroSection = () => {
  return (
    <div className="hero-container3">
      <video autoPlay loop muted className="hero-video3">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-text3">
        <h1><span className="event">Events</span></h1>
     </div>
    </div>
  );
};

export default EventHeroSection;
