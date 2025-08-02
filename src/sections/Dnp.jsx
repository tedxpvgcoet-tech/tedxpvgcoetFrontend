// Dnp.jsx
import React, { useEffect, useRef } from "react";
import "./Dnp.css";
import dnpImage from "../assets/dnp.png";
import { Link } from "react-router-dom";

const Dnp = () => {
  const imageContainerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const imageRef = imageContainerRef.current;
    const textBlockRef = textRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          imageRef?.classList.add("animate-image");
          textBlockRef?.classList.add("animate-dnp");
        }
      },
      { threshold: 0.3 }
    );

    if (imageRef) observer.observe(imageRef);

    return () => {
      if (imageRef) observer.unobserve(imageRef);
    };
  }, []);

  return (
    <section className="dnp-section">
      <div className="dnp-image-container" ref={imageContainerRef}>
        <img src={dnpImage} alt="Design & Production Team" className="dnp-image" />
      </div>
      <div className="dnp-text" ref={textRef}>
        <p className="dnp-description">
          The TEDxPVGCOET Design & Production Team transforms concepts into captivating realities, from stunning visuals to immersive experiences, bringing the TEDx vision to life.
        </p>
        <Link to="/dnp-team" className="dnp-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Dnp;
