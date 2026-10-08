import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import bgVideo from "../assets/backgrounds/background.mp4";
import BridgekeeperAuth from "../components/Internal/BridgekeeperAuth";
import BillsUploadForm from "../components/Internal/BillsUploadForm";
import QRCodeGenerator from "../components/Internal/QRCodeGenerator";
import PwaInstallButton from "../components/Internal/PwaInstallButton";

const dashboardStyles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "transparent",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
  },
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    boxSizing: "border-box",
    padding: "clamp(90px, 12vw, 120px) clamp(10px, 3vw, 20px) 40px",
  },
  card: {
    backgroundColor: "rgba(15, 15, 20, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    padding: "clamp(24px, 5vw, 40px)",
    maxWidth: "500px",
    width: "100%",
    backdropFilter: "blur(20px)",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.5)",
    fontFamily: '"Inter", sans-serif',
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "8px",
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#aaa",
    marginBottom: "30px",
    fontSize: "0.95rem",
  },
  btn: {
    display: "block",
    width: "100%",
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.15)",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: "1.05rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default function InternalBillsPage() {
  const [view, setView] = useState("loading"); // "loading" | "auth" | "bills"
  const [session, setSession] = useState({
    token: "",
    name: "",
    team: "",
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("BRIDGE_TOKEN");
    const savedName = localStorage.getItem("BRIDGE_NAME");
    const savedTeam = localStorage.getItem("BRIDGE_TEAM");
    if (savedToken && savedName && savedTeam) {
      setSession({ token: savedToken, name: savedName, team: savedTeam });
      setView("dashboard");
    } else {
      setView("auth");
    }
  }, []);

  const handleAuthorized = ({ token, name, team }) => {
    setSession({ token, name, team });
    setView("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("BRIDGE_TOKEN");
    localStorage.removeItem("BRIDGE_NAME");
    localStorage.removeItem("BRIDGE_TEAM");
    // Also clear old keys if present
    localStorage.removeItem("BRIDGE_KEY");
    localStorage.removeItem("bills_team");
    localStorage.removeItem("bills_name");
    setSession({ token: "", name: "", team: "" });
    setView("auth");
  };

  if (view === "loading") return null;

  if (view === "auth") {
    return <BridgekeeperAuth onAuthorized={handleAuthorized} />;
  }

  if (view === "dashboard") {
    return (
      <div style={dashboardStyles.wrapper}>
        <Helmet defer={false}>
          <title>Portal | TEDxPVGCOETM</title>
        </Helmet>
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            filter: "brightness(0.7)",
          }}
        />
        <div style={dashboardStyles.pageContainer}>
          <div style={dashboardStyles.card}>
            <h1 style={dashboardStyles.title}>Internal Portal</h1>
            <p style={dashboardStyles.subtitle}>
              Welcome back, {session.name.split(" ")[0]}. What would you like to
              do?
            </p>

            <button
              type="button"
              style={dashboardStyles.btn}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(235,0,40,0.15)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "rgba(255,255,255,0.05)")
              }
              onClick={() => setView("bills")}
            >
              Upload Internal Bills
            </button>
            <button
              type="button"
              style={dashboardStyles.btn}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(235,0,40,0.15)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "rgba(255,255,255,0.05)")
              }
              onClick={() => setView("qrcode")}
            >
              QR Code Generator
            </button>
            <button
              type="button"
              style={{
                ...dashboardStyles.btn,
                marginTop: "30px",
                border: "none",
                backgroundColor: "transparent",
                color: "#e81b2a",
                fontSize: "0.9rem",
              }}
              onClick={handleLogout}
            >
              Sign Out
            </button>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PwaInstallButton
                text="Summon the App"
                icon="fa-solid fa-scroll"
                bridgekeeperLore={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "bills") {
    return (
      <BillsUploadForm
        authToken={session.token}
        name={session.name}
        team={session.team}
        onBack={() => setView("dashboard")}
        onLogout={handleLogout}
      />
    );
  }

  if (view === "qrcode") {
    return (
      <div className="ui-hero-container">
        <Helmet defer={false}>
          <title>QR Generator | TEDxPVGCOETM</title>
        </Helmet>
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video1"
        />
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            boxSizing: "border-box",
            padding: "clamp(90px, 12vw, 120px) clamp(10px, 3vw, 20px) 40px",
          }}
        >
          <QRCodeGenerator
            name={session.name}
            team={session.team}
            onBack={() => setView("dashboard")}
            onLogout={handleLogout}
          />
        </div>
      </div>
    );
  }

  return null;
}
