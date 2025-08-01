// src/components/PastEventSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./PastEventSection.css";
import punarutthanImg from "../assets/Event/Punarutthan-bg.jpg"; // Use actual filename
import FooterSection from "../sections/FooterSection";

const useInView = (options) => {
  const ref = useRef(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect(); // stop observing once triggered
        }
      },
      options
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

const PastEventSection = () => {
  const [imgRef, imgVisible] = useInView({ threshold: 0.3 });
  const [textRef, textVisible] = useInView({ threshold: 0.3 });

  return (
    <section className="past-event-section">
      <div className="past-event-section-dum">
      <div className="past-event-content">
        <div
          ref={imgRef}
          className={`event-image ${imgVisible ? "slide-in-left" : ""}`}
        >
          <img src={punarutthanImg} alt="Punarutthan Event" />
        </div>

        <div
          ref={textRef}
          className={`event-details ${textVisible ? "slide-in-right" : ""}`}
        >
          <h2>Punarutthan</h2>
          <p className="year">2023</p>
          <p className="desc">
            “Punarutthan” stands for revival and renewal, drawing from deep cultural roots.
              It invites us to rethink, rebuild, and reimagine a better future.
          </p>
          <Link to="/events/Punarutthan" className="see-more">See More</Link>
        </div>
      </div>
      </div>
      <FooterSection />
    </section>

  );
};


export default PastEventSection;
