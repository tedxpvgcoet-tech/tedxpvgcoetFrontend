import React, { useState } from "react";
import { Helmet } from "react-helmet";
import bgVideo from "../../assets/backgrounds/background.mp4";

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
    maxWidth: "520px",
    width: "100%",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
    fontFamily: '"Inter", sans-serif',
    animation: "dropIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    boxSizing: "border-box",
  },
  greeting: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.9rem",
    color: "#888",
    margin: "0 0 4px 0",
    fontWeight: "400",
  },
  userName: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "1.6rem",
    fontWeight: "800",
    color: "#fff",
    margin: "0 0 4px 0",
  },
  teamBadge: {
    display: "inline-block",
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.78rem",
    fontWeight: "700",
    color: "#e81b2a",
    background: "rgba(232, 27, 42, 0.1)",
    border: "1px solid rgba(232, 27, 42, 0.25)",
    borderRadius: "20px",
    padding: "4px 14px",
    marginBottom: "32px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "24px",
  },
  optionCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "28px 20px",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textDecoration: "none",
  },
  optionCardHover: {
    background: "rgba(232, 27, 42, 0.08)",
    borderColor: "rgba(232, 27, 42, 0.3)",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  optionCardDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  optionIcon: {
    fontSize: "2rem",
  },
  optionTitle: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
  },
  optionSub: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.75rem",
    color: "#888",
    margin: 0,
  },
  comingSoonBadge: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.65rem",
    fontWeight: "800",
    color: "#fbbf24",
    background: "rgba(251, 191, 36, 0.1)",
    border: "1px solid rgba(251, 191, 36, 0.25)",
    borderRadius: "4px",
    padding: "2px 8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  logoutBtn: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.82rem",
    color: "#666",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 16px",
    transition: "color 0.2s",
    textDecoration: "underline",
  },
};

export default function InternalDashboard({
  name,
  team,
  onNavigate,
  onLogout,
}) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={styles.wrapper}>
      <Helmet defer={false}>
        <title>Portal | TEDxPVGCOETM</title>
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

      <div style={styles.pageContainer}>
        <div style={styles.card}>
          <p style={styles.greeting}>Welcome back,</p>
          <h1 style={styles.userName}>{name}</h1>
          <div style={styles.teamBadge}>{team}</div>

          <div style={styles.optionsGrid}>
            {/* Bills Option */}
            <div
              id="dashboard-bills"
              style={{
                ...styles.optionCard,
                ...(hoveredCard === "bills" ? styles.optionCardHover : {}),
              }}
              onMouseEnter={() => setHoveredCard("bills")}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onNavigate("bills")}
            >
              <span style={styles.optionIcon}>🧾</span>
              <p style={styles.optionTitle}>Submit Bills</p>
              <p style={styles.optionSub}>Upload expense receipts</p>
            </div>

            {/* QR Scanner Option (Coming Soon) */}
            <div
              id="dashboard-qr"
              style={{
                ...styles.optionCard,
                ...(hoveredCard === "qr" ? {} : {}),
                ...styles.optionCardDisabled,
              }}
              onMouseEnter={() => setHoveredCard("qr")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <span style={styles.optionIcon}>📷</span>
              <p style={styles.optionTitle}>QR Scanner</p>
              <span style={styles.comingSoonBadge}>Coming Soon</span>
            </div>
          </div>

          <button
            style={styles.logoutBtn}
            onClick={onLogout}
            onMouseEnter={(e) => (e.target.style.color = "#e81b2a")}
            onMouseLeave={(e) => (e.target.style.color = "#666")}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
