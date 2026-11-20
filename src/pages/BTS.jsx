import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaHeart,
  FaArrowLeft,
  FaExternalLinkAlt,
} from "react-icons/fa";
import FooterSection from "../sections/Common/FooterSection";
import "./BTS.css";

const YOUTUBE_VIDEO_ID = "bO5ZLNKsxR0";
const YOUTUBE_URL = `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`;

const BTS = () => {
  return (
    <div className="bts-page">
      <Helmet defer={false}>
        <title>Behind The Scenes | TEDxPVGCOET Team</title>
        <meta
          name="description"
          content="An exclusive behind-the-scenes look for the TEDxPVGCOET team. Thank you for pouring your heart into making this happen."
        />
        <meta
          property="og:title"
          content="Behind The Scenes • TEDxPVGCOET Team"
        />
        <meta
          property="og:description"
          content="To every single team member who made TEDxPVGCOET happen. This one is for you."
        />
        <meta
          property="og:image"
          content={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
        />
      </Helmet>

      {/* Ambient background decoration */}
      <div className="bts-glow bts-glow-1" />
      <div className="bts-glow bts-glow-2" />

      <main className="bts-container">
        {/* Top bar with back button & team tag */}
        <div className="bts-top-bar">
          <Link to="/" className="bts-back-btn" aria-label="Go to home">
            <FaArrowLeft />
            <span>Home</span>
          </Link>
          <span className="bts-badge">
            <span className="bts-badge-dot" /> FOR THE TEAM
          </span>
        </div>

        {/* Header tailored specifically to the team */}
        <header className="bts-header">
          <h1 className="bts-title">
            Behind <span className="highlight-red">The Scenes</span>
          </h1>
          <p className="bts-subtitle">
            To every organizer, curator, designer, technician, and volunteer who
            poured their heart and sleepless nights into this journey. This one
            is for you.
          </p>
        </header>

        {/* Video Player Section */}
        <section className="bts-player-section">
          <div className="bts-player-card">
            <div className="bts-video-wrapper">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
                title="TEDxPVGCOET Behind The Scenes"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Action Bar */}
            <div className="bts-action-bar">
              <div className="bts-action-meta">
                <span className="bts-action-tag">
                  <FaHeart className="bts-heart-icon" /> Team Cut
                </span>
                <span className="bts-action-sep">•</span>
                <span className="bts-action-author">TEDxPVGCOET 2026</span>
              </div>

              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                className="bts-btn bts-btn-youtube"
                title="Open video in YouTube app"
              >
                <FaYoutube className="bts-icon-yt" />
                <span>Watch in YouTube App</span>
                <FaExternalLinkAlt className="bts-icon-external" />
              </a>
            </div>
          </div>
        </section>

        {/* Heartfelt Note for Team Members */}
        <section className="bts-team-note">
          <div className="bts-note-card">
            <span className="bts-note-badge">Thank You, Team!</span>
            <h2>Every late night. Every rehearsal. Every breakthrough.</h2>
            <p>
              From frantic whiteboard ideas and stage setups to the moment the
              spotlight hit the red dot—none of this would exist without your
              passion, patience, and grit. Take a moment to celebrate what you
              built together.
            </p>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default BTS;
