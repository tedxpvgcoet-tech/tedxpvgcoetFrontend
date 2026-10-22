import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import bgVideo from "../../assets/backgrounds/background.mp4";

const getApiUrl = () => {
  let url = "https://www.backend.tedxpvgcoet.in";
  try {
    if (import.meta.env.VITE_BACKEND_URL)
      url = import.meta.env.VITE_BACKEND_URL;
  } catch (error) {}
  try {
    if (process.env.REACT_APP_BACKEND_URL)
      url = process.env.REACT_APP_BACKEND_URL;
  } catch (error) {}
  return url.replace(/\/$/, "");
};

const styles = {
  page: {
    minHeight: "100vh",
    boxSizing: "border-box",
    padding: "clamp(130px, 16vw, 155px) clamp(12px, 4vw, 20px) 80px",
    position: "relative",
    zIndex: 1,
    color: "#fff",
    fontFamily: '"Inter", sans-serif',
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    maxWidth: 720,
    width: "100%",
    boxSizing: "border-box",
    margin: "0 auto",
    padding: "clamp(24px, 5vw, 40px) clamp(16px, 4vw, 36px)",
    borderRadius: 16,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(15, 15, 20, 0.75)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow:
      "0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
  },
  button: {
    border: "1px solid rgba(255,255,255,.2)",
    borderRadius: 8,
    padding: "10px 14px",
    color: "#fff",
    background: "rgba(255,255,255,.06)",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  bill: {
    padding: "clamp(14px, 3vw, 18px)",
    marginTop: 14,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.08)",
    background: "rgba(255,255,255,.03)",
    boxSizing: "border-box",
  },
};

