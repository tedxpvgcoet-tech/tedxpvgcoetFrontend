import React, { useEffect, useRef, useState } from "react";
import "./WhatWeStandFor.css";
import redX from "../assets/red-x.png";
import whiteX from "../assets/white-x.png";

const WhatWeStandFor = () => {
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
  const containerClasses = `tedx-section ${inView ? "animate animate-x" : ""}`;

  return (
    <div className={containerClasses} ref={sectionRef}>


      <div className="tedx-x-image">
        <img src={redX} className="red-x" alt="Red X" />
        <img src={whiteX} className="white-x" alt="White X" />
      </div>

      <div className={`tedx-text-wrapper ${inView ? "animate" : ""}`}>
        <div className="tedx-shadow"></div>
        <div className="tedx-box">
          <h2>
            What We Stand For ?
          </h2>
          <p>
             PVG’s College of Engineering and Technology (PVGCOET) carries a rich culture of education and hosts a plethora of events bringing about all-round development of students. The TEDxPVGCOET event is a prized gemstone hosted independently by students and faculty members  under a University TEDx license.This event enables participants from different backgrounds to witness thought-provoking talks, and has hosted thought leaders, artists, scientists, entrepreneurs, and change-makers through the years.
          </p>
        </div>
      </div>
    </div>

    

  );
};

export default WhatWeStandFor;
