import React, { useState } from "react";
import { Helmet } from "react-helmet";
import bgVideo from "../../assets/backgrounds/background.mp4";
import bridgekeeperImg from "../../assets/bridgekeeper.webp";
import wrongAnswerImg from "../../assets/Gatekeeper-MontyPython.webp";

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "transparent",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    boxSizing: "border-box",
    padding: "100px 20px 60px",
  },
  card: {
    backgroundColor: "rgba(10, 10, 12, 0.88)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "12px",
    padding: "40px 36px",
    textAlign: "center",
    maxWidth: "480px",
    width: "100%",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
    fontFamily: '"Inter", sans-serif',
    animation: "dropIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    boxSizing: "border-box",
  },
  img: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "24px",
    display: "block",
  },
  title: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#e81b2a",
    margin: "0 0 12px 0",
    letterSpacing: "-0.5px",
    textTransform: "uppercase",
  },
  riddle: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.95rem",
    color: "#cccccc",
    lineHeight: "1.6",
    marginBottom: "28px",
    fontWeight: "400",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "1rem",
    marginBottom: "14px",
    fontFamily: '"Inter", sans-serif',
    boxSizing: "border-box",
    outline: "none",
  },
  inputFocus: {
    borderColor: "#e81b2a",
  },
  button: {
    display: "block",
    width: "100%",
    fontFamily: '"Inter", sans-serif',
    backgroundColor: "#e81b2a",
    color: "#ffffff",
    padding: "12px",
    borderRadius: "4px",
    border: "none",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "background-color 0.25s ease",
  },
  buttonHover: { backgroundColor: "#c40000" },
  buttonDisabled: { opacity: 0.6, cursor: "not-allowed" },

  // Popup overlay
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  popup: {
    backgroundColor: "rgba(10, 10, 12, 0.95)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    padding: "32px",
    maxWidth: "420px",
    width: "100%",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.9)",
    fontFamily: '"Inter", sans-serif',
    animation: "dropIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
  },
  popupImg: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "20px",
    display: "block",
  },
  popupText: {
    fontFamily: '"Inter", sans-serif',
    color: "#e81b2a",
    fontWeight: "700",
    fontSize: "1.1rem",
    marginBottom: "8px",
  },
  popupSub: {
    fontFamily: '"Inter", sans-serif',
    color: "#aaa",
    fontSize: "0.88rem",
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  popupBtn: {
    display: "block",
    width: "100%",
    fontFamily: '"Inter", sans-serif',
    backgroundColor: "#e81b2a",
    color: "#fff",
    padding: "11px",
    borderRadius: "4px",
    border: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
    cursor: "pointer",
  },
};

export default function BridgekeeperAuth({ onAuthorized }) {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [btnHovered, setBtnHovered] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let API_URL = "https://www.backend.tedxpvgcoet.in";
      try {
        if (import.meta.env.VITE_BACKEND_URL)
          API_URL = import.meta.env.VITE_BACKEND_URL;
      } catch (e) { }
      try {
        if (process.env.REACT_APP_BACKEND_URL)
          API_URL = process.env.REACT_APP_BACKEND_URL;
      } catch (e) { }

      const res = await fetch(`${API_URL}/verify-key`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("BRIDGE_KEY", keyword);
        onAuthorized(keyword);
      } else {
        setPopupMsg(
          data.error || "Wrong! Into the Gorge of Eternal Peril with you!",
        );
        setShowWrongPopup(true);
        setKeyword("");
      }
    } catch (err) {
      setPopupMsg("The bridge is down. Could not reach the backend right now.");
      setShowWrongPopup(true);
    }
    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      <Helmet defer={false}>
        <title>Internal | TEDxPVGCOET</title>
      </Helmet>
      <style>{`
        @keyframes dropIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hero-video1 {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          z-index: 0;
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

      {/* Wrong answer popup */}
      {showWrongPopup && (
        <div style={styles.overlay} onClick={() => setShowWrongPopup(false)}>
          <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
            <img
              src={wrongAnswerImg}
              alt="Wrong answer!"
              style={styles.popupImg}
            />
            <p style={styles.popupText}>Into the Gorge of Eternal Peril!</p>
            <p style={styles.popupSub}>
              {popupMsg || "That is the wrong answer. Try again..."}
            </p>
            <button
              style={styles.popupBtn}
              onClick={() => setShowWrongPopup(false)}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <div style={styles.pageContainer}>
        <div style={styles.card}>
          <img
            src={bridgekeeperImg}
            alt="The Bridgekeeper"
            style={styles.img}
          />
          <h1 style={styles.title}>Stop!</h1>
          <p style={styles.riddle}>
            Who would cross the Bridge of Death must answer me these questions
            three, ere the other side he see.
            <br />
            <br />
            Actually, just one.
            <br />
            <strong style={{ color: "#fff" }}>
              What is the secret keyword?
            </strong>
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <input
              type="password"
              style={{
                ...styles.input,
                ...(inputFocused ? styles.inputFocus : {}),
              }}
              placeholder="Enter the keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              required
            />
            <button
              type="submit"
              style={{
                ...styles.button,
                ...(btnHovered && !loading ? styles.buttonHover : {}),
                ...(loading ? styles.buttonDisabled : {}),
              }}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Answer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
