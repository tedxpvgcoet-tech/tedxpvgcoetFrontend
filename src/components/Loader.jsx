import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Loader.css";

const Loader = ({ forceFullIntro = false }) => {
  // Full animation only once per browser tab/session
  const [showFullIntro] = useState(() => {
    if (forceFullIntro) {
      return true;
    }

    return sessionStorage.getItem("tedxIntroShown") !== "true";
  });

  const ideaRef = useRef(null);
  const tedRef = useRef(null);
  const xRef = useRef(null);
  const pvgRef = useRef(null);
  const taglineRef = useRef(null);
  const loadingRef = useRef(null);

  useEffect(() => {
    // Subsequent loads: skip the intro animation
    // and show the branding immediately.
    if (!showFullIntro) {
      gsap.set(
        [
          tedRef.current,
          xRef.current,
          pvgRef.current,
          taglineRef.current,
          loadingRef.current,
        ],
        {
          opacity: 1,
          clearProps: "transform,filter",
        },
      );

      if (ideaRef.current) {
        gsap.set(ideaRef.current, { opacity: 0 });
      }

      return;
    }

    // Mark intro as shown for this browser tab/session
    if (!forceFullIntro) {
      sessionStorage.setItem("tedxIntroShown", "true");
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        // Idea emerges
        .fromTo(
          ideaRef.current,
          {
            opacity: 0,
            scale: 0.5,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
          },
        )

        // TED reveals
        .fromTo(
          tedRef.current,
          {
            opacity: 0,
            y: 18,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
          },
          "-=0.1",
        )

        // x appears
        .fromTo(
          xRef.current,
          {
            opacity: 0,
            scale: 0.4,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.8)",
          },
          "-=0.25",
        )

        // PVGCOETM
        .fromTo(
          pvgRef.current,
          {
            opacity: 0,
            x: 15,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
          },
          "-=0.15",
        )

        // Tagline
        .fromTo(
          taglineRef.current,
          {
            opacity: 0,
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          "-=0.1",
        )

        // Loading line
        .fromTo(
          loadingRef.current,
          {
            opacity: 0,
            scaleX: 0,
          },
          {
            opacity: 1,
            scaleX: 1,
            duration: 1.45,
          },
          "-=0.15",
        );
    });

    return () => ctx.revert();
  }, [showFullIntro, forceFullIntro]);

  return (
    <main className="loader-container">
      {/* Ambient background */}
      <div className="ambient-glow"></div>

      {/* Full idea animation appears only on first visit */}
      <div className="idea-animation" ref={ideaRef}>
        <span className="idea-ring ring-1"></span>
        <span className="idea-ring ring-2"></span>
        <span className="idea-ring ring-3"></span>

        <span className="idea-dot"></span>

        <span className="particle particle-1"></span>
        <span className="particle particle-2"></span>
        <span className="particle particle-3"></span>
        <span className="particle particle-4"></span>
        <span className="particle particle-5"></span>
        <span className="particle particle-6"></span>
      </div>

      {/* TEDx branding */}
      <div className="brand-reveal">
        <div className="tedx-logo">
          <span className="ted" ref={tedRef}>
            TED
          </span>

          <span className="x" ref={xRef}>
            x
          </span>

          <span className="pvgcoet" ref={pvgRef}>
            PVGCOETM
          </span>
        </div>

        <p className="tagline" ref={taglineRef}>
          IDEAS WORTH SPREADING
        </p>

        <div className="loading-track" ref={loadingRef}>
          <span className="loading-pulse"></span>
        </div>
      </div>
    </main>
  );
};

export default Loader;
