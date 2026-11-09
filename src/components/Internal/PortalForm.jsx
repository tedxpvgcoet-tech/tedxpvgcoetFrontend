import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import bgVideo from "../../assets/backgrounds/background.mp4";
import { Input, Button, FormAlert } from "../ui";
import PwaInstallButton from "./PwaInstallButton";

const styles = {
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
    alignItems: "flex-start",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    boxSizing: "border-box",
    padding: "140px 20px 80px",
  },
  card: {
    backgroundColor: "rgba(15, 15, 20, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    padding: "40px 36px",
    maxWidth: "650px",
    width: "100%",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow:
      "0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
    fontFamily: '"Inter", sans-serif',
    animation: "dropIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    boxSizing: "border-box",
  },
  headerRow: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "32px",
  },
  title: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "clamp(1.5rem, 6vw, 2.2rem)",
    fontWeight: "800",
    background: "linear-gradient(135deg, #ff2a2a 0%, #a80000 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0 0 4px 0",
    letterSpacing: "-0.5px",
    textTransform: "uppercase",
  },
  subtitle: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.9rem",
    color: "#a0a0a0",
    margin: 0,
    fontWeight: "400",
  },
  resetBtn: {
    fontFamily: '"Inter", sans-serif',
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#ccc",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.82rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
  },
};

/**
 * Generic reusable form for the internal portal.
 *
 * Props:
 *  - title        : string — form heading
 *  - subtitle     : string — description below heading
 *  - fields       : array  — [{ key, label, type?, placeholder?, required?, note? }]
 *                            type can be "text", "url", "checkbox", etc.
 *  - endpoint     : string — API path e.g. "/profile"
 *  - submitLabel  : string — button text (default "Submit")
 *  - successMsg   : string — message on success
 *  - authToken, name, team, onBack, onLogout — standard portal props
 */
