// src/components/PastEventSection.jsx
import { Link } from "react-router-dom";
import "./PastEventSection2.css";
import LeapImg from "../assets/Event/Take-the-leap-demo.png"; // Use actual filename
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
          <img src={LeapImg} alt="Avant Garde Event" />
        </div>

        <div
          ref={textRef}
          className={`event-details1 ${textVisible ? "slide-in-right" : ""}`}
        >
          <h2>Take the Leap</h2>
          <p className="year1">2020</p>
          <p className="desc1">
            "Take the Leap" empowers us to embrace courage, step beyond our comfort zones, and ignite the spark of innovation. It invites us to transform challenges into opportunities and redefine what's possible.
          </p>
          <Link to="/events/TakeTheLeap" className="see-more1">
            See More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PastEventSection1;