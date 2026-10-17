import React, { useState, useEffect, useRef, useCallback } from "react";
import QRCodeStyling from "qr-code-styling";
import {
  FiLink,
  FiDownload,
  FiCopy,
  FiCheck,
  FiRefreshCw,
  FiSliders,
  FiEye,
  FiLogOut,
} from "react-icons/fi";
import { Input, Dropdown, Button, FormAlert } from "../ui";

const isValidHex = (hex) => {
  if (typeof hex !== "string") return false;
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/i.test(hex.trim());
};

function ColorPickerField({ label, value, onChange, placeholder = "#000000" }) {
  const [isFocused, setIsFocused] = useState(false);

  // Normalize to 6-digit hex for native <input type="color" />
  let safeHex6 = "#000000";
  if (isValidHex(value)) {
    const clean = value.trim();
    if (clean.length === 4) {
      safeHex6 = `#${clean[1]}${clean[1]}${clean[2]}${clean[2]}${clean[3]}${clean[3]}`;
    } else if (clean.length === 7) {
      safeHex6 = clean;
    } else if (clean.length === 9) {
      safeHex6 = clean.slice(0, 7);
    }
  }

  return (
    <fieldset
      style={{
        border: `1px solid ${
          isFocused ? "#eb0028" : "rgba(255, 255, 255, 0.22)"
        }`,
        borderRadius: "8px",
        padding: "6px 12px 8px 14px",
        margin: 0,
        background: "rgba(15, 15, 20, 0.45)",
        boxSizing: "border-box",
        minWidth: 0,
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        boxShadow: isFocused ? "0 0 0 2px rgba(235, 0, 40, 0.2)" : "none",
      }}
    >
      <legend
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.82rem",
          fontWeight: "600",
          color: "#94a3b8",
          padding: "0 6px",
          marginLeft: "2px",
          userSelect: "none",
        }}
      >
        {label}
      </legend>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          height: "30px",
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          spellCheck={false}
          style={{
            flex: 1,
            minWidth: 0,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#ffffff",
            fontFamily: '"Inter", monospace, sans-serif',
            fontSize: "0.95rem",
            fontWeight: "500",
            letterSpacing: "0.5px",
            padding: 0,
          }}
        />

        {/* Color Swatch (rounded rectangle matching reference image) */}
        <div
          style={{
            position: "relative",
            width: "30px",
            height: "26px",
            borderRadius: "6px",
            backgroundColor: isValidHex(value) ? value : placeholder,
            border: "1px solid rgba(255, 255, 255, 0.25)",
            cursor: "pointer",
            flexShrink: 0,
            overflow: "hidden",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          }}
          title={`Click to pick ${label}`}
        >
          <input
            type="color"
            value={safeHex6}
            onChange={(e) => onChange(e.target.value)}
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              opacity: 0,
              cursor: "pointer",
              border: "none",
              padding: 0,
            }}
          />
        </div>
      </div>
    </fieldset>
  );
}

// Custom Shape Selector Icon Button
function StyleIconButton({ active, onClick, title, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "12px",
        border: active
          ? "2px solid #eb0028"
          : hovered
          ? "1px solid rgba(255, 255, 255, 0.28)"
          : "1px solid rgba(255, 255, 255, 0.1)",
        background: active
          ? "#141419"
          : hovered
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(255, 255, 255, 0.03)",
        color: active ? "#ffffff" : hovered ? "#e5e7eb" : "#888890",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: 0,
        boxShadow: active
          ? "0 0 14px rgba(235, 0, 40, 0.35), inset 0 0 8px rgba(235, 0, 40, 0.15)"
          : "none",
        transform: hovered ? "translateY(-1px)" : "none",
      }}
    >
      {children}
    </button>
  );
}

// 1. Dots Square Icon
function DotsSquareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2.5" y="3" width="7" height="4" />
      <rect x="14.5" y="3" width="7" height="4" />
      <rect x="6" y="7" width="4" height="4" />
      <rect x="6" y="11" width="9" height="4" />
      <rect x="11" y="7" width="4" height="4" />
      <rect x="15" y="11" width="4" height="4" />
      <rect x="2.5" y="17" width="12" height="4" />
      <rect x="17.5" y="17" width="4" height="4" />
    </svg>
  );
}

