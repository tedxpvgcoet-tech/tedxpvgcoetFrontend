import React, { useEffect, useRef } from "react";
import "./Editorial.css";
import EdiImage from "../assets/edi.png";
import { Link } from "react-router-dom";

const Editorial = () => {
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
    <section className="editorial-section">
      <div className="editorial-image-container">
        <img
          ref={imageRef}
          src={EdiImage}
          alt="Editorial Team"
          className="editorial-image"
        />
      </div>
      <div className="editorial-text">
        <p className="editorial-description">
          The Editorial Team crafts the written voice of TEDxPVGCOET- from theme documents to speaker communications. They refine every word to ensure clarity, consistency, and alignment with the event’s vision.
          </p>

        <Link to="/editorial-team" className="editorial-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Editorial;