import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./SpeakerForm.css";
import bgVideo from "../assets/backgrounds/background.mp4";
import FooterSection from "../sections/Common/FooterSection";

const NotFound = () => {
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  return (
    <div className="hero-container1" style={styles.wrapper}>
      <Helmet defer={false}>
        <title>404 - Page Not Found | TEDxPVGCOET</title>
      </Helmet>
      <style>{`
        @keyframes dropIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 600px) {
          .not-found-card {
            width: 86% !important;
            padding: 32px 20px !important;
            margin: 0 auto !important;
          }
          .not-found-container {
            padding-top: 100px !important;
            padding-bottom: 40px !important;
          }
        }
      `}</style>

      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        className="hero-video1"
      />

      <div
        className="form-page not-found-container"
        style={styles.formPageContainer}
      >
        <div className="not-found-card" style={styles.card}>
          <h1 style={styles.code}>404</h1>

          <h2 style={styles.heading}>Page Not Found</h2>

          <p style={styles.text}>
            The requested URL was not found on this server.
          </p>

          <Link
            to="/"
            style={{
              ...styles.button,
              ...(isBtnHovered ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
          >
            Go to Home
          </Link>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "transparent",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  formPageContainer: {
    minHeight: "calc(100vh - 120px)",
    paddingTop: "120px",
    paddingBottom: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    flexGrow: 1,
    boxSizing: "border-box",
  },

  card: {
    backgroundColor: "rgba(10, 10, 12, 0.85)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "12px",
    padding: "44px 36px",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
    fontFamily: '"Inter", sans-serif',
    animation: "dropIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    boxSizing: "border-box",
  },

  code: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "3.8rem",
    fontWeight: "800",
    color: "#e81b2a",
    margin: "0",
    lineHeight: "1",
    letterSpacing: "-1px",
  },

  heading: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "1.4rem",
    fontWeight: "600",
    marginTop: "16px",
    marginBottom: "10px",
    color: "#ffffff",
  },

  text: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.92rem",
    color: "#cccccc",
    lineHeight: "1.5",
    marginBottom: "28px",
    fontWeight: "400",
  },

  button: {
    display: "block",
    width: "100%",
    fontFamily: '"Inter", sans-serif',
    backgroundColor: "#e81b2a",
    color: "#ffffff",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1rem",
    boxSizing: "border-box",
    transition: "background-color 0.25s ease",
  },

  buttonHover: {
    backgroundColor: "#c40000",
  },
};

export default NotFound;
