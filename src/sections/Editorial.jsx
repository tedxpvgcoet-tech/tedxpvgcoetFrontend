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
          Proof that a well-placed comma can be more powerful than a mic drop. Every word you hear, read, or scroll past? Brewed here. They Write. They Edit. They Refine. Until every word feels just right- making sure everything sounds as good as it looks</p>

        <Link to="/editorial-team" className="editorial-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Editorial;
