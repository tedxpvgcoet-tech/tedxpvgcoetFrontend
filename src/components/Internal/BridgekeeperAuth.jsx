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
    transition: "border-color 0.3s ease",
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

  // Step indicator
  stepRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  stepDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.15)",
    transition: "all 0.3s ease",
  },
  stepDotActive: {
    background: "#e81b2a",
    boxShadow: "0 0 10px rgba(232, 27, 42, 0.5)",
  },
  stepLine: {
    width: "40px",
    height: "2px",
    background: "rgba(255,255,255,0.1)",
  },

  // OTP input container
  otpContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "14px",
  },
  otpDigit: {
    width: "48px",
    height: "56px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "700",
    textAlign: "center",
    fontFamily: '"Inter", sans-serif',
    outline: "none",
    transition: "all 0.3s ease",
    caretColor: "#e81b2a",
  },
  otpDigitFocus: {
    borderColor: "#e81b2a",
    background: "rgba(232, 27, 42, 0.05)",
    boxShadow: "0 0 0 3px rgba(232, 27, 42, 0.15)",
  },

  // Info text
  infoText: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.82rem",
    color: "#888",
    marginBottom: "20px",
    lineHeight: "1.5",
  },

  // Back link
  backLink: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.85rem",
    color: "#888",
    background: "none",
    border: "none",
    cursor: "pointer",
    marginTop: "14px",
    padding: 0,
    textDecoration: "underline",
    transition: "color 0.2s",
  },

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

  // Success indicator
  successIcon: {
    fontSize: "3rem",
    marginBottom: "16px",
  },
};

