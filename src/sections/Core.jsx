import React, { useEffect, useRef } from "react";
import "./Core.css";
import coreImage from "../assets/core.png";
import { Link } from "react-router-dom";

const Core = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const currentImage = imageRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentImage.classList.add("animate-image");
          observer.unobserve(currentImage);
        }
      },
      { threshold: 0.3 }
    );

    if (currentImage) observer.observe(currentImage);

    return () => {
      if (currentImage) observer.unobserve(currentImage);
    };
  }, []);

  return (
    <section className="core-section">
      <div className="core-image-container">
        <img
          ref={imageRef}
          src={coreImage}
          alt="Core Team"
          className="core-image"
        />
      </div>
      <div className="core-text">
        <p className="core-description">
          The roots that sustain our ever-growing tree of ideas. Those who build, those who believe, and more importantly, those who continually support the notion of a community dedicated to spreading knowledge and provoking thought. Three Eyes. One Vision.        </p>
        <Link to="/organizers-team" className="core-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Core;