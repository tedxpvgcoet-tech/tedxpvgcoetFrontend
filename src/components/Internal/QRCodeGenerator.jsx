import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import {
  FiLink,
  FiFileText,
  FiCreditCard,
  FiMessageSquare,
  FiMail,
  FiWifi,
  FiDownload,
  FiCopy,
  FiCheck,
  FiRefreshCw,
  FiSliders,
  FiEye,
  FiLogOut,
} from "react-icons/fi";
import { Input, Textarea, Dropdown, Button, FormAlert } from "../ui";

const QR_TYPES = [
  { id: "url", label: "Link / URL", icon: <FiLink size={14} /> },
  { id: "text", label: "Plain Text", icon: <FiFileText size={14} /> },
  { id: "upi", label: "UPI Pay", icon: <FiCreditCard size={14} /> },
  { id: "whatsapp", label: "WhatsApp", icon: <FiMessageSquare size={14} /> },
  { id: "email", label: "Email", icon: <FiMail size={14} /> },
  { id: "wifi", label: "Wi-Fi", icon: <FiWifi size={14} /> },
];

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
  typeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
    gap: "8px",
    marginBottom: "24px",
  },
  typeBtn: {
    fontFamily: '"Inter", sans-serif',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "10px 6px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    background: "rgba(255, 255, 255, 0.03)",
    color: "#aaa",
    fontSize: "0.78rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.25s ease",
    userSelect: "none",
  },
  typeBtnActive: {
    background: "rgba(235, 0, 40, 0.15)",
    borderColor: "rgba(235, 0, 40, 0.5)",
    color: "#ffffff",
    boxShadow: "0 0 14px rgba(235, 0, 40, 0.25)",
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
};

