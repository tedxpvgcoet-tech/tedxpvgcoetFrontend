import React, { useEffect, useRef } from "react";
import "./Finance.css";
import finImage from "../assets/fin.png";
import { Link } from "react-router-dom";

const Finance = () => {
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

    if (currentImage) {
      observer.observe(currentImage);
    }

    return () => {
      if (currentImage) {
        observer.unobserve(currentImage);
      }
    };
  }, []);

  return (
    <section className="fin-section">
      <div className="fin-image-container">
        <img
          ref={imageRef}
          src={finImage}
          alt="Finance Team"
          className="fin-image"
        />
      </div>
      <div className="fin-text">
        <p className="fin-description">
       From sponsorships to budgeting, the Finance Team ensures the event is financially sound. They manage resources with transparency and foresight, supporting both creativity and sustainability. </p>
        <Link to="/finance-team" className="fin-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Finance;