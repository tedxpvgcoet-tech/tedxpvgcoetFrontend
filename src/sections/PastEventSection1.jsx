// src/components/PastEventSection.jsx
import { Link } from "react-router-dom";
import "./PastEventSection1.css";
import punarutthanImg from "../assets/AvantGarde-bg.png"; // Use actual filename
import React, { useState, useEffect, useRef } from "react";




const useInView = (options) => {
  const ref = useRef(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect(); // trigger once
        }
      },
      options
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

const PastEventSection1 = () => {
  const [imgRef, imgVisible] = useInView({ threshold: 0.3 });
  const [textRef, textVisible] = useInView({ threshold: 0.3 });

  return (
    <section className="past-event-section1">
      <div className="past-event-content1">
        <div
          ref={imgRef}
          className={`event-image1 ${imgVisible ? "slide-in-left" : ""}`}
        >
          <img src={punarutthanImg} alt="Avant Garde Event" />
        </div>

        <div
          ref={textRef}
          className={`event-details1 ${textVisible ? "slide-in-right" : ""}`}
        >
          <h2>Avant Garde</h2>
          <p className="year1">2021</p>
          <p className="desc1">
            "Avant Garde" embraces bold, unconventional ideas and celebrates those ahead of their time.
It invites us to think differently and challenge the norm.
          </p>
          <Link to="/events/AvantGarde" className="see-more1">
            See More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PastEventSection1;