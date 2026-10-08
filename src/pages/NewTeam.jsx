import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import FooterSection from "../sections/Common/FooterSection";
import "./NewTeam.css";

// Backgrounds
import bgDesktop from "../assets/team-2026/bg-desktop.png";
import bgMobile from "../assets/team-2026/bg-mobile.png";

// Team Images
import orgImg from "../assets/team-2026/organisers.png";
import dnpImg from "../assets/team-2026/dnp.png";
import lnoImg from "../assets/team-2026/lno.png";
import ediImg from "../assets/team-2026/editorial.png";
import fnsImg from "../assets/team-2026/fns.png";
import mnmImg from "../assets/team-2026/mnm.png";
import curImg from "../assets/team-2026/curation.png";
import techImg from "../assets/team-2026/technical.png";

const teamImages = [
  { id: "organisers", src: orgImg, alt: "Organisers" },
  { id: "dnp", src: dnpImg, alt: "Design and Production" },
  { id: "lno", src: lnoImg, alt: "Logistics and Operations" },
  { id: "editorial", src: ediImg, alt: "Editorial" },
  { id: "fns", src: fnsImg, alt: "Finance and Sponsorship" },
  { id: "mnm", src: mnmImg, alt: "Media and Marketing" },
  { id: "curation", src: curImg, alt: "Curation" },
  { id: "technical", src: techImg, alt: "Technical" },
];

const DustParticles = () => {
  const particles = Array.from({ length: 40 });
  return (
    <div className="dust-container">
      {particles.map((_, i) => (
        <div
          key={i}
          className="dust-particle"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animationDuration: `${12 + Math.random() * 20}s`,
            animationDelay: `-${Math.random() * 20}s`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            opacity: Math.random() * 0.4 + 0.1,
          }}
        ></div>
      ))}
    </div>
  );
};

const NewTeam = () => {
  const imageRefs = useRef([]);

  useEffect(() => {
    // Capture ref value into local variable for cleanup
    const currentRefs = imageRefs.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    currentRefs.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      currentRefs.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="new-committee-page" id="page-top">
      <Helmet defer={false}>
        <title>Committee | TEDxPVGCOET</title>
      </Helmet>

      {/* Desktop Background */}
      <div
        className="new-committee-bg-fixed bg-desktop-view"
        style={{ backgroundImage: `url("${bgDesktop}")` }}
      >
        <div className="bg-overlay"></div>
      </div>

      {/* Mobile Background */}
      <div
        className="new-committee-bg-fixed bg-mobile-view"
        style={{ backgroundImage: `url("${bgMobile}")` }}
      >
        <div className="bg-overlay"></div>
      </div>

      {/* Scroll gradient overlay (dark at top, fades out as you scroll) */}
      <div className="new-committee-scroll-fade"></div>

      {/* Atmospheric floating dust */}
      <DustParticles />

      {/* Hero section */}
      <section className="new-committee-hero">
        <h1 className="hero-text animate-text">
          <span className="hero-line1">The pieces that</span>
          <br />
          <span className="hero-line2">make the whole</span>
        </h1>
      </section>

      {/* Team Images Section */}
      <section className="new-committee-list">
        {teamImages.map((team, index) => (
          <div
            key={team.id}
            className="new-committee-img-container"
            ref={(el) => (imageRefs.current[index] = el)}
          >
            <img
              src={team.src}
              alt={team.alt}
              className="new-committee-img"
              loading="lazy"
            />
          </div>
        ))}
      </section>

      <FooterSection />
    </div>
  );
};

export default NewTeam;
