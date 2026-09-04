import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./PastEventSection.css";

const useInView = (options) => {
  const ref = useRef(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

const PastEventSection = ({ title, year, desc, image, link, alt }) => {
  const [imgRef, imgVisible] = useInView({ threshold: 0.3 });
  const [textRef, textVisible] = useInView({ threshold: 0.3 });

  return (
    <section className="past-event-section">
      <div className="past-event-content">
        <div
          ref={imgRef}
          className={`event-image ${imgVisible ? "slide-in-left" : ""}`}
        >
          <img src={image} alt={alt || `${title} Event`} loading="lazy" />
        </div>

        <div
          ref={textRef}
          className={`event-details ${textVisible ? "slide-in-right" : ""}`}
        >
          <h2>{title}</h2>
          <p className="year">{year}</p>
          <p className="desc">{desc}</p>
          <Link to={link} className="see-more">
            See More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PastEventSection;
