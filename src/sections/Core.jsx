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
          They form the central pillar of TEDxPVGCOET. They oversee the vision, ensure inter-team coordination, and maintain alignment with the TEDx philosophy. Their role is both strategic and supportive- guiding planning, enabling collaboration, and upholding the event’s standards. With clarity of purpose and a commitment to excellence, they build the foundation upon which every team functions and every idea thrives.</p>
        <Link to="/organizers-team" className="core-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Core;