import React, { useState, useEffect } from 'react';
import './Booknow.css';

// Import your images
import mobileBackgroundImage from "../assets/Drishti/mobile.jpg";
import desktopBackgroundImage from "../assets/Drishti/bigimg.jpg";

// --- OPTIMIZATION: Debounce Helper Function ---
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// A custom hook to get the window width, now with debouncing
const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    const debouncedHandleResize = debounce(handleResize, 150);

    window.addEventListener('resize', debouncedHandleResize);
    
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  return windowWidth;
};

const Booknow = () => {
  const width = useWindowWidth();
  const isDesktop = width >= 768;
  const imageUrl = isDesktop ? desktopBackgroundImage : mobileBackgroundImage;

  return (
    <div
      className="hero-container"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="hero-content">
        <a
          href="https://konfhub.com/drishti"
          target="_blank"
          rel="noopener noreferrer"
          className="book-now-btn"
        >
          {/* The span is no longer needed for this simpler animation */}
          Book Now
        </a>
      </div>
    </div>
  );
};

export default Booknow;