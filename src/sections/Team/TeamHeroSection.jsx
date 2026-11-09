import React, { useState } from "react";
import "./TeamHeroSection.css";
import teamDesktop from "../../assets/team/team-desktop.webp";
import teamTablet from "../../assets/team/team-mobile.webp";
import teamMobile from "../../assets/team/team-mobile.webp";
import { Link } from "react-router-dom";

const TeamHeroSection = ({ isEventSection = false }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      className={`team-hero-section ${
        isEventSection ? "team-hero-section--event" : ""
      }`}
    >
      {isEventSection && (
        <div className="team-hero-header">
          <h2 className="team-hero-title">Team 2025</h2>
        </div>
      )}

      <div
        className="team-hero-image-wrapper"
        onClick={() => setModalOpen(true)}
      >
        <img
          src={teamDesktop}
          alt="Team 2025"
          className="team-hero-image desktop-img"
          loading="lazy"
        />
        <img
          src={teamTablet}
          alt="Team 2025"
          className="team-hero-image tablet-img"
          loading="lazy"
        />
        <img
          src={teamMobile}
          alt="Team 2025"
          className="team-hero-image mobile-img"
          loading="lazy"
        />
      </div>

      {isEventSection && (
        <div className="team-hero-actions">
          <Link to="/team-2025" className="team-view-page-btn">
            Meet the Team
          </Link>
        </div>
      )}

      <div className="team-red-line"></div>

      {modalOpen && (
        <div
          className="team-image-modal"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="team-image-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="team-image-modal__close"
              onClick={() => setModalOpen(false)}
              aria-label="Close image modal"
            >
              &times;
            </button>
            <img
              src={teamDesktop}
              alt="Team 2025 full resolution"
              className="team-image-modal__img"
            />
            <div className="team-image-modal__footer">
              <a
                href={teamDesktop}
                target="_blank"
                rel="noopener noreferrer"
                className="team-image-modal__open-btn"
              >
                Open Original in New Tab
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamHeroSection;
