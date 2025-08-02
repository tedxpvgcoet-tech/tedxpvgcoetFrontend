import React from "react";
import "./TeamHeroSection.css";
import teamDesktop from "../assets/team-desktop.png";
import teamTablet from "../assets/team-mobile.png";
import teamMobile from "../assets/team-mobile.png";

const TeamHeroSection = () => {
  return (
    <section className="team-hero-section">
      <img src={teamDesktop} alt="Team 2025" className="team-hero-image desktop-img" />
      <img src={teamTablet} alt="Team 2025" className="team-hero-image tablet-img" />
      <img src={teamMobile} alt="Team 2025" className="team-hero-image mobile-img" />
      <div className="team-red-line"></div>
    </section>
  );
};

export default TeamHeroSection;
