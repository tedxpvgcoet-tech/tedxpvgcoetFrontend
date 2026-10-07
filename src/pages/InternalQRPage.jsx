import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import BridgekeeperAuth from "../components/Internal/BridgekeeperAuth";
import QRCodeGenerator from "../components/Internal/QRCodeGenerator";
import bgVideo from "../assets/backgrounds/background.mp4";

export default function InternalQRPage() {
  const [view, setView] = useState("loading"); // "loading" | "auth" | "qr"
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
      setView("qr");
    } else {
      setView("auth");
    }
  }, []);

  const handleAuthorized = ({ token, name, team }) => {
    setSession({ token, name, team });
    setView("qr");
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

  if (view === "qr") {
    return (
      <div className="ui-hero-container">
        <Helmet>
          <title>QR Code Generator | TEDxPVGCOET</title>
          <meta
            name="description"
            content="Generate high-resolution branded TEDx QR codes."
          />
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
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            boxSizing: "border-box",
            padding: "80px 20px 40px 20px",
          }}
        >
          <QRCodeGenerator
            authToken={session.token}
            name={session.name}
            team={session.team}
            onLogout={handleLogout}
          />
        </div>
      </div>
    );
  }

  return null;
}
