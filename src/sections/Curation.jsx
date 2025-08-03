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
          They find the voices. You hear the echoes. Curation is where TEDx begins. They research, refine, and reach out- all to bring the right voices to the stage. Seekers of voices. Shapers of vision.
        </p>
        <a href="/punarutthan-team-curation" className="curation-btn">
          Meet the Team
        </a>
      </div>
    </section>
  );
};

export default Curation;
