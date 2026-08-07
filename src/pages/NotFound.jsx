import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SpeakerForm.css";
import bgVideo from "../assets/backgrounds/background.mp4";

const NotFound = () => {
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  return (
    <div className="hero-container1" style={styles.wrapper}>
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
      `}</style>

      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        className="hero-video1"
      />

      <div className="form-page" style={styles.formPageContainer}>
        <div style={styles.card}>
          {/* Scaled-down 404 number */}
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
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "transparent",
    position: "relative",
  },

  formPageContainer: {
    minHeight: "100vh",
    paddingTop: "0",
    paddingBottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
  },

  card: {
    backgroundColor: "rgba(10, 10, 12, 0.85)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "12px",
    padding: "44px 36px",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
    fontFamily: '"Inter", sans-serif',
    animation: "dropIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards",
  },

  code: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "3.8rem", // Reduced 404 text size
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
