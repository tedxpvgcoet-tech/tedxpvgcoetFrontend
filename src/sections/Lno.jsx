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
         This team handles all behind-the-scenes planning and execution. From scheduling and vendor coordination to real-time problem-solving, they make sure the event runs seamlessly from start to finish.
        </p>
        <Link to="/logistics-team" className="lno-button">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default Lno;