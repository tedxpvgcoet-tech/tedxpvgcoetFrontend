import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Add this import
import '../Stylesheets/DrishtiHero.css';
import logo from "../assets/Drishti/Drishiti_logo.png";
import { setupLogoAnimations } from '../Javascript/animation';

const DrishtiHero = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    setupLogoAnimations(logoRef);
    
    // Cleanup function
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

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
            ref={logoRef}
            src={logo}
            alt="Drishti Logo"
            className="drishti-hero__logo-image"
          />
        </div>
        
        {/* Right side - Content */}
          

        <div className="drishti-hero__content">
          <p className="drishti-hero__description">
            Perspective is more than just looking. It's the way your eyes see the world. Most of us are busy digging down into what we see, and everyone sees the world differently. The harsh truth is, no one is wrong. As Anaïs Nin once said, "We don't see things as they are, but we see them as we are!"
          </p>
        </div>
      </div>
    </section>
  );
};

export default DrishtiHero;