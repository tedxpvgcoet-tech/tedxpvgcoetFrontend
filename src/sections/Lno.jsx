// Lno.jsx
import React, { useEffect, useRef } from "react";
import "./Lno.css";
import LnoImage from "../assets/lno.png";
import { Link } from "react-router-dom";

const Lno = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const imageEl = imageRef.current;
    const textEl = textRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-lno");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (imageEl) observer.observe(imageEl);
    if (textEl) observer.observe(textEl);

    return () => {
      if (imageEl) observer.unobserve(imageEl);
      if (textEl) observer.unobserve(textEl);
    };
  }, []);

  return (
    <section className="lno-section">
      <div className="lno-image-container" ref={imageRef}>
        <img src={LnoImage} alt="Logistics & Operations Team" className="lno-image" />
      </div>
      <div className="lno-text" ref={textRef}>
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