export default function BillsHistory({ authToken, onBack, onLogout }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [requestingId, setRequestingId] = useState("");
  const [notice, setNotice] = useState("");

  const loadBills = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${getApiUrl()}/bills`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      if (response.status === 401) {
        onLogout();
        return;
      }
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Could not load uploaded bills.");
      }
      setBills(Array.isArray(result.bills) ? result.bills : []);
    } catch (loadError) {
      setError(loadError.message || "Could not load uploaded bills.");
    } finally {
      setLoading(false);
    }
  }, [authToken, onLogout]);

  useEffect(() => {
    loadBills();
  }, [loadBills]);

  const requestAllSummary = async () => {
    setSendingEmail(true);
    setNotice("");
    setError("");
    try {
      const response = await fetch(`${getApiUrl()}/bills/request-summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const result = await response.json();
      if (response.status === 401) {
        onLogout();
        return;
      }
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Could not send bill summary.");
      }
      setNotice(
        "Summary of all bills and attached receipts has been sent to your email!",
      );
    } catch (requestError) {
      setError(requestError.message || "Could not send bill summary.");
    } finally {
      setSendingEmail(false);
    }
  };

  const requestSingleBill = async (bill) => {
    setRequestingId(bill.id);
    setNotice("");
    setError("");
    try {
      const response = await fetch(
        `${getApiUrl()}/bills/${encodeURIComponent(bill.id)}/request-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const result = await response.json();
      if (response.status === 401) {
        onLogout();
        return;
      }
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Could not send bill details.");
      }
      setNotice(
        `Details and receipt for bill (₹${bill.amount}) sent to your email!`,
      );
    } catch (requestError) {
      setError(requestError.message || "Could not send bill details.");
    } finally {
      setRequestingId("");
    }
  };

  const totalAmount = bills.reduce(
    (acc, b) => acc + (parseFloat(b.amount) || 0),
    0,
  );

  return (
    <div
      style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}
    >
      <Helmet defer={false}>
        <title>Uploaded Bills | TEDxPVGCOETM</title>
      </Helmet>
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(.7)",
        }}
      />
      <main style={styles.page}>
        <section style={styles.card}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "20px",
            }}
          >
            <button type="button" style={styles.button} onClick={onBack}>
              ← Back to portal
            </button>
          </div>

          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
              fontWeight: "800",
              background: "linear-gradient(135deg, #ff2a2a 0%, #a80000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Previously Uploaded Bills
          </h1>
          <p style={{ color: "#aaa", marginTop: 0, fontSize: "0.95rem" }}>
            Your uploaded receipts, newest first.
          </p>

          {!loading && bills.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "stretch",
                flexWrap: "wrap",
                gap: "14px",
                padding: "clamp(12px, 3vw, 16px)",
                margin: "18px 0 12px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ flex: "1 1 180px", minWidth: "150px" }}>
                <div style={{ fontSize: "0.8rem", color: "#aaa" }}>
                  Total Uploaded
                </div>
                <div
                  style={{
                    fontSize: "clamp(1.2rem, 4vw, 1.4rem)",
                    fontWeight: "700",
                    color: "#fff",
                  }}
                >
                  ₹{totalAmount.toLocaleString("en-IN")}{" "}
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "#888",
                      fontWeight: "400",
                    }}
                  >
                    ({bills.length} {bills.length === 1 ? "bill" : "bills"})
                  </span>
                </div>
              </div>

              <button
                type="button"
                style={{
                  ...styles.button,
                  flex: "1 1 240px",
                  backgroundColor: sendingEmail
                    ? "rgba(232,27,42,0.4)"
                    : "#e81b2a",
                  borderColor: "#e81b2a",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
                  padding: "12px 16px",
                  transition: "all 0.2s ease",
                  cursor: sendingEmail ? "not-allowed" : "pointer",
                  width: "auto",
                }}
                disabled={sendingEmail}
                onClick={requestAllSummary}
              >
                {sendingEmail
                  ? "Preparing & Sending Email…"
                  : "✉️ Email Summary & Receipts"}
              </button>
            </div>
          )}

          {notice && (
            <div
              role="status"
              style={{
                padding: "12px 14px",
                margin: "14px 0",
                borderRadius: "8px",
                background: "rgba(46, 204, 113, 0.15)",
                border: "1px solid rgba(46, 204, 113, 0.3)",
                color: "#8ee6a0",
                fontSize: "0.85rem",
                wordBreak: "break-word",
              }}
            >
              ✓ {notice}
            </div>
          )}

          {error && (
            <div
              role="alert"
              style={{
                padding: "12px 14px",
                margin: "14px 0",
                borderRadius: "8px",
                background: "rgba(232, 27, 42, 0.15)",
                border: "1px solid rgba(232, 27, 42, 0.3)",
                color: "#ff8790",
                fontSize: "0.85rem",
                wordBreak: "break-word",
              }}
            >
              {error}{" "}
              <button
                type="button"
                style={{
                  ...styles.button,
                  marginLeft: "8px",
                  padding: "4px 8px",
                  fontSize: "0.75rem",
                }}
                onClick={loadBills}
              >
                Retry
              </button>
            </div>
          )}

          {loading && (
            <p style={{ color: "#ccc", margin: "30px 0" }}>Loading bills…</p>
          )}
          {!loading && !error && bills.length === 0 && (
            <p style={{ color: "#ccc", margin: "30px 0" }}>
              No uploaded bills were found.
            </p>
          )}

          {!loading &&
            bills.map((bill) => (
              <article key={bill.id} style={styles.bill}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    flexWrap: "wrap",
                    alignItems: "baseline",
                  }}
                >
                  <strong
                    style={{
                      fontSize: "clamp(1.1rem, 3.5vw, 1.25rem)",
                      color: "#e81b2a",
                    }}
                  >
                    ₹{bill.amount || "—"}
                  </strong>
                  <span
                    style={{
                      color: "#888",
                      fontSize: "0.8rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {bill.timestamp
                      ? new Date(bill.timestamp).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Date unavailable"}
                  </span>
                </div>
                <p
                  style={{
                    margin: "10px 0 6px",
                    fontSize: "0.95rem",
                    color: "#eee",
                    wordBreak: "break-word",
                    lineHeight: 1.4,
                  }}
                >
                  {bill.reason || "No specific reason provided."}
                </p>
                <p
                  style={{
                    margin: "4px 0 0",
                    color: "#888",
                    fontSize: "0.8rem",
                    wordBreak: "break-word",
                  }}
                >
                  {bill.team || "Team unavailable"} ·{" "}
                  {bill.gstCategory || "Non-GST"}
                </p>
                <div style={{ marginTop: "10px" }}>
                  <button
                    type="button"
                    style={{
                      ...styles.button,
                      fontSize: "0.78rem",
                      padding: "6px 12px",
                      borderColor: "rgba(232,27,42,0.4)",
                      background: "rgba(232,27,42,0.08)",
                      color: "#fff",
                      cursor:
                        requestingId === bill.id ? "not-allowed" : "pointer",
                    }}
                    disabled={requestingId === bill.id}
                    onClick={() => requestSingleBill(bill)}
                  >
                    {requestingId === bill.id ? "Sending…" : "✉️ Email Receipt"}
                  </button>
                </div>
              </article>
            ))}
        </section>
      </main>
    </div>
  );
}
