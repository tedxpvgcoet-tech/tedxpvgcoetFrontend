import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import bgVideo from "../../assets/backgrounds/background.mp4";

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
    justifyContent: "space-between",
    alignItems: "flex-start",
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
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  rowGroup: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  col: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.8rem",
    fontWeight: "700",
    color: "#b3b3b3",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  input: {
    padding: "12px 16px",
    background: "rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "0.95rem",
    fontFamily: '"Inter", sans-serif',
    boxSizing: "border-box",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
  },
  inputFocus: {
    borderColor: "#e81b2a",
    background: "rgba(232, 27, 42, 0.03)",
    boxShadow: "0 0 0 3px rgba(232, 27, 42, 0.15)",
  },
  select: {
    padding: "12px 16px",
    background: "rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "0.95rem",
    fontFamily: '"Inter", sans-serif',
    boxSizing: "border-box",
    outline: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  textarea: {
    padding: "12px 16px",
    background: "rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "0.95rem",
    fontFamily: '"Inter", sans-serif',
    boxSizing: "border-box",
    outline: "none",
    minHeight: "80px",
    resize: "vertical",
    transition: "all 0.3s ease",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
  },
  fileLabel: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px dashed rgba(255,255,255,0.2)",
    borderRadius: "8px",
    color: "#ccc",
    fontSize: "0.95rem",
    fontFamily: '"Inter", sans-serif',
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
  },
  fileLabelHover: {
    borderColor: "#e81b2a",
    background: "rgba(232, 27, 42, 0.05)",
  },
  fileBadge: {
    display: "inline-block",
    background: "#e81b2a",
    color: "#fff",
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.75rem",
    fontWeight: "800",
    padding: "4px 12px",
    borderRadius: "4px",
    whiteSpace: "nowrap",
    textTransform: "uppercase",
  },
  billContainer: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    position: "relative",
    animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  billHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    paddingBottom: "12px",
  },
  billTitle: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
  },
  removeBtn: {
    background: "rgba(232, 27, 42, 0.1)",
    border: "1px solid rgba(232, 27, 42, 0.2)",
    borderRadius: "6px",
    color: "#e81b2a",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: "600",
    padding: "4px 10px",
    transition: "all 0.2s",
  },
  addBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    fontFamily: '"Inter", sans-serif',
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    color: "#fff",
    padding: "14px",
    borderRadius: "8px",
    border: "1px dashed rgba(255,255,255,0.2)",
    fontWeight: "600",
    fontSize: "0.95rem",
    cursor: "pointer",
    marginBottom: "30px",
    transition: "all 0.3s ease",
  },
  addBtnHover: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "#fff",
  },
  submitBtn: {
    display: "block",
    width: "100%",
    fontFamily: '"Inter", sans-serif',
    backgroundColor: "#e81b2a",
    color: "#ffffff",
    padding: "16px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "700",
    fontSize: "1.05rem",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(232, 27, 42, 0.3)",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  submitBtnHover: {
    backgroundColor: "#c40000",
    boxShadow: "0 15px 25px rgba(232, 27, 42, 0.4)",
    transform: "translateY(-2px)",
  },
  submitBtnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none",
  },
  statusContainer: {
    marginTop: "20px",
    padding: "16px",
    borderRadius: "8px",
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.95rem",
    fontWeight: "600",
    lineHeight: "1.5",
    textAlign: "center",
  },
  statusSuccess: {
    background: "rgba(34, 197, 94, 0.1)",
    color: "#4ade80",
    border: "1px solid rgba(34, 197, 94, 0.25)",
  },
  statusError: {
    background: "rgba(232, 27, 42, 0.1)",
    color: "#ff4d4d",
    border: "1px solid rgba(232, 27, 42, 0.25)",
  },
  imageThumbWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginTop: "12px",
    padding: "12px",
    background: "rgba(255, 255, 255, 0.03)",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  imageThumb: {
    width: "45px",
    height: "45px",
    borderRadius: "6px",
    objectFit: "cover",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  imageThumbName: {
    color: "#ddd",
    fontSize: "0.85rem",
    fontWeight: "500",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  hasError,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{
          ...styles.select,
          opacity: disabled ? 0.5 : 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          borderColor: hasError
            ? "#e81b2a"
            : isOpen
              ? "#e81b2a"
              : "rgba(255,255,255,0.1)",
          background: hasError
            ? "rgba(232, 27, 42, 0.05)"
            : isOpen
              ? "rgba(232, 27, 42, 0.03)"
              : "rgba(0, 0, 0, 0.2)",
          boxShadow: isOpen
            ? "0 0 0 3px rgba(232, 27, 42, 0.15)"
            : "inset 0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <span style={{ color: value ? "#fff" : "#888" }}>
          {value
            ? options.find((o) => o.value === value)?.label || value
            : placeholder}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isOpen ? "#e81b2a" : "#999"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && !disabled && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "8px",
            background: "rgba(25, 25, 30, 0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            zIndex: 100,
            maxHeight: "220px",
            overflowY: "auto",
            boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
            WebkitBackdropFilter: "blur(15px)",
            backdropFilter: "blur(15px)",
          }}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              style={{
                padding: "12px 16px",
                color: value === opt.value ? "#ff4d4d" : "#ddd",
                cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,0.03)",
                background:
                  value === opt.value
                    ? "rgba(232, 27, 42, 0.1)"
                    : "transparent",
                transition: "background 0.2s",
                fontSize: "0.95rem",
              }}
              onMouseEnter={(e) => {
                if (value !== opt.value)
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
              }}
              onMouseLeave={(e) => {
                if (value !== opt.value)
                  e.target.style.background = "transparent";
              }}
            >
              {opt.label}
            </div>
          ))}
          {options.length === 0 && (
            <div
              style={{
                padding: "12px 16px",
                color: "#666",
                fontSize: "0.9rem",
              }}
            >
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const committeeMembers = {
  Organisers: ["Omkar Hokarne", "Lakshmikant Chaudhari", "Afaan Shaikh"],
  "Media & Marketing": [
    "Atharva Joshi (Lead)",
    "Rohan Naik",
    "Janhavi Salunkhe",
    "Aariya Vora",
    "Neeraj Chaini",
    "Gaurav Gore",
    "Siddhant Pawar",
    "Sumedh Kuchanwar",
    "Krutika Devare",
  ],
  "Design & Production": [
    "Avanti Satpute (Lead)",
    "Sutirth Doshi",
    "Priya Rangapure",
    "Hridaya Khare",
    "Prachi Sonawane",
    "Devesh Bhavsar",
    "Abhishek Chopade",
    "Parth Devi",
  ],
  "Finance & Sponsorship": [
    "Ritika Paradkar",
    "Durga Gunjal",
    "Siddhi Patil",
    "Mayuresh Shevlikar",
    "Varad Athalye",
    "Nawaz Patel",
    "Avadhoot Amrale",
    "Pratham Verma",
    "Swaraj Awad",
  ],
  "Logistics & Operations": [
    "Sukrut Angal (Lead)",
    "Anuj Wagh",
    "Anushka Kanade",
    "Ayusha Firke",
    "Shreeya Nene",
    "Ayush Janunkar",
    "Atharva Gore",
    "Varad Mogle",
    "Pushkar Shingate",
    "Prajwal Adasul",
    "Samiha Aserkar",
    "Rushikesh Kandalkar",
    "Maitreyee Prayag",
  ],
  Editorial: [
    "Hiya Pantvaidya (Lead)",
    "Renuka Joshi",
    "Maitreyee Bhave",
    "Yashashri Rajput",
    "Lavanya Kurapati",
    "Swara Kulkarni",
    "Siddhi Munot",
  ],
  Technical: [
    "Jagdish Prajapati (Lead)",
    "Aditya Kulkarni",
    "Saanidhi Gade",
    "Vedant Yeole",
    "Soham Katkar",
  ],
  Curation: [
    "Narayani Jalgaonkar (Lead)",
    "Rugveda Dhole",
    "Fanaa Jain",
    "Samiksha Jadhav",
    "Nachiket Bedekar",
    "Shrinand Joshi",
    "Hardik Mhetre",
    "Ved Purohit",
    "Sakshi Thange",
    "Tanushree Makam",
  ],
};

export default function BillsUploadForm({ secretKey }) {
  const [team, setTeam] = useState(
    () => localStorage.getItem("bills_team") || "",
  );
  const [name, setName] = useState(
    () => localStorage.getItem("bills_name") || "",
  );

  const initialBillState = () => ({
    uid: Date.now() + Math.random(),
    amount: "",
    reason: "",
    gstCategory: "Non-GST",
    image: null,
  });
  const [bills, setBills] = useState([initialBillState()]);

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [statusKey, setStatusKey] = useState(0);
  const statusTimerRef = useRef(null);
  const statusRef = useRef(null);

  const [btnHovered, setBtnHovered] = useState(false);
  const [addBtnHovered, setAddBtnHovered] = useState(false);
  const [focused, setFocused] = useState("");
  const [hoveredFileId, setHoveredFileId] = useState(null);

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

  const handleTeamChange = (val) => {
    setTeam(val);
    setName("");
    localStorage.setItem("bills_team", val);
    localStorage.removeItem("bills_name");
  };

  const handleNameChange = (val) => {
    setName(val);
    localStorage.setItem("bills_name", val);
  };

  const handleAddBill = () => {
    setBills((prev) => [...prev, initialBillState()]);
  };

  const handleRemoveBill = (uid) => {
    const bill = bills.find((b) => b.uid === uid);
    const isFilled = bill && (bill.amount || bill.reason || bill.image);
    if (isFilled) {
      if (
        !window.confirm(
          "This bill item has data. Are you sure you want to remove it?",
        )
      )
        return;
    }
    setBills((prev) => prev.filter((b) => b.uid !== uid));
  };

  const handleBillFieldChange = (uid, field, value) => {
    setBills((prev) =>
      prev.map((b) => (b.uid === uid ? { ...b, [field]: value } : b)),
    );
  };

  const handleFileChange = (e, uid) => {
    const file = e.target.files[0];
    if (file) {
      const sizeMB = file.size / (1024 * 1024);
      const reader = new FileReader();
      reader.onloadend = () => {
        handleBillFieldChange(uid, "image", {
          fileName: file.name,
          mimeType: file.type,
          base64: reader.result,
          sizeMB: sizeMB,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!team || !name) {
      setAutoStatus({
        type: "error",
        message: "Please select both your Team and Name.",
      });
      return;
    }

    for (let i = 0; i < bills.length; i++) {
      const b = bills[i];
      if (!b.amount || Number(b.amount) <= 0) {
        setAutoStatus({
          type: "error",
          message: `Please enter a valid Amount for Bill Item #${i + 1}.`,
        });
        return;
      }
      if (!b.image) {
        setAutoStatus({
          type: "error",
          message: `Please attach the photo receipt for Bill Item #${i + 1}.`,
        });
        return;
      }
    }

    setLoading(true);
    setUploadProgress(
      bills.length > 1
        ? `Uploading Bill 1 of ${bills.length}...`
        : "Uploading...",
    );
    setAutoStatus({ type: "info", message: "Do not close the window." });

    let successCount = 0;
    let failMsgs = [];

    let API_URL = "https://www.backend.tedxpvgcoet.in";
    try {
      if (import.meta.env.VITE_BACKEND_URL)
        API_URL = import.meta.env.VITE_BACKEND_URL;
    } catch (e) {}
    try {
      if (process.env.REACT_APP_BACKEND_URL)
        API_URL = process.env.REACT_APP_BACKEND_URL;
    } catch (e) {}

    for (let i = 0; i < bills.length; i++) {
      if (bills.length > 1) {
        setUploadProgress(`Uploading Bill ${i + 1} of ${bills.length}...`);
      }
      const bill = bills[i];
      try {
        const payload = {
          keyword: secretKey,
          team: team,
          name: name,
          amount: bill.amount,
          reason: bill.reason || "No specific reason provided.",
          gstCategory: bill.gstCategory,
          imageFile: bill.image.base64,
          fileName: bill.image.fileName,
          mimeType: bill.image.mimeType,
        };

        const res = await fetch(`${API_URL}/bills`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          successCount++;
        } else {
          failMsgs.push(`Bill #${i + 1}: ${data.error || "Server rejected"}`);
        }
      } catch (err) {
        failMsgs.push(`Bill #${i + 1}: Network error.`);
      }
    }

    setLoading(false);
    setUploadProgress("");

    if (failMsgs.length === 0) {
      setAutoStatus(
        {
          type: "success",
          message: `Successfully uploaded ${successCount} bill(s)!`,
        },
        5000,
      );
      setBills([initialBillState()]);
    } else if (successCount > 0) {
      setAutoStatus({
        type: "error",
        message: `Uploaded ${successCount} bills, but some failed:\n${failMsgs.join("\n")}`,
      });
    } else {
      setAutoStatus({
        type: "error",
        message: `Failed to upload bills:\n${failMsgs.join("\n")}`,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("BRIDGE_KEY");
    window.location.reload();
  };

  return (
    <div style={styles.wrapper}>
      <Helmet defer={false}>
        <title>Internal Bills | TEDxPVGCOET</title>
      </Helmet>
      <style>{`
        @keyframes dropIn {
          0% { opacity: 0; transform: translateY(-30px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeText {
          0% { opacity: 0; transform: translateY(5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shakeError {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          width: 18px;
          height: 18px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
        }
        .hero-video1 {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          z-index: 0;
          filter: brightness(0.7);
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }

        .mobile-picker { display: none !important; }
        .desktop-picker { display: flex !important; }

        @media (max-width: 600px) {
            .mobile-picker { display: flex !important; }
            .desktop-picker { display: none !important; }
            .responsive-row {
                flex-direction: column !important;
                gap: 20px !important;
            }
            .bills-card {
                padding: 24px 16px !important;
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
        <div style={styles.card} className="bills-card">
          <div style={styles.headerRow}>
            <div>
              <h1 style={styles.title}>Internal Bills</h1>
              <p style={styles.subtitle}>
                Submit your purchase receipts seamlessly
              </p>
            </div>
            <button
              type="button"
              style={styles.resetBtn}
              onClick={handleLogout}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.1)";
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
                e.target.style.color = "#ccc";
              }}
              title="Sign out and re-enter keyword"
            >
              Sign Out
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div style={styles.rowGroup} className="responsive-row">
              <div style={styles.col}>
                <label style={styles.label}>Team</label>
                <CustomSelect
                  value={team}
                  onChange={handleTeamChange}
                  options={Object.keys(committeeMembers).map((t) => ({
                    label: t,
                    value: t,
                  }))}
                  placeholder="Select Team..."
                  disabled={loading}
                />
              </div>
              <div style={styles.col}>
                <label style={styles.label}>Name</label>
                <CustomSelect
                  value={name}
                  onChange={handleNameChange}
                  options={
                    team && committeeMembers[team]
                      ? committeeMembers[team].map((n) => ({
                          label: n,
                          value: n,
                        }))
                      : []
                  }
                  placeholder={team ? "Select Name..." : "Select Team First"}
                  disabled={loading || !team}
                />
              </div>
            </div>

            <div
              style={{
                margin: "30px 0 25px",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 50%, transparent)",
              }}
            ></div>

            {bills.map((bill, index) => (
              <div key={bill.uid} style={styles.billContainer}>
                <div style={styles.billHeader}>
                  <h3 style={styles.billTitle}>Bill Item #{index + 1}</h3>
                  {bills.length > 1 && (
                    <button
                      type="button"
                      style={{
                        ...styles.removeBtn,
                        opacity: loading ? 0.5 : 1,
                        cursor: loading ? "not-allowed" : "pointer",
                      }}
                      onClick={() => {
                        if (!loading) handleRemoveBill(bill.uid);
                      }}
                      onMouseEnter={(e) => {
                        if (!loading)
                          e.target.style.background = "rgba(232, 27, 42, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        if (!loading)
                          e.target.style.background = "rgba(232, 27, 42, 0.1)";
                      }}
                      disabled={loading}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div style={styles.rowGroup} className="responsive-row">
                  <div style={styles.col}>
                    <label style={styles.label}>Amount (₹) *</label>
                    <input
                      type="number"
                      required
                      value={bill.amount}
                      disabled={loading}
                      style={{
                        ...styles.input,
                        opacity: loading ? 0.5 : 1,
                        ...(focused === `amount-${bill.uid}` && !loading
                          ? styles.inputFocus
                          : {}),
                      }}
                      onFocus={() => setFocused(`amount-${bill.uid}`)}
                      onBlur={() => setFocused("")}
                      onChange={(e) =>
                        handleBillFieldChange(
                          bill.uid,
                          "amount",
                          e.target.value,
                        )
                      }
                      onWheel={(e) => e.target.blur()}
                      placeholder="e.g. 500"
                    />
                  </div>
                  <div style={styles.col}>
                    <label style={styles.label}>Category</label>
                    <CustomSelect
                      value={bill.gstCategory}
                      onChange={(val) =>
                        handleBillFieldChange(bill.uid, "gstCategory", val)
                      }
                      options={[
                        { label: "GST", value: "GST" },
                        { label: "Non-GST", value: "Non-GST" },
                      ]}
                      placeholder="Category"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Reason / Description (Optional)
                  </label>
                  <textarea
                    value={bill.reason}
                    disabled={loading}
                    style={{
                      ...styles.textarea,
                      opacity: loading ? 0.5 : 1,
                      ...(focused === `reason-${bill.uid}` && !loading
                        ? styles.inputFocus
                        : {}),
                    }}
                    onFocus={() => setFocused(`reason-${bill.uid}`)}
                    onBlur={() => setFocused("")}
                    onChange={(e) =>
                      handleBillFieldChange(bill.uid, "reason", e.target.value)
                    }
                    placeholder="What was purchased and for what purpose?"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Bill Receipt Photo *</label>
                  <input
                    id={`file-${bill.uid}`}
                    type="file"
                    accept="image/*"
                    disabled={loading}
                    onChange={(e) => handleFileChange(e, bill.uid)}
                    style={{ display: "none" }}
                  />
                  <input
                    id={`file-cam-${bill.uid}`}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    disabled={loading}
                    onChange={(e) => handleFileChange(e, bill.uid)}
                    style={{ display: "none" }}
                  />
                  {!bill.image ? (
                    <>
                      {/* Desktop Picker: Single unified button */}
                      <div
                        className="desktop-picker"
                        style={{
                          ...styles.fileLabel,
                          opacity: loading ? 0.5 : 1,
                          cursor: loading ? "not-allowed" : "pointer",
                          ...(hoveredFileId === bill.uid && !loading
                            ? styles.fileLabelHover
                            : {}),
                        }}
                        onClick={() =>
                          !loading &&
                          document.getElementById(`file-${bill.uid}`).click()
                        }
                        onMouseEnter={() =>
                          !loading && setHoveredFileId(bill.uid)
                        }
                        onMouseLeave={() => !loading && setHoveredFileId(null)}
                      >
                        <span
                          style={{
                            ...styles.fileBadge,
                            background: loading ? "#666" : "#e81b2a",
                          }}
                        >
                          Choose File
                        </span>
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          No file selected
                        </span>
                      </div>

                      {/* Mobile Picker: Split Camera and Gallery */}
                      <div className="mobile-picker" style={{ gap: '12px' }}>
                        <div
                          style={{
                            ...styles.fileLabel,
                            flex: 1,
                            justifyContent: 'center',
                            opacity: loading ? 0.5 : 1,
                            cursor: loading ? "not-allowed" : "pointer",
                            ...(hoveredFileId === `gal-${bill.uid}` && !loading
                              ? styles.fileLabelHover
                              : {}),
                          }}
                          onClick={() =>
                            !loading &&
                            document.getElementById(`file-${bill.uid}`).click()
                          }
                          onMouseEnter={() =>
                            !loading && setHoveredFileId(`gal-${bill.uid}`)
                          }
                          onMouseLeave={() => !loading && setHoveredFileId(null)}
                        >
                          <span
                            style={{
                              ...styles.fileBadge,
                              background: loading ? "#666" : "#444",
                            }}
                          >
                            Gallery
                          </span>
                        </div>
                        
                        <div
                          style={{
                            ...styles.fileLabel,
                            flex: 1,
                            justifyContent: 'center',
                            opacity: loading ? 0.5 : 1,
                            cursor: loading ? "not-allowed" : "pointer",
                            ...(hoveredFileId === `cam-${bill.uid}` && !loading
                              ? styles.fileLabelHover
                              : {}),
                          }}
                          onClick={() =>
                            !loading &&
                            document.getElementById(`file-cam-${bill.uid}`).click()
                          }
                          onMouseEnter={() =>
                            !loading && setHoveredFileId(`cam-${bill.uid}`)
                          }
                          onMouseLeave={() => !loading && setHoveredFileId(null)}
                        >
                          <span
                            style={{
                              ...styles.fileBadge,
                              background: loading ? "#666" : "#e81b2a",
                            }}
                          >
                            Camera
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        ...styles.imageThumbWrapper,
                        opacity: loading ? 0.5 : 1,
                      }}
                    >
                      <img
                        src={bill.image.base64}
                        alt="preview"
                        style={styles.imageThumb}
                      />
                      <div style={{ flex: 1, overflow: "hidden" }}>
                        <div style={styles.imageThumbName}>
                          {bill.image.fileName}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginTop: "4px",
                          }}
                        >
                          <div
                            style={{
                              color: loading ? "#888" : "#e81b2a",
                              fontSize: "0.75rem",
                              cursor: loading ? "not-allowed" : "pointer",
                              fontWeight: "600",
                            }}
                            onClick={() =>
                              !loading &&
                              document
                                .getElementById(`file-${bill.uid}`)
                                .click()
                            }
                          >
                            Change Photo
                          </div>
                          {bill.image.sizeMB > 5 && (
                            <span
                              style={{
                                color: "#f59e0b",
                                fontSize: "0.7rem",
                                fontWeight: "600",
                              }}
                            >
                              Large file ({bill.image.sizeMB.toFixed(1)} MB)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              style={{
                ...styles.addBtn,
                ...(loading
                  ? { opacity: 0.5, cursor: "not-allowed" }
                  : addBtnHovered
                    ? styles.addBtnHover
                    : {}),
              }}
              onMouseEnter={() => !loading && setAddBtnHovered(true)}
              onMouseLeave={() => !loading && setAddBtnHovered(false)}
              onClick={() => !loading && handleAddBill()}
              disabled={loading}
            >
              <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>+</span>{" "}
              Add Another Bill Item
            </button>

            {(() => {
              const total = bills.reduce(
                (sum, b) => sum + (Number(b.amount) || 0),
                0,
              );
              if (total > 0) {
                return (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "12px",
                      marginBottom: "20px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.06)",
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    <span style={{ color: "#aaa", fontSize: "0.85rem" }}>
                      Total:{" "}
                    </span>
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "1.1rem",
                        fontWeight: "700",
                      }}
                    >
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                    {bills.length > 1 && (
                      <span
                        style={{
                          color: "#888",
                          fontSize: "0.8rem",
                          marginLeft: "6px",
                        }}
                      >
                        across {bills.length} bills
                      </span>
                    )}
                  </div>
                );
              }
              return null;
            })()}

            <button
              type="submit"
              style={{
                ...styles.submitBtn,
                ...(btnHovered && !loading ? styles.submitBtnHover : {}),
                ...(loading ? styles.submitBtnDisabled : {}),
              }}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              disabled={loading}
            >
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <div className="spinner"></div>{" "}
                  {uploadProgress || "Uploading..."}
                </div>
              ) : bills.length > 1 ? (
                `Submit All ${bills.length} Bills`
              ) : (
                "Submit Bill"
              )}
            </button>
          </form>

          {status.message && (
            <div
              key={statusKey}
              ref={statusRef}
              style={{
                ...styles.statusContainer,
                animation:
                  status.type === "error"
                    ? "shakeError 0.5s ease, fadeText 0.3s ease"
                    : "fadeText 0.3s ease",
                ...(status.type === "success"
                  ? styles.statusSuccess
                  : status.type === "error"
                    ? styles.statusError
                    : {
                        background: "rgba(255,255,255,0.1)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }),
              }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: status.message.replace(/\n/g, "<br/>"),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
