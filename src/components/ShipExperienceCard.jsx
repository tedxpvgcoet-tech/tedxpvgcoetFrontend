import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import shipArtwork from "../assets/shipOfThesus/ShipTheseus1.webp";
import shipPreviewVideo from "../assets/shipOfThesus/3DVideo.mp4";
import "./ShipExperienceCard.css";

const ShipExperienceCard = ({ heroRef }) => {
  const videoRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = heroRef?.current;
    if (!hero) return undefined;

    const updateVisibility = (isVisible) => setHeroVisible(isVisible);
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) =>
          updateVisibility(
            entry.isIntersecting && entry.intersectionRatio >= 0.05,
          ),
        { threshold: [0, 0.05] },
      );
      observer.observe(hero);
      return () => observer.disconnect();
    }

    const checkVisibility = () => {
      const bounds = hero.getBoundingClientRect();
      updateVisibility(bounds.bottom > 0 && bounds.top < window.innerHeight);
    };
    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);
    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [heroRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play()?.catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (heroVisible) {
      video.play()?.catch(() => {});
    } else {
      video.pause();
    }
  }, [heroVisible]);

  return (
    <Link
      className={`ship-experience-card${heroVisible ? "" : " ship-experience-card--hidden"}`}
      to="/ship"
      aria-label="The Ship of Theseus. Click here to see the journey. Open the interactive 3D experience."
      tabIndex={heroVisible ? 0 : -1}
      aria-hidden={!heroVisible}
    >
      <span className="ship-experience-card__thumbnail" aria-hidden="true">
        <video
          ref={videoRef}
          className="ship-experience-card__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={shipArtwork}
          tabIndex={-1}
        >
          <source src={shipPreviewVideo} type="video/mp4" />
        </video>
        <span className="ship-experience-card__thumbnail-shade" />
      </span>
      <span className="ship-experience-card__copy">
        <span className="ship-experience-card__eyebrow">
          THE SHIP OF THESEUS
        </span>
        <span className="ship-experience-card__title">
          Click here to see the journey
        </span>
        <span className="ship-experience-card__support" aria-hidden="true">
          ↗
        </span>
      </span>
    </Link>
  );
};

export default ShipExperienceCard;