export default function BridgekeeperAuth({ onAuthorized }) {
  const [step, setStep] = useState("email"); // "email" | "otp"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [btnHovered, setBtnHovered] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Resend cooldown timer
  const startCooldown = () => {
    setCooldown(30);
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const getApiUrl = () => {
    let API_URL = "https://www.backend.tedxpvgcoet.in";
    try {
      if (import.meta.env.VITE_BACKEND_URL)
        API_URL = import.meta.env.VITE_BACKEND_URL;
    } catch (e) {}
    try {
      if (process.env.REACT_APP_BACKEND_URL)
        API_URL = process.env.REACT_APP_BACKEND_URL;
    } catch (e) {}
    return API_URL;
  };

  // ── Step 1: Request OTP ────────────────────────────────────────────────
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`${getApiUrl()}/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setStep("otp");
        startCooldown();
      } else {
        setPopupMsg(
          data.error ||
            "This email is not associated with any active TEDx committee member.",
        );
        setShowWrongPopup(true);
      }
    } catch (err) {
      setPopupMsg("The bridge is down. Could not reach the backend right now.");
      setShowWrongPopup(true);
    }
    setLoading(false);
  };

  // ── Step 2: Verify OTP ────────────────────────────────────────────────
  const handleVerifyOTP = async (otpValue) => {
    const otpString = otpValue || otp.join("");
    if (otpString.length !== 6) return;
    setLoading(true);

    try {
      const res = await fetch(`${getApiUrl()}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: otpString }),
      });

      const data = await res.json();

      if (data.success) {
        // Save session info
        localStorage.setItem("BRIDGE_TOKEN", data.token);
        localStorage.setItem("BRIDGE_NAME", data.name);
        localStorage.setItem("BRIDGE_TEAM", data.team);
        onAuthorized({
          token: data.token,
          name: data.name,
          team: data.team,
        });
      } else {
        setPopupMsg(data.error || "Incorrect OTP. Please try again.");
        setShowWrongPopup(true);
        setOtp(["", "", "", "", "", ""]);
      }
    } catch (err) {
      setPopupMsg("The bridge is down. Could not reach the backend right now.");
      setShowWrongPopup(true);
    }
    setLoading(false);
  };

  // ── OTP input handlers ────────────────────────────────────────────────
  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return; // only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (value && index === 5) {
      const full = newOtp.join("");
      if (full.length === 6) {
        handleVerifyOTP(full);
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) prev.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);
    if (pasted.length === 6) {
      handleVerifyOTP(pasted);
    } else {
      const next = document.getElementById(`otp-${pasted.length}`);
      if (next) next.focus();
    }
  };

  const handleResendOTP = async () => {
    if (cooldown > 0) return;
    setLoading(true);
    try {
      const res = await fetch(`${getApiUrl()}/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        startCooldown();
        setOtp(["", "", "", "", "", ""]);
      } else {
        setPopupMsg(data.error || "Failed to resend OTP.");
        setShowWrongPopup(true);
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
        <title>Internal | TEDxPVGCOETM</title>
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

          {/* Step indicator */}
          <div style={styles.stepRow}>
            <div
              style={{
                ...styles.stepDot,
                ...(step === "email" ? styles.stepDotActive : {}),
              }}
            />
            <div style={styles.stepLine} />
            <div
              style={{
                ...styles.stepDot,
                ...(step === "otp" ? styles.stepDotActive : {}),
              }}
            />
          </div>

          {step === "email" ? (
            <>
              <p style={styles.riddle}>
                Who would cross the Bridge of Death must answer me these
                questions three, ere the other side he see.
                <br />
                <br />
                Actually, just one.
                <br />
                <strong style={{ color: "#fff" }}>
                  What is your email, traveler?
                </strong>
              </p>

              <form onSubmit={handleRequestOTP} noValidate>
                <input
                  type="email"
                  id="bridgekeeper-email"
                  style={{
                    ...styles.input,
                    ...(inputFocused ? styles.inputFocus : {}),
                  }}
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  autoComplete="email"
                  required
                />
                <button
                  type="submit"
                  id="bridgekeeper-send-otp"
                  style={{
                    ...styles.button,
                    ...(btnHovered && !loading ? styles.buttonHover : {}),
                    ...(loading ? styles.buttonDisabled : {}),
                  }}
                  onMouseEnter={() => setBtnHovered(true)}
                  onMouseLeave={() => setBtnHovered(false)}
                  disabled={loading}
                >
                  {loading ? "Sending Code..." : "Send Code"}
                </button>
              </form>
            </>
          ) : (
            <>
              <p style={styles.riddle}>
                A sacred code has been dispatched to
                <br />
                <strong style={{ color: "#fff" }}>{email}</strong>
                <br />
                <br />
                <strong style={{ color: "#fff" }}>
                  Enter the 6-digit code below.
                </strong>
              </p>

              <div style={styles.otpContainer} onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    style={{
                      ...styles.otpDigit,
                      ...(document.activeElement?.id === `otp-${i}`
                        ? styles.otpDigitFocus
                        : {}),
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#e81b2a";
                      e.target.style.background = "rgba(232, 27, 42, 0.05)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(232, 27, 42, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.15)";
                      e.target.style.background = "rgba(255,255,255,0.06)";
                      e.target.style.boxShadow = "none";
                    }}
                    autoFocus={i === 0}
                    disabled={loading}
                  />
                ))}
              </div>

              <p style={styles.infoText}>
                Check your inbox (and spam folder). Code expires in 5 minutes.
              </p>

              <button
                type="button"
                id="bridgekeeper-verify-otp"
                style={{
                  ...styles.button,
                  ...(btnHovered && !loading ? styles.buttonHover : {}),
                  ...(loading ? styles.buttonDisabled : {}),
                }}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                disabled={loading || otp.join("").length !== 6}
                onClick={() => handleVerifyOTP()}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  marginTop: "14px",
                }}
              >
                <button
                  type="button"
                  style={{
                    ...styles.backLink,
                    opacity: cooldown > 0 ? 0.4 : 1,
                    cursor: cooldown > 0 ? "not-allowed" : "pointer",
                  }}
                  onClick={handleResendOTP}
                  disabled={cooldown > 0 || loading}
                >
                  {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
                </button>
                <button
                  type="button"
                  style={styles.backLink}
                  onClick={() => {
                    setStep("email");
                    setOtp(["", "", "", "", "", ""]);
                  }}
                >
                  Change Email
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