// 2. Dots Rounded Icon
function DotsRoundedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2.5" y="3" width="7" height="4" rx="2" />
      <rect x="14.5" y="3" width="7" height="4" rx="2" />
      <rect x="6" y="7" width="4" height="4" rx="1.5" />
      <rect x="6" y="11" width="9" height="4" rx="2" />
      <rect x="11" y="7" width="4" height="4" rx="1.5" />
      <rect x="15" y="11" width="4" height="4" rx="1.5" />
      <rect x="2.5" y="17" width="12" height="4" rx="2" />
      <rect x="17.5" y="17" width="4" height="4" rx="2" />
    </svg>
  );
}

// 3. Dots Circles Icon
function DotsCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="4.5" cy="5" r="1.6" />
      <circle cx="8.5" cy="5" r="1.6" />
      <circle cx="15.5" cy="5" r="1.6" />
      <circle cx="19.5" cy="5" r="1.6" />
      <circle cx="7" cy="9" r="1.6" />
      <circle cx="13" cy="9" r="1.6" />
      <circle cx="7" cy="13" r="1.6" />
      <circle cx="11" cy="13" r="1.6" />
      <circle cx="15" cy="13" r="1.6" />
      <circle cx="18" cy="13" r="1.6" />
      <circle cx="4.5" cy="19" r="1.6" />
      <circle cx="8.5" cy="19" r="1.6" />
      <circle cx="12.5" cy="19" r="1.6" />
      <circle cx="19.5" cy="19" r="1.6" />
    </svg>
  );
}

// 4. Marker Border Square Icon
function MarkerBorderSquareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" strokeWidth="2.5" />
    </svg>
  );
}

// 5. Marker Border Rounded Icon
function MarkerBorderRoundedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3.5" y="3.5" width="17" height="17" rx="8" strokeWidth="2.5" />
    </svg>
  );
}

// 6. Marker Center Square Icon
function MarkerCenterSquareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <rect x="8.5" y="8.5" width="7" height="7" rx="1.5" fill="currentColor" />
    </svg>
  );
}

// 7. Marker Center Dot Icon
function MarkerCenterDotIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <circle cx="12" cy="12" r="3.8" fill="currentColor" />
    </svg>
  );
}

const styles = {
  card: {
    backgroundColor: "rgba(15, 15, 20, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    padding: "clamp(20px, 4vw, 40px) clamp(16px, 3.5vw, 36px)",
    maxWidth: "650px",
    width: "100%",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow:
      "0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
    fontFamily: '"Inter", sans-serif',
    boxSizing: "border-box",
    position: "relative",
    zIndex: 1,
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "12px",
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
  navBtn: {
    fontFamily: '"Inter", sans-serif',
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#ccc",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.82rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
  },

  subcard: {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    padding: "20px 22px",
    marginBottom: "20px",
    boxSizing: "border-box",
  },
  subcardTitle: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.88rem",
    fontWeight: "700",
    color: "#e5e7eb",
    margin: "0 0 14px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    letterSpacing: "0.3px",
    textTransform: "uppercase",
  },
  previewContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 20px",
    background:
      "radial-gradient(circle at center, rgba(235, 0, 40, 0.04) 0%, rgba(10, 10, 14, 0.6) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "14px",
    margin: "20px 0",
  },
  canvasWrapper: {
    padding: "16px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    maxWidth: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  actionRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "10px",
    marginTop: "16px",
  },
  styleGroupTitle: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.82rem",
    fontWeight: "600",
    color: "#d0d4dc",
    letterSpacing: "0.2px",
    marginBottom: "8px",
  },
};