export default function QRCodeGenerator({ onLogout, name, team, onBack }) {
  const [activeType, setActiveType] = useState("url");

  // Form states per type
  const [url, setUrl] = useState("https://www.tedxpvgcoet.in/");
  const [plainText, setPlainText] = useState("");
  const [upiData, setUpiData] = useState({
    id: "tedxpvgcoet@okhdfcbank",
    name: "TEDxPVGCOETM",
    amount: "",
    note: "Event Registration",
  });
  const [waData, setWaData] = useState({
    phone: "919876543210",
    message: "Hi! I am interested in TEDxPVGCOETM.",
  });
  const [emailData, setEmailData] = useState({
    email: "tedx@pvgcoet.ac.in",
    subject: "TEDxPVGCOETM Enquiry",
    body: "Hello Team,",
  });
  const [wifiData, setWifiData] = useState({
    ssid: "TEDx_Guest",
    password: "",
    encryption: "WPA",
  });

  // Customization options (colors match reference style)
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [includeLogo, setIncludeLogo] = useState(true);
  const errorCorrection = "H";
  const [exportSize, setExportSize] = useState(512);

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

  // Compute final QR payload string based on active type
  const computePayload = () => {
    switch (activeType) {
      case "url":
        return url.trim() || "https://www.tedxpvgcoet.in/";
      case "text":
        return plainText.trim() || "TEDxPVGCOETM - Ideas Worth Spreading";
      case "upi": {
        const vpa = upiData.id.trim();
        const pn = encodeURIComponent(upiData.name.trim() || "TEDxPVGCOETM");
        const am = upiData.amount.trim();
        const tn = encodeURIComponent(upiData.note.trim() || "Payment");
        let upiUri = `upi://pay?pa=${vpa}&pn=${pn}&tn=${tn}`;
        if (am && Number(am) > 0) upiUri += `&am=${am}`;
        return upiUri;
      }
      case "whatsapp": {
        const cleanPhone = waData.phone.replace(/[^0-9]/g, "");
        const textParam = encodeURIComponent(waData.message.trim());
        return `https://wa.me/${cleanPhone}?text=${textParam}`;
      }
      case "email": {
        const mailTo = emailData.email.trim();
        const sub = encodeURIComponent(emailData.subject.trim());
        const body = encodeURIComponent(emailData.body.trim());
        return `mailto:${mailTo}?subject=${sub}&body=${body}`;
      }
      case "wifi": {
        const { ssid, password, encryption } = wifiData;
        return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
      }
      default:
        return "https://www.tedxpvgcoet.in/";
    }
  };

  const payload = computePayload();

  // Cache and load public/tedx-logo.png
  const loadLogoImage = () => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL || ""}/tedx-logo.png`;
      if (img.complete) {
        resolve(img);
      } else {
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
      }
    });
  };

  // Helper to draw rounded rect on canvas
  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // Draw QR onto canvas
  useEffect(() => {
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderQR = async () => {
      try {
        await QRCode.toCanvas(canvas, payload, {
          width: 260,
          margin: 2,
          errorCorrectionLevel: includeLogo ? "H" : errorCorrection,
          color: {
            dark: safeDark,
            light: safeLight,
          },
        });

        if (isCancelled) return;

        // Draw central tedx-logo.png badge if enabled
        if (includeLogo) {
          const img = await loadLogoImage();
          if (isCancelled) return;

          const ctx = canvas.getContext("2d");
          const size = canvas.width;
          const badgeSize = size * 0.24;
          const badgeX = (size - badgeSize) / 2;
          const badgeY = (size - badgeSize) / 2;
          const radius = badgeSize * 0.2;

          ctx.save();
          // Clean background plate matching QR background
          ctx.fillStyle = safeLight;
          ctx.strokeStyle = "rgba(235, 0, 40, 0.45)";
          ctx.lineWidth = 2;

          drawRoundedRect(ctx, badgeX, badgeY, badgeSize, badgeSize, radius);
          ctx.fill();
          ctx.stroke();

          // Draw tedx-logo.png in the center
          const innerPad = badgeSize * 0.12;
          ctx.drawImage(
            img,
            badgeX + innerPad,
            badgeY + innerPad,
            badgeSize - innerPad * 2,
            badgeSize - innerPad * 2,
          );
          ctx.restore();
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("QR Code generation error:", error);
          setStatus({
            type: "error",
            message: "Failed to generate QR code for this content.",
          });
        }
      }
    };

    renderQR();

    return () => {
      isCancelled = true;
    };
  }, [payload, safeDark, safeLight, includeLogo, errorCorrection]);

  // Download high-resolution PNG
  const handleDownloadPNG = async () => {
    try {
      const tempCanvas = document.createElement("canvas");
      await QRCode.toCanvas(tempCanvas, payload, {
        width: exportSize,
        margin: 2,
        errorCorrectionLevel: includeLogo ? "H" : errorCorrection,
        color: {
          dark: safeDark,
          light: safeLight,
        },
      });

      if (includeLogo) {
        const img = await loadLogoImage();
        const ctx = tempCanvas.getContext("2d");
        const size = tempCanvas.width;
        const badgeSize = size * 0.24;
        const badgeX = (size - badgeSize) / 2;
        const badgeY = (size - badgeSize) / 2;
        const radius = badgeSize * 0.2;

        ctx.save();
        ctx.fillStyle = safeLight;
        ctx.strokeStyle = "rgba(235, 0, 40, 0.45)";
        ctx.lineWidth = Math.max(2, size * 0.006);

        drawRoundedRect(ctx, badgeX, badgeY, badgeSize, badgeSize, radius);
        ctx.fill();
        ctx.stroke();

        const innerPad = badgeSize * 0.12;
        ctx.drawImage(
          img,
          badgeX + innerPad,
          badgeY + innerPad,
          badgeSize - innerPad * 2,
          badgeSize - innerPad * 2,
        );
        ctx.restore();
      }

      const link = document.createElement("a");
      link.download = `TEDxPVGCOETM_QR_${activeType}_${Date.now()}.png`;
      link.href = tempCanvas.toDataURL("image/png");
      link.click();

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
      let svgString = await QRCode.toString(payload, {
        type: "svg",
        margin: 2,
        errorCorrectionLevel: includeLogo ? "H" : errorCorrection,
        color: {
          dark: safeDark,
          light: safeLight,
        },
      });

      if (includeLogo) {
        const img = await loadLogoImage();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth || 200;
        c.height = img.naturalHeight || 200;
        const cCtx = c.getContext("2d");
        cCtx.drawImage(img, 0, 0);
        const logoDataUrl = c.toDataURL("image/png");

        const viewBoxMatch = svgString.match(/viewBox="0 0 (\d+) (\d+)"/);
        if (viewBoxMatch) {
          const svgDim = Number(viewBoxMatch[1]);
          const badgeSize = svgDim * 0.24;
          const badgeX = (svgDim - badgeSize) / 2;
          const badgeY = (svgDim - badgeSize) / 2;
          const bgFill = safeLight;
          const radius = badgeSize * 0.2;
          const innerPad = badgeSize * 0.12;
          const imgSize = badgeSize - innerPad * 2;
          const imgX = badgeX + innerPad;
          const imgY = badgeY + innerPad;

          const centerBadgeSvg = `
            <rect x="${badgeX}" y="${badgeY}" width="${badgeSize}" height="${badgeSize}" rx="${radius}" fill="${bgFill}" stroke="#eb0028" stroke-width="${Math.max(0.5, svgDim * 0.005)}" />
            <image href="${logoDataUrl}" x="${imgX}" y="${imgY}" width="${imgSize}" height="${imgSize}" />
          `;
          svgString = svgString.replace("</svg>", `${centerBadgeSvg}</svg>`);
        }
      }

      const blob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const link = document.createElement("a");
      link.download = `TEDxPVGCOETM_QR_${activeType}_${Date.now()}.svg`;
      link.href = URL.createObjectURL(blob);
      link.click();

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
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } catch (err) {
      // Fallback: Copy raw payload text
      try {
        await navigator.clipboard.writeText(payload);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (e) {
        setStatus({
          type: "error",
          message: "Clipboard copy not supported by browser.",
        });
      }
    }
  };

  const handleReset = () => {
    setActiveType("url");
    setUrl("https://www.tedxpvgcoet.in/");
    setPlainText("");
    setUpiData({
      id: "tedxpvgcoet@okhdfcbank",
      name: "TEDxPVGCOETM",
      amount: "",
      note: "Event Registration",
    });
    setQrColor("#000000");
    setBgColor("#ffffff");
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

      {/* Type Selector Pills */}
      <div style={styles.typeGrid}>
        {QR_TYPES.map((t) => {
          const isActive = activeType === t.id;
          return (
            <button
              key={t.id}
              type="button"
              style={{
                ...styles.typeBtn,
                ...(isActive ? styles.typeBtnActive : {}),
              }}
              onClick={() => setActiveType(t.id)}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Inputs per Type */}
      <div style={styles.subcard}>
        <div style={styles.subcardTitle}>
          <span>Content Details</span>
          <span style={{ fontSize: "0.75rem", color: "#888", fontWeight: 400 }}>
            {payload.length} chars
          </span>
        </div>

        {/* 1. URL */}
        {activeType === "url" && (
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
        )}

        {/* 2. Plain Text */}
        {activeType === "text" && (
          <Textarea
            label="Plain Text / Announcement"
            placeholder="Enter announcement text, quote, or details..."
            rows={4}
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            fullWidth
          />
        )}

        {/* 3. UPI Pay */}
        {activeType === "upi" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <Input
                label="UPI ID / VPA *"
                type="text"
                placeholder="name@upi"
                value={upiData.id}
                onChange={(e) => setUpiData({ ...upiData, id: e.target.value })}
              />
              <Input
                label="Payee Name"
                type="text"
                placeholder="TEDxPVGCOETM"
                value={upiData.name}
                onChange={(e) =>
                  setUpiData({ ...upiData, name: e.target.value })
                }
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginTop: "12px",
              }}
            >
              <Input
                label="Amount in ₹ (Optional)"
                type="number"
                placeholder="e.g. 500"
                value={upiData.amount}
                onChange={(e) =>
                  setUpiData({ ...upiData, amount: e.target.value })
                }
              />
              <Input
                label="Payment Note"
                type="text"
                placeholder="Registration / Pass"
                value={upiData.note}
                onChange={(e) =>
                  setUpiData({ ...upiData, note: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {/* 4. WhatsApp */}
        {activeType === "whatsapp" && (
          <div>
            <Input
              label="Phone Number (With Country Code) *"
              type="tel"
              placeholder="e.g. 919876543210"
              value={waData.phone}
              onChange={(e) => setWaData({ ...waData, phone: e.target.value })}
              fullWidth
            />
            <div style={{ marginTop: "12px" }}>
              <Textarea
                label="Pre-filled Message"
                placeholder="Message that opens in chat..."
                rows={2}
                value={waData.message}
                onChange={(e) =>
                  setWaData({ ...waData, message: e.target.value })
                }
                fullWidth
              />
            </div>
          </div>
        )}

        {/* 5. Email */}
        {activeType === "email" && (
          <div>
            <Input
              label="Recipient Email Address *"
              type="email"
              placeholder="team@tedxpvgcoet.in"
              value={emailData.email}
              onChange={(e) =>
                setEmailData({ ...emailData, email: e.target.value })
              }
              fullWidth
            />
            <div style={{ marginTop: "12px" }}>
              <Input
                label="Subject"
                type="text"
                placeholder="Event Inquiry"
                value={emailData.subject}
                onChange={(e) =>
                  setEmailData({ ...emailData, subject: e.target.value })
                }
                fullWidth
              />
            </div>
            <div style={{ marginTop: "12px" }}>
              <Textarea
                label="Email Body"
                placeholder="Default message text..."
                rows={2}
                value={emailData.body}
                onChange={(e) =>
                  setEmailData({ ...emailData, body: e.target.value })
                }
                fullWidth
              />
            </div>
          </div>
        )}

        {/* 6. Wi-Fi */}
        {activeType === "wifi" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <Input
                label="Network SSID *"
                type="text"
                placeholder="Network Name"
                value={wifiData.ssid}
                onChange={(e) =>
                  setWifiData({ ...wifiData, ssid: e.target.value })
                }
              />
              <Dropdown
                label="Security"
                value={wifiData.encryption}
                onChange={(e) =>
                  setWifiData({ ...wifiData, encryption: e.target.value })
                }
                options={[
                  { label: "WPA/WPA2", value: "WPA" },
                  { label: "WEP", value: "WEP" },
                  { label: "None / Open", value: "nopass" },
                ]}
              />
            </div>
            <div style={{ marginTop: "12px" }}>
              <Input
                label="Wi-Fi Password"
                type="text"
                placeholder="Password"
                value={wifiData.password}
                onChange={(e) =>
                  setWifiData({ ...wifiData, password: e.target.value })
                }
                fullWidth
              />
            </div>
          </div>
        )}
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
          <canvas
            ref={canvasRef}
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
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
