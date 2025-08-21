import React, { useEffect, useRef, useState } from "react";
import "./AboutTED.css";

const AboutTED = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

 useEffect(() => {
  const element = sectionRef.current;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect(); // trigger once
      }
    },
    { threshold: 0.3 }
  );

  if (element) {
    observer.observe(element);
  }

  return () => {
    if (element) {
      observer.unobserve(element); // clean up safely
    }
  };
}, []);

  return (
  <div id="about">
    <div className="ted-background">
      <div
        className={`about-wrapper ${inView ? "animate" : ""}`}
        ref={sectionRef}
      >
        <div className="about-shadow"></div>
        <div className="about-box">
          <h2>
            What is <span className="highlight-red">TED</span>?
          </h2>
          <p>
            <span className="highlight-red">TED</span>  is a nonprofit, nonpartisan organization dedicated to discovering, debating and spreading ideas that spark conversation, deepen understanding and drive meaningful change. Our organization is devoted to curiosity, reason, wonder and the pursuit of knowledge — without an agenda. We welcome people from every discipline and culture who seek a deeper understanding of the world and connection with others, and we invite everyone to engage with ideas and activate them in your community.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AboutTED;