export default function QRCodeGenerator({ onLogout, name, team, onBack }) {
  // Destination URL
  const [url, setUrl] = useState("https://www.tedxpvgcoet.in/");

  // Customization options (colors match reference style)
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [includeLogo, setIncludeLogo] = useState(true);
  const [exportSize, setExportSize] = useState(512);

  // Shape & Style States
  const [dotStyle, setDotStyle] = useState("square"); // "square" | "rounded" | "dots"
  const [cornerSquareStyle, setCornerSquareStyle] = useState("square"); // "square" | "extra-rounded"
  const [cornerDotStyle, setCornerDotStyle] = useState("square"); // "square" | "dot"

  const safeDark = isValidHex(qrColor) ? qrColor : "#000000";
  const safeLight = isValidHex(bgColor) ? bgColor : "#ffffff";

  const handleColorChange = (setter) => (val) => {
    let clean = val;
    if (clean && !clean.startsWith("#") && /^[0-9A-Fa-f]{3,8}$/.test(clean)) {
      clean = "#" + clean;
    }
    setter(clean);
  };

  // Status & copy
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [showOptions, setShowOptions] = useState(true);

  const canvasRef = useRef(null);
  const qrCodeRef = useRef(null);

  // Compute final QR payload string (URL only)
  const computePayload = () => {
    return url.trim() || "https://www.tedxpvgcoet.in/";
  };

  const payload = computePayload();

  // Curved badge data URL for center TEDx logo
  const [curvedLogoUrl, setCurvedLogoUrl] = useState("");

  useEffect(() => {
    let isCancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `${process.env.PUBLIC_URL || ""}/tedx-logo.png`;

    const generateCurvedBadge = () => {
      try {
        const size = 512;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const borderW = 12;
        const offset = borderW / 2;
        const badgeSize = size - borderW;
        const radius = badgeSize * 0.24; // Smooth curved corners
        const innerPad = size * 0.14; // Padding inside curved border

        ctx.clearRect(0, 0, size, size);

        // Path generator for curved corners
        const makeCurvedPath = () => {
          ctx.beginPath();
          ctx.moveTo(offset + radius, offset);
          ctx.lineTo(offset + badgeSize - radius, offset);
          ctx.arcTo(
            offset + badgeSize,
            offset,
            offset + badgeSize,
            offset + radius,
            radius
          );
          ctx.lineTo(offset + badgeSize, offset + badgeSize - radius);
          ctx.arcTo(
            offset + badgeSize,
            offset + badgeSize,
            offset + badgeSize - radius,
            offset + badgeSize,
            radius
          );
          ctx.lineTo(offset + radius, offset + badgeSize);
          ctx.arcTo(
            offset,
            offset + badgeSize,
            offset,
            offset + badgeSize - radius,
            radius
          );
          ctx.lineTo(offset, offset + radius);
          ctx.arcTo(offset, offset, offset + radius, offset, radius);
          ctx.closePath();
        };

        // Fill background plate matching QR background
        makeCurvedPath();
        ctx.fillStyle = safeLight;
        ctx.fill();

        // Clip to curved shape and draw logo centered
        ctx.save();
        makeCurvedPath();
        ctx.clip();
        ctx.drawImage(
          img,
          innerPad,
          innerPad,
          size - innerPad * 2,
          size - innerPad * 2
        );
        ctx.restore();

        // Draw curved border with TEDx red accent
        makeCurvedPath();
        ctx.strokeStyle = "rgba(235, 0, 40, 0.55)";
        ctx.lineWidth = borderW;
        ctx.stroke();

        if (!isCancelled) {
          setCurvedLogoUrl(canvas.toDataURL("image/png"));
        }
      } catch (err) {
        console.error("Error creating curved logo badge:", err);
        if (!isCancelled) {
          setCurvedLogoUrl(`${process.env.PUBLIC_URL || ""}/tedx-logo.png`);
        }
      }
    };

    if (img.complete) {
      generateCurvedBadge();
    } else {
      img.onload = generateCurvedBadge;
      img.onerror = () => {
        if (!isCancelled) {
          setCurvedLogoUrl(`${process.env.PUBLIC_URL || ""}/tedx-logo.png`);
        }
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [safeLight]);

  // Helper to generate QRCodeStyling options
  const getQRConfig = useCallback(
    (size, type = "canvas") => ({
      width: size,
      height: size,
      type,
      data: payload,
      image: includeLogo
        ? curvedLogoUrl || `${process.env.PUBLIC_URL || ""}/tedx-logo.png`
        : "",
      dotsOptions: {
        color: safeDark,
        type: dotStyle,
      },
      cornersSquareOptions: {
        color: safeDark,
        type: cornerSquareStyle,
      },
      cornersDotOptions: {
        color: safeDark,
        type: cornerDotStyle,
      },
      backgroundOptions: {
        color: safeLight,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: Math.max(3, Math.round(size * 0.012)),
        imageSize: 0.35,
        hideBackgroundDots: true,
      },
      qrOptions: {
        errorCorrectionLevel: "H",
      },
    }),
    [
      payload,
      includeLogo,
      curvedLogoUrl,
      safeDark,
      dotStyle,
      cornerSquareStyle,
      cornerDotStyle,
      safeLight,
    ]
  );

  // Render QR Code onto DOM container
  useEffect(() => {
    if (!canvasRef.current) return;
    try {
      const qrCode = new QRCodeStyling(getQRConfig(260, "canvas"));
      canvasRef.current.innerHTML = "";
      qrCode.append(canvasRef.current);
      qrCodeRef.current = qrCode;

      const canvasEl = canvasRef.current.querySelector("canvas");
      if (canvasEl) {
        canvasEl.style.maxWidth = "100%";
        canvasEl.style.height = "auto";
        canvasEl.style.display = "block";
      }
    } catch (err) {
      console.error("QR Code styling render error:", err);
      setStatus({
        type: "error",
        message: "Failed to render QR Code preview.",
      });
    }
  }, [getQRConfig]);

  // Download high-resolution PNG
  const handleDownloadPNG = async () => {
    try {
      const qrExport = new QRCodeStyling(getQRConfig(exportSize, "canvas"));
      await qrExport.download({
        name: `TEDxPVGCOETM_QR_${Date.now()}`,
        extension: "png",
      });
      setStatus({
        type: "success",
        message: "High-resolution PNG downloaded successfully!",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Download failed. Please try again.",
      });
    }
  };

  // Download SVG format
  const handleDownloadSVG = async () => {
    try {
      const qrExport = new QRCodeStyling(getQRConfig(exportSize, "svg"));
      await qrExport.download({
        name: `TEDxPVGCOETM_QR_${Date.now()}`,
        extension: "svg",
      });
      setStatus({
        type: "success",
        message: "Vector SVG downloaded successfully!",
      });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "SVG download failed." });
    }
  };

  // Copy Image to Clipboard
  const handleCopyImage = async () => {
    try {
      if (qrCodeRef.current) {
        const blob = await qrCodeRef.current.getRawData("png");
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
          setStatus({
            type: "success",
            message: "QR code image copied to clipboard!",
          });
          return;
        }
      }
      const canvasEl = canvasRef.current?.querySelector("canvas");
      if (canvasEl) {
        canvasEl.toBlob(async (blob) => {
          if (!blob) return;
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
          setStatus({
            type: "success",
            message: "QR code image copied to clipboard!",
          });
        });
        return;
      }
    } catch (err) {
      try {
        await navigator.clipboard.writeText(payload);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        setStatus({
          type: "success",
          message: "URL copied to clipboard!",
        });
      } catch (e) {
        setStatus({
          type: "error",
          message: "Clipboard copy not supported by browser.",
        });
      }
    }
  };

  const handleReset = () => {
    setUrl("https://www.tedxpvgcoet.in/");
    setQrColor("#000000");
    setBgColor("#ffffff");
    setDotStyle("square");
    setCornerSquareStyle("square");
    setCornerDotStyle("square");
    setIncludeLogo(true);
    setStatus({ type: "", message: "" });
  };

  return (
    <div id="qr-generator-section" style={styles.card} className="qr-card">
      {/* Header Row */}
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.title}>QR Generator</h2>
          <p style={styles.subtitle}>
            Create branded TEDx QR codes for events, passes & links
          </p>
          {name && (
            <span
              style={{
                fontSize: "0.75rem",
                color: "#888",
                display: "inline-block",
                marginTop: "4px",
              }}
            >
              Logged in as <strong style={{ color: "#ddd" }}>{name}</strong>
              {team ? ` (${team} Team)` : ""}
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {onBack && (
            <button
              type="button"
              style={styles.navBtn}
              onClick={onBack}
              title="Back to portal"
            >
              Back
            </button>
          )}
          <button
            type="button"
            style={styles.navBtn}
            onClick={handleReset}
            title="Reset fields to defaults"
          >
            <FiRefreshCw size={13} /> Reset
          </button>
          {onLogout && (
            <button
              type="button"
              style={{
                ...styles.navBtn,
                color: "#e81b2a",
                borderColor: "rgba(232, 27, 42, 0.3)",
              }}
              onClick={onLogout}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(232, 27, 42, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              }}
              title="Log out of session"
            >
              <FiLogOut size={13} /> Log out
            </button>
          )}
        </div>
      </div>

      {status.message && (
        <div style={{ marginBottom: "20px" }}>
          <FormAlert
            type={status.type}
            message={status.message}
            onClose={() => setStatus({ type: "", message: "" })}
            autoDismissMs={4000}
          />
        </div>
      )}

      {/* Content Input */}
      <div style={styles.subcard}>
        <div style={styles.subcardTitle}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FiLink size={14} color="#eb0028" />
            <span>Destination Link / URL</span>
          </span>
          <span style={{ fontSize: "0.75rem", color: "#888", fontWeight: 400 }}>
            {payload.length} chars
          </span>
        </div>

        <div>
          <Input
            label="Website or Destination URL"
            type="url"
            placeholder="https://tedxpvgcoet.in/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
          />
        </div>
      </div>

      {/* Customization Toggle & Controls */}
      <div style={styles.subcard}>
        <div
          style={{
            ...styles.subcardTitle,
            cursor: "pointer",
            marginBottom: showOptions ? "14px" : "0",
          }}
          onClick={() => setShowOptions(!showOptions)}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FiSliders size={14} color="#eb0028" />
            <span>Theme & Style Settings</span>
          </span>
          <span style={{ fontSize: "0.8rem", color: "#eb0028" }}>
            {showOptions ? "▲ Hide" : "▼ Customize"}
          </span>
        </div>

        {showOptions && (
          <div>
            {/* Color Palette (QR Code Color & Background Color) */}
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "14px",
                }}
              >
                <ColorPickerField
                  label="QR Code Color"
                  value={qrColor}
                  onChange={handleColorChange(setQrColor)}
                  placeholder="#000000"
                />
                <ColorPickerField
                  label="Background Color"
                  value={bgColor}
                  onChange={handleColorChange(setBgColor)}
                  placeholder="#ffffff"
                />
              </div>
            </div>

            {/* Shape Customization Options (Dots, Marker Border, Marker Center) */}
            <div
              style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "18px",
                }}
              >
                {/* 1. Dots Pattern */}
                <div>
                  <div style={styles.styleGroupTitle}>Dots</div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <StyleIconButton
                      active={dotStyle === "square"}
                      onClick={() => setDotStyle("square")}
                      title="Square Dots"
                    >
                      <DotsSquareIcon />
                    </StyleIconButton>
                    <StyleIconButton
                      active={dotStyle === "rounded"}
                      onClick={() => setDotStyle("rounded")}
                      title="Rounded Dots"
                    >
                      <DotsRoundedIcon />
                    </StyleIconButton>
                    <StyleIconButton
                      active={dotStyle === "dots"}
                      onClick={() => setDotStyle("dots")}
                      title="Circular Dots"
                    >
                      <DotsCircleIcon />
                    </StyleIconButton>
                  </div>
                </div>

                {/* 2. Marker Border */}
                <div>
                  <div style={styles.styleGroupTitle}>Marker border</div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <StyleIconButton
                      active={cornerSquareStyle === "square"}
                      onClick={() => setCornerSquareStyle("square")}
                      title="Square Marker Border"
                    >
                      <MarkerBorderSquareIcon />
                    </StyleIconButton>
                    <StyleIconButton
                      active={cornerSquareStyle === "extra-rounded"}
                      onClick={() => setCornerSquareStyle("extra-rounded")}
                      title="Rounded Marker Border"
                    >
                      <MarkerBorderRoundedIcon />
                    </StyleIconButton>
                  </div>
                </div>

                {/* 3. Marker Center */}
                <div>
                  <div style={styles.styleGroupTitle}>Marker center</div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <StyleIconButton
                      active={cornerDotStyle === "square"}
                      onClick={() => setCornerDotStyle("square")}
                      title="Square Marker Center"
                    >
                      <MarkerCenterSquareIcon />
                    </StyleIconButton>
                    <StyleIconButton
                      active={cornerDotStyle === "dot"}
                      onClick={() => setCornerDotStyle("dot")}
                      title="Circle Marker Center"
                    >
                      <MarkerCenterDotIcon />
                    </StyleIconButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Badging & Quality Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "14px",
                marginTop: "14px",
                paddingTop: "14px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Center Logo Toggle */}
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    color: "#ddd",
                    fontSize: "0.85rem",
                    userSelect: "none",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={includeLogo}
                    onChange={(e) => setIncludeLogo(e.target.checked)}
                    style={{
                      accentColor: "#eb0028",
                      width: "16px",
                      height: "16px",
                    }}
                  />
                  <span>Center TEDx Logo</span>
                </label>
                <p
                  style={{
                    margin: "4px 0 0 24px",
                    fontSize: "0.72rem",
                    color: "#888",
                  }}
                >
                  Adds official TEDx logo in the center (scans reliably)
                </p>
              </div>

              {/* Resolution Dropdown */}
              <div>
                <Dropdown
                  label="Download Resolution"
                  value={String(exportSize)}
                  onChange={(e) => setExportSize(Number(e.target.value))}
                  options={[
                    { label: "Standard (512px)", value: "512" },
                    { label: "Print Ready (1024px)", value: "1024" },
                    { label: "Compact Web (256px)", value: "256" },
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Live Preview Card */}
      <div style={styles.previewContainer}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "14px",
          }}
        >
          <FiEye size={14} color="#eb0028" />
          <span
            style={{
              fontSize: "0.8rem",
              color: "#aaa",
              fontWeight: 600,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Live QR Preview
          </span>
        </div>

        <div
          style={{
            ...styles.canvasWrapper,
            background: safeLight,
          }}
        >
          <div
            ref={canvasRef}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>

        <p
          style={{
            margin: "14px 0 0 0",
            fontSize: "0.75rem",
            color: "#888",
            textAlign: "center",
            maxWidth: "320px",
            wordBreak: "break-all",
          }}
        >
          {payload.length > 50 ? `${payload.substring(0, 50)}...` : payload}
        </p>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionRow}>
        <Button
          type="button"
          variant="primary"
          size="md"
          fullWidth
          onClick={handleDownloadPNG}
          icon={<FiDownload size={15} />}
        >
          Download PNG
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="md"
          fullWidth
          onClick={handleCopyImage}
          icon={
            copied ? (
              <FiCheck size={15} color="#10b981" />
            ) : (
              <FiCopy size={15} />
            )
          }
        >
          {copied ? "Copied!" : "Copy Image"}
        </Button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button
          type="button"
          onClick={handleDownloadSVG}
          style={{
            width: "100%",
            background: "transparent",
            border: "1px dashed rgba(255, 255, 255, 0.15)",
            color: "#aaa",
            padding: "8px 14px",
            borderRadius: "8px",
            fontSize: "0.8rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "rgba(235, 0, 40, 0.5)";
            e.target.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.15)";
            e.target.style.color = "#aaa";
          }}
        >
          <FiDownload size={13} />
          <span>Export as Vector SVG (For Posters & Print Media)</span>
        </button>
      </div>
    </div>
  );
}
