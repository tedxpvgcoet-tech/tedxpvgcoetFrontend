import React, { useEffect, useRef } from "react";
import "./Mnm.css";
import mnmImage from "../assets/MnM.png";
import { Link } from "react-router-dom";

const Mnm = () => {
  const imageContainerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const imageRef = imageContainerRef.current;
    const textBlockRef = textRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          imageRef?.classList.add("animate-image");
          textBlockRef?.classList.add("animate-mnm");
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
    <section className="mnm-section">
      <div className="mnm-image-container" ref={imageContainerRef}>
        <img src={mnmImage} alt="MnM Team" className="mnm-image" />
      </div>
      <div className="mnm-text" ref={textRef}>
        <p className="mnm-description">
        The Media and Marketing Team manages TEDxPVGCOET’s public presence. They drive communication strategies, social media campaigns, and visual storytelling to ensure the event reaches and resonates with its audience.
        </p>

        <Link to="/media-team" className="mnm-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Mnm;