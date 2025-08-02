import React, { useEffect, useRef } from "react";
import "./Editorial.css";
import EdiImage from "../assets/edi.png";
import { Link } from "react-router-dom";

const Editorial = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const imageEl = imageRef.current;
    const textEl = textRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-editorial");
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
    <section className="editorial-section">
      <div className="editorial-image-container" ref={imageRef}>
        <img src={EdiImage} alt="Editorial Team" className="editorial-image" />
      </div>
      <div className="editorial-text" ref={textRef}>
        <p className="editorial-description">
          The TEDxPVGCOET Editorial Team crafts compelling content and ensures every
          message aligns with our event’s voice, clarity, and storytelling excellence.
        </p>
        <Link to="/editorial-team" className="editorial-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Editorial;
