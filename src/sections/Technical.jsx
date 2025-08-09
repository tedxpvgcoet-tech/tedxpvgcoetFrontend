import React, { useEffect, useRef } from "react";
import "./Technical.css";
import technicalImage from "../assets/tech.png"; // Make sure this path is correct
import { Link } from "react-router-dom";

const Technical = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    const textElement = textRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-image");
             observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (imageElement) observer.observe(imageElement);
    if (textElement) observer.observe(textElement);

    return () => {
      if (imageElement) observer.unobserve(imageElement);
      if (textElement) observer.unobserve(textElement);
    };
  }, []);

  return (
    <section className="technical-section">
      <div className="technical-image-container">
        <img
          ref={imageRef}
          src={technicalImage}
          alt="Technical Team"
          className="technical-image"
        />
      </div>
      <div className="technical-text" ref={textRef}>
        <p className="technical-description">
                 The Technical Team powers the digital infrastructure of TEDxPVGCOET. They manage the website, AV systems, livestreams, and real-time troubleshooting to ensure a smooth and glitch-free experience. </p>

        <Link to="/technical-team" className="technical-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Technical;