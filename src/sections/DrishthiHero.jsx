import React, { useEffect, useRef } from 'react';
import '../Stylesheets/DrishtiHero.css';
import "../Stylesheets/animation.css"
import logo from "../assets/Drishti/Drishiti_logo.png"

const DrishtiHero = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (logoRef.current) {
        const scrollPosition = window.scrollY;
        const logoElement = logoRef.current;
        
        // Add/remove class based on scroll position
        if (scrollPosition > 50) {
          logoElement.classList.add('scroll-animate');
        } else {
          logoElement.classList.remove('scroll-animate');
        }
        
        // Optional: Adjust animation intensity based on scroll
        const rotation = Math.min(scrollPosition / 10, 15);
        logoElement.style.setProperty('--scroll-rotation', `${rotation}deg`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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