import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./TeamDepartmentSection.css";

const TeamDepartmentSection = ({ title, description, image, link }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentContainer?.classList.add("animate-image");
          observer.unobserve(currentContainer);
        }
      },
      { threshold: 0.2 },
    );

    if (currentContainer) observer.observe(currentContainer);
    return () => {
      if (currentContainer) observer.unobserve(currentContainer);
    };
  }, []);

  return (
    <section className="team-dept-section">
      <div className="team-dept-left" ref={containerRef}>
        <img
          src={image}
          alt={`${title} Team`}
          className="team-dept-image"
          loading="lazy"
        />
      </div>
      <div className="team-dept-right">
        <p className="team-dept-desc">{description}</p>
        <Link to={link} className="team-dept-btn">
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default TeamDepartmentSection;
