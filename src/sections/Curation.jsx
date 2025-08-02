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
          The curation team is responsible for identifying, vetting, and guiding speakers to craft compelling and impactful TEDx talks. They ensure each story aligns with TED's mission of "ideas worth spreading".
        </p>
        <a href="/punarutthan-team-curation" className="curation-btn">
          Meet the Team
        </a>
      </div>
    </section>
  );
};

export default Curation;
