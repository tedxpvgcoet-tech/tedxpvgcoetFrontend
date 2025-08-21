import React, { useEffect, useRef } from "react";
import "./Curation.css";
import curationImage from "../assets/curation.png";

const Curation = () => {
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const currentRef = imageContainerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      },
      { threshold: 0.3 }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section className="curation">
      <div className="curation-left animate-on-scroll" ref={imageContainerRef}>
        <img src={curationImage} alt="Curation Team" />
      </div>
      <div className="curation-right">
        <p className="curation-desc">
         The Curation Team finds and refines the voices that define TEDx. Through research, outreach, and collaboration, they shape powerful talks that align with the TEDx mission and leave a lasting impact.
        </p>
        <a href="/curation-team" className="curation-btn">
          Learn More →
        </a>
      </div>
    </section>
  );
};

export default Curation;