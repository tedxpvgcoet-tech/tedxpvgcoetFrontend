import React from "react";
import "./TeamHeroSection.css";
import teamDesktop from "../../assets/team/team-desktop.webp";
import teamTablet from "../../assets/team/team-mobile.webp";
import teamMobile from "../../assets/team/team-mobile.webp";

const TeamHeroSection = () => {
  return (
    <section className="team-hero-section">
      <img src={teamDesktop} alt="Team 2025" className="team-hero-image desktop-img"  loading="lazy" />
      <img src={teamTablet} alt="Team 2025" className="team-hero-image tablet-img"  loading="lazy" />
      <img src={teamMobile} alt="Team 2025" className="team-hero-image mobile-img"  loading="lazy" />
      <div className="team-red-line"></div>
    </section>
  );
};

export default TeamHeroSection;
