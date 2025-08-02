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
          The TEDxPVGCOET Organizers orchestrate the entire symphony, from visionary planning to seamless execution, curating an unforgettable TEDx experience.
        </p>
        <Link to="/core-team" className="core-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Core;
