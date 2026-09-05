import React, { useState, useEffect } from "react";
import BridgekeeperAuth from "../components/Internal/BridgekeeperAuth";
import BillsUploadForm from "../components/Internal/BillsUploadForm";

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
      setView("bills");
    } else {
      setView("auth");
    }
  }, []);

  const handleAuthorized = ({ token, name, team }) => {
    setSession({ token, name, team });
    setView("bills");
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

  if (view === "bills") {
    return (
      <BillsUploadForm
        authToken={session.token}
        name={session.name}
        team={session.team}
        onBack={null} // No dashboard to go back to
        onLogout={handleLogout}
      />
    );
  }

  return null;
}