export default function PortalForm({
  title = "Form",
  subtitle = "",
  fields = [],
  endpoint = "/profile",
  submitLabel = "Submit",
  successMsg = "Submitted successfully!",
  authToken,
  name,
  team,
  onBack,
  onLogout,
}) {
  // Build initial state from fields config
  const buildInitial = () => {
    const state = {};
    fields.forEach((f) => (state[f.key] = f.type === "checkbox" ? false : ""));
    return state;
  };

  const [formData, setFormData] = useState(buildInitial);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [statusKey, setStatusKey] = useState(0);
  const statusTimerRef = useRef(null);
  const statusRef = useRef(null);

  const setAutoStatus = (statusObj, autoDismissMs = 0) => {
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    setStatus(statusObj);
    setStatusKey((prev) => prev + 1);
    if (autoDismissMs > 0) {
      statusTimerRef.current = setTimeout(
        () => setStatus({ type: "", message: "" }),
        autoDismissMs,
      );
    }
    setTimeout(() => {
      if (statusRef.current) {
        statusRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 50);
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields (skip checkboxes)
    const requiredFields = fields.filter((f) => f.required === true);
    for (const f of requiredFields) {
      if (f.type === "checkbox") continue;
      if (!formData[f.key]?.trim()) {
        setAutoStatus({
          type: "error",
          message: `${f.label} is required.`,
        });
        return;
      }
    }

    setLoading(true);
    setAutoStatus({ type: "info", message: "Submitting..." });

    let API_URL = "https://www.backend.tedxpvgcoet.in";
    try {
      if (import.meta.env.VITE_BACKEND_URL)
        API_URL = import.meta.env.VITE_BACKEND_URL;
    } catch (e) {}
    try {
      if (process.env.REACT_APP_BACKEND_URL)
        API_URL = process.env.REACT_APP_BACKEND_URL;
    } catch (e) {}

    try {
      // Build payload from form data
      const payload = {};
      fields.forEach((f) => {
        if (f.type === "checkbox") {
          payload[f.key] = !!formData[f.key];
        } else {
          payload[f.key] = (formData[f.key] || "").trim();
        }
      });

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAutoStatus({ type: "success", message: successMsg }, 6000);
        setFormData(buildInitial());
      } else {
        setAutoStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      setAutoStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }

    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      <Helmet defer={false}>
        <title>{title} | TEDxPVGCOETM</title>
      </Helmet>
      <style>{`
        @keyframes dropIn {
          0% { opacity: 0; transform: translateY(-30px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .hero-video1 {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          z-index: 0;
          filter: brightness(0.7);
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
        @media (max-width: 600px) {
            .portal-form-card { padding: 24px 16px !important; }
            .portal-form-header {
                flex-direction: column !important;
                gap: 16px !important;
                align-items: flex-start !important;
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

      <div style={styles.pageContainer}>
        <div style={styles.card} className="portal-form-card">
          <div style={styles.headerRow} className="portal-form-header">
            <div>
              <h1 style={styles.title}>{title}</h1>
              {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {onBack && (
                <button
                  type="button"
                  style={styles.resetBtn}
                  onClick={onBack}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.1)";
                    e.target.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.05)";
                    e.target.style.color = "#ccc";
                  }}
                >
                  Back
                </button>
              )}
              {onLogout && (
                <button
                  type="button"
                  style={styles.resetBtn}
                  onClick={onLogout}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.1)";
                    e.target.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.05)";
                    e.target.style.color = "#ccc";
                  }}
                >
                  Sign Out
                </button>
              )}
              <PwaInstallButton />
            </div>
          </div>

          {/* Locked user info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 18px",
              background: "rgba(232, 27, 42, 0.06)",
              border: "1px solid rgba(232, 27, 42, 0.15)",
              borderRadius: "10px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(232, 27, 42, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                flexShrink: 0,
              }}
            >
              🔒
            </div>
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  fontFamily: '"Inter", sans-serif',
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {name}
              </div>
              <div
                style={{
                  color: "#e81b2a",
                  fontSize: "0.78rem",
                  fontWeight: "600",
                  fontFamily: '"Inter", sans-serif',
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {team}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div
              style={{
                margin: "10px 0 25px",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 50%, transparent)",
              }}
            />

            {fields.map((field) => {
              // Hide field if its hideWhen key is truthy
              if (field.hideWhen && formData[field.hideWhen]) return null;
              return (
                <div key={field.key} style={{ marginBottom: "20px" }}>
                  {field.type === "checkbox" ? (
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: loading ? "default" : "pointer",
                        color: "#ccc",
                        fontSize: "0.92rem",
                        fontFamily: '"Inter", sans-serif',
                        padding: "10px 0",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!!formData[field.key]}
                        disabled={loading}
                        onChange={(e) =>
                          handleChange(field.key, e.target.checked)
                        }
                        style={{
                          width: "18px",
                          height: "18px",
                          accentColor: "#e81b2a",
                          cursor: loading ? "default" : "pointer",
                        }}
                      />
                      {field.label}
                    </label>
                  ) : (
                    <Input
                      label={field.label}
                      type={field.type || "text"}
                      value={formData[field.key]}
                      disabled={loading}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder || ""}
                      required={field.required === true}
                      fullWidth
                    />
                  )}
                  {field.note && (
                    <p
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "0.78rem",
                        color: "#888",
                        marginTop: "6px",
                        lineHeight: "1.4",
                        margin: "6px 0 0 0",
                      }}
                    >
                      {field.note}
                    </p>
                  )}
                </div>
              );
            })}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              loadingText="Submitting..."
              disabled={loading}
            >
              {submitLabel}
            </Button>
          </form>

          {status.message && (
            <div ref={statusRef} style={{ marginTop: "20px" }}>
              <FormAlert
                key={statusKey}
                type={status.type || "info"}
                message={status.message}
                onClose={() => setStatus({ type: "", message: "" })}
                scrollIntoView
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
