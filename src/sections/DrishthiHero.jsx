import React from 'react';
import '../Stylesheets/DrishtiHero.css';
import logo from "../assets/Drishti/Drishiti_logo.png"

const DrishtiHero = () => {
  return (
    <section 
      className="drishti-hero"
      role="banner"
      aria-label="Drishti Hero Section"
    >
        
      <div className="drishti-hero__container">
        {/* Left side - Logo */}
        <div className="drishti-hero__logo-section">
          <img 
            src={logo}
            alt="Drishti Logo"
            className="drishti-hero__logo-image"
          />
        </div>
        
        {/* Right side - Content */}
        <div className="drishti-hero__content">
          <h1 className="drishti-hero__title">
            Drishti
          </h1>
          <p className="drishti-hero__description">
            Drishti -Perspective is about looking beyond the obvious, challenging assumptions, and discovering new ways of seeing the world. It's the ability to shift viewpoints, to recognize that the same reality can hold multiple truths depending on where you stand. Perspective shapes understanding, drives empathy, and fuels creativity—it's what transforms obstacles into opportunities and ideas into action. Drishti isn't just about sight; it's about vision—the deeper, more thoughtful way of perceiving life, people, and possibilities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DrishtiHero;