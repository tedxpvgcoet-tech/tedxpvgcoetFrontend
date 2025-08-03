import React, { useEffect, useRef } from "react";
import "./Lno.css";
import LnoImage from "../assets/lno.png";
import { Link } from "react-router-dom";

const Lno = () => {
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
    <section className="lno-section">
      <div className="lno-image-container">
        <img
          ref={imageRef}
          src={LnoImage}
          alt="Logistics & Operations Team"
          className="lno-image"
        />
      </div>
      <div className="lno-text">
        <p className="lno-description">
          The TEDxPVGCOET Logistics & Operations Team ensures smooth coordination,
          strategic planning, and flawless execution of every on-ground activity.
        </p>
        <Link to="/logistics-operations" className="lno-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Lno;
