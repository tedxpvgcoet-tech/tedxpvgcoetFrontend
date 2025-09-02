import React, { useEffect, useRef, useState } from "react";
import "./AboutTEDx.css";
import redX from "../assets/red-x.png";
import whiteX from "../assets/white-x.png";

const AboutTEDx = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // When inView is true we apply both .animate and .animate-x
  const containerClasses = `tedx-section1 ${inView ? "animate animate-x" : ""}`;

  return (
    <div className={containerClasses} ref={sectionRef}>
      <div className={`tedx-text-wrapper1 ${inView ? "animate" : ""}`}>
        <div className="tedx-shadow1"></div>
        <div className="tedx-box1">
          <h2>
            What is <span className="highlight-red">TEDx</span>?
          </h2>
          <p>
            <span className="highlight-red">X</span>  = independently organized event
In the spirit of discovering and spreading ideas, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. At a TEDx event, TED Talks video and live speakers combine to spark deep discussion and connection. These local, self-organized events are branded TEDx, where x = independently organized TED event. The TED Conference provides general guidance for the TEDx program, but individual TEDx events are self-organized.
          </p>
        </div>
      </div>

      <div className="tedx-x-image">
        <img src={redX} className="red-x1" alt="Red X" />
        <img src={whiteX} className="white-x1" alt="White X" />
      </div>
    </div>
  );
};

export default AboutTEDx;
