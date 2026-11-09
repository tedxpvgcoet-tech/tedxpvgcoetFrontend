import { Helmet } from "react-helmet";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import shipTheseusHero from "../assets/shipOfThesus/ShipTheseus1.webp";
import shipTheseusHeroPortrait from "../assets/shipOfThesus/ShipTheseusPortrait.webp";
import themeVideo from "../assets/shipOfThesus/themevideo.mp4";
import shipTheseusContentBackground from "../assets/shipOfThesus/ContentBG.webp";
import tsotLogo from "../assets/shipOfThesus/tsot_logo.webp";
import FooterSection from "../sections/Common/FooterSection";
import ShipTheseusSpeakers from "../sections/ShipTheseusSpeakers";
import ShipTheseusIllusions from "../sections/ShipTheseusIllusions";
import ShipExperienceCard from "../components/ShipExperienceCard";
import "../sections/Booknow.css";
import "../sections/Events/Drishti/DrishtiVideo.css";
import "./ShipOfTheseusEvent.css";

const ShipOfTheseusEvent = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (
      reduceMotion.matches ||
      !hero ||
      !image ||
      !("IntersectionObserver" in window)
    ) {
      return undefined;
    }

    let observer;
    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            hero.classList.add("theseus-event-hero--revealed");
          } else {
            hero.classList.remove("theseus-event-hero--revealed");
          }
        },
        { threshold: [0, 0.15] },
      );
      observer.observe(image);
      hero.classList.add("theseus-event-hero--reveal-ready");
    } catch {
      observer?.disconnect();
      hero.classList.remove(
        "theseus-event-hero--reveal-ready",
        "theseus-event-hero--revealed",
      );
      return undefined;
    }

    return () => {
      observer.disconnect();
      hero.classList.remove(
        "theseus-event-hero--reveal-ready",
        "theseus-event-hero--revealed",
      );
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play()?.catch(() => {});
    }
  }, []);

  return (
    <main className="theseus-event-page">
      <Helmet defer={false}>
        <title>Ship of Theseus | TEDxPVGCOET</title>
      </Helmet>
      <section
        className="theseus-event-hero"
        ref={heroRef}
        aria-label="Ship of Theseus event"
        style={{
          "--theseus-hero-art": `url("${shipTheseusHero}")`,
          "--theseus-hero-mobile-art": `url("${shipTheseusHeroPortrait}")`,
        }}
      >
        <picture className="theseus-event-hero__picture">
          <source media="(max-width: 600px)" srcSet={shipTheseusHeroPortrait} />
          <img
            ref={imageRef}
            className="theseus-event-hero__image"
            src={shipTheseusHero}
            alt="Ship of Theseus event artwork"
            fetchPriority="high"
          />
        </picture>
        <div className="theseus-event-hero__shade" aria-hidden="true" />
        <h1 className="theseus-event-sr-only">Ship of Theseus</h1>
        <div className="theseus-event-booking">
          <a
            className="book-now-btn"
            href="https://konfhub.com/tedxpvgcoetm"
            target="_blank"
            rel="noopener noreferrer"
          >
            BOOK NOW
          </a>
        </div>
      </section>
      <ShipExperienceCard heroRef={heroRef} />
      <section
        className="theseus-event-video"
        aria-label="Ship of Theseus event film"
        style={{
          "--theseus-video-bg": `url("${tsotLogo}")`,
        }}
      >
        <div className="theseus-event-video__bg" aria-hidden="true" />
        <div className="theseus-event-video__shade" aria-hidden="true" />
        <div className="theseus-event-video__content">
          <div className="theseus-event-video__frame">
            <video
              ref={videoRef}
              className="theseus-event-video__player"
              autoPlay
              muted
              loop
              preload="auto"
              playsInline
              aria-label="Ship of Theseus event film"
              onError={() => setVideoError(true)}
            >
              <source src={themeVideo} type="video/mp4" />
              Your browser cannot play this MP4 video.{" "}
              <a href={themeVideo}>Open the video file</a>.
            </video>
          </div>
          <a
            className="btn watch-btn theseus-event-watch-link"
            href="https://www.instagram.com/reel/DehWn2uIgds/?mdxt=MXQ4Zjh0b3A4NThtNA=="
            target="_blank"
            rel="noopener noreferrer"
          >
            WATCH NOW
          </a>
          {videoError && (
            <p className="theseus-event-video__fallback" role="status">
              Video playback is unavailable in this browser.{" "}
              <a href={themeVideo} target="_blank" rel="noreferrer">
                Open the video file
              </a>
              .
            </p>
          )}
        </div>
      </section>
      <section
        className="theseus-event-content"
        aria-labelledby="theseus-event-content-title"
        style={{
          "--theseus-content-art": `url("${shipTheseusContentBackground}")`,
        }}
      >
        <span className="theseus-event-content__corner-label theseus-event-content__corner-label--top">
          ...ORIGIN
        </span>
        <div className="theseus-event-content__copy">
          <h2 id="theseus-event-content-title">The Ship of Theseus</h2>

          <h3 className="theseus-event-content__subheading">The Myth</h3>
          <p>
            In Greek mythology, Theseus, a renowned hero and later, king of
            Athens, escaped from the island of Crete on a 30-oared ship,
            rescuing the youth of Athens from a cruel fate. To commemorate this
            brave venture, the Athenian people preserved Theseus’ ship and took
            it on an annual pilgrimage to the island of Delos. Over the years,
            the ship’s parts deteriorated and were gradually replaced with
            newer, stronger parts in order to keep the ship seaworthy. This
            account sparked a famous debate among the ancient philosophers –
          </p>
          <blockquote className="theseus-event-content__quote">
            “If no pieces of the original remained in the current ship, was it
            still the Ship of Theseus?”
          </blockquote>

          <h3 className="theseus-event-content__subheading">The Paradox</h3>
          <p>
            If we were to bring the Ship of Theseus out of its myth, we would
            find it applicable to various aspects of our world. For example, a
            tree sheds the entirety of its leaves in autumn, and blossoms anew
            the coming spring. Technically, it is not the tree you saw last
            year, but at the same time, it is. Which state holds the true
            identity of the tree, if any does at all?
          </p>
          <p>
            Thus, the Ship of Theseus acts as an object subjected to continual
            change, much like an evolving art form, an emerging business, or
            even a person undergoing growth.
          </p>
          <p>
            This eponymous vessel is not simply a story, for this ship explores
            further than lands and seas. It navigates the change within oneself,
            and the questions that arise with it. If a ship undergoes a
            transformation through time, what changes and what does not? And
            why?
          </p>
        </div>
        <span className="theseus-event-content__corner-label theseus-event-content__corner-label--bottom">
          BECOMING...
        </span>
      </section>
      <ShipTheseusSpeakers />
      <ShipTheseusIllusions />
      <FooterSection />
    </main>
  );
};

export default ShipOfTheseusEvent;
