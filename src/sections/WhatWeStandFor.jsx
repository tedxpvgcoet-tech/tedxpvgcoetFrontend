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
            <span className="highlight-red">TEDx</span> is a grassroots initiative
            created in the spirit of TED’s mission Ideas Worth Spreading. It brings
            the TED experience to local communities through independently
            organized events licensed by TED. These events feature live speakers
            and TED Talks to spark conversation and connection. TEDx events are
            planned by passionate volunteers focused on meaningful ideas and impact.
          </p>
        </div>
      </div>
    </div>

    

  );
};

export default WhatWeStandFor;
