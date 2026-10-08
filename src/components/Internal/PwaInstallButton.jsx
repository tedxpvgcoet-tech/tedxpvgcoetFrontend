import React, { useState, useEffect } from "react";

export default function PwaInstallButton({ 
  text = "Install App",
  icon = "fa-solid fa-download",
  bridgekeeperLore = false
}) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Check if installed
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
      setIsStandalone(true);
      return;
    }

    // Detect iOS
    const ua = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const isMacSafari = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1; // iPad on Mac Safari
    if (isIOSDevice || isMacSafari) {
      setIsIOS(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Instead of early returning null here, we decide rendering below so we can keep the lore visible
  const isReady = !isStandalone && (deferredPrompt || isIOS);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSPrompt(true);
      setTimeout(() => setShowIOSPrompt(false), 5000);
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const btnStyle = {
    fontFamily: '"Inter", sans-serif',
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px dashed rgba(255,255,255,0.2)",
    color: "#ccc",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.82rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    position: "relative"
  };

  const buttonElement = (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        style={hovered ? { ...btnStyle, background: "rgba(255,255,255,0.1)", borderColor: "#fff", color: "#fff" } : btnStyle}
        onClick={handleInstallClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title="Install app to your device"
      >
        <i className={icon}></i> {text}
      </button>

      {showIOSPrompt && (
        <div style={{
          position: "absolute",
          top: "100%",
          right: "0",
          marginTop: "10px",
          width: "200px",
          backgroundColor: "rgba(15, 15, 20, 0.98)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "8px",
          padding: "12px",
          zIndex: 100,
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          color: "#eee",
          fontSize: "0.85rem",
          lineHeight: "1.5",
          fontFamily: '"Inter", sans-serif',
          textAlign: "left"
        }}>
          To install on iOS: tap the <strong style={{ color: "#fff" }}>Share</strong> icon below, then select <strong style={{ color: "#fff" }}>Add to Home Screen</strong>.
        </div>
      )}
    </div>
  );

  if (bridgekeeperLore) {
    return (
      <div style={{ marginTop: "34px", paddingTop: "20px", borderTop: "1px dashed rgba(255,255,255,0.15)", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "14px", fontFamily: '"Inter", sans-serif', textAlign: "center", lineHeight: "1.5" }}>
          Weary traveler...<br/>do you wish to carry this Bridge in thy pocket?
        </p>
        {isReady ? buttonElement : (
          <p style={{ color: "#e81b2a", fontSize: "0.8rem", marginTop: "5px", fontStyle: "italic", opacity: 0.8 }}>
            (Thy pocket already bears the Bridge, or this device restricts it)
          </p>
        )}
      </div>
    );
  }

  if (!isReady) return null; // Fallback behavior for generic buttons

  return buttonElement;
}
