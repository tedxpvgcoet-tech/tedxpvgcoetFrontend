import React, { useCallback, useEffect, useMemo, useState } from "react";
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

const TREASURER_EMAILS = [
  "afaan1902@gmail.com",
  "ritikaparadkar8999@gmail.com",
  "jagadishdrp@gmail.com",
];

const styles = {
  page: {
    minHeight: "100vh",
    boxSizing: "border-box",
    padding: "clamp(120px, 15vw, 150px) clamp(12px, 4vw, 24px) 80px",
    position: "relative",
    zIndex: 1,
    color: "#fff",
    fontFamily: '"Inter", sans-serif',
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    maxWidth: 820,
    width: "100%",
    boxSizing: "border-box",
    margin: "0 auto",
    padding: "clamp(20px, 4vw, 36px)",
    borderRadius: 16,
    border: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(15, 16, 22, 0.82)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow:
      "0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
  },
  button: {
    border: "1px solid rgba(255,255,255,.2)",
    borderRadius: 8,
    padding: "8px 14px",
    color: "#fff",
    background: "rgba(255,255,255,.06)",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.85rem",
    transition: "all 0.2s ease",
  },
  billCard: {
    padding: "clamp(14px, 3vw, 18px)",
    marginTop: 14,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.08)",
    background: "rgba(255,255,255,.03)",
    boxSizing: "border-box",
    transition: "all 0.25s ease",
  },
  billCardReimbursed: {
    opacity: 0.68,
    background: "rgba(255, 255, 255, 0.015)",
    border: "1px solid rgba(46, 204, 113, 0.2)",
  },
  badgePending: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "0.72rem",
    fontWeight: "700",
    color: "#f59e0b",
    background: "rgba(245, 158, 11, 0.12)",
    border: "1px solid rgba(245, 158, 11, 0.35)",
    borderRadius: "20px",
    padding: "3px 10px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  badgeReimbursed: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "0.72rem",
    fontWeight: "700",
    color: "#2ecc71",
    background: "rgba(46, 204, 113, 0.12)",
    border: "1px solid rgba(46, 204, 113, 0.35)",
    borderRadius: "20px",
    padding: "3px 10px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  select: {
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: 8,
    padding: "8px 12px",
    color: "#fff",
    fontSize: "0.85rem",
    outline: "none",
    fontFamily: '"Inter", sans-serif',
  },
  input: {
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: 8,
    padding: "8px 12px",
    color: "#fff",
    fontSize: "0.85rem",
    outline: "none",
    fontFamily: '"Inter", sans-serif',
    width: "100%",
    boxSizing: "border-box",
  },
};

export default function BillsHistory({
  authToken,
  userEmail,
  userName,
  userTeam,
  onBack,
  onLogout,
}) {
  const [bills, setBills] = useState([]);
  const [allBills, setAllBills] = useState([]);
  const [activeTab, setActiveTab] = useState("my"); // "my" | "treasurer"
  const [isTreasurer, setIsTreasurer] = useState(() => {
    const email = (userEmail || localStorage.getItem("BRIDGE_EMAIL") || "").toLowerCase().trim();
    return TREASURER_EMAILS.includes(email);
  });
  const [loading, setLoading] = useState(true);
  const [loadingAll, setLoadingAll] = useState(false);
  const [error, setError] = useState("");
  const [sendingEmailType, setSendingEmailType] = useState(""); // "pending" | "all" | ""
  const [requestingId, setRequestingId] = useState("");
  const [reimbursingId, setReimbursingId] = useState("");
  const [notice, setNotice] = useState("");

  // Treasurer Filters
  const [filterMember, setFilterMember] = useState("");
  const [filterTeam, setFilterTeam] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending"); // "pending" | "reimbursed" | "all"
  const [searchQuery, setSearchQuery] = useState("");

  // Normalizes bill object from API
  const parseBill = (b) => {
    const rawReimbursed = b.isReimbursed ?? b.reimbursed;
    const isReimbursed =
      rawReimbursed === true ||
      rawReimbursed === 1 ||
      rawReimbursed === "1" ||
      String(rawReimbursed).toLowerCase() === "true" ||
      String(rawReimbursed).toLowerCase() === "reimbursed";

    return {
      ...b,
      isReimbursed,
      amountNum: parseFloat(b.amount) || 0,
    };
  };

  // Load user's bills
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
      if (result.isTreasurer !== undefined) {
        setIsTreasurer(Boolean(result.isTreasurer));
      }
      const parsed = Array.isArray(result.bills) ? result.bills.map(parseBill) : [];
      setBills(parsed);
    } catch (loadError) {
      setError(loadError.message || "Could not load uploaded bills.");
    } finally {
      setLoading(false);
    }
  }, [authToken, onLogout]);

  // Load all bills for Treasurer
  const loadAllBills = useCallback(async () => {
    setLoadingAll(true);
    setError("");
    try {
      const response = await fetch(`${getApiUrl()}/bills?view=all`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      if (response.status === 401) {
        onLogout();
        return;
      }
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Could not load all bills for treasurer.");
      }
      const parsed = Array.isArray(result.bills) ? result.bills.map(parseBill) : [];
      setAllBills(parsed);
    } catch (loadError) {
      setError(loadError.message || "Could not load team bills.");
    } finally {
      setLoadingAll(false);
    }
  }, [authToken, onLogout]);

  useEffect(() => {
    loadBills();
  }, [loadBills]);

  useEffect(() => {
    if (activeTab === "treasurer" && allBills.length === 0 && !loadingAll) {
      loadAllBills();
    }
  }, [activeTab, allBills.length, loadingAll, loadAllBills]);

  // Mark / Unmark Reimbursement (Treasurer Action)
  const toggleReimburse = async (billId, targetState) => {
    setReimbursingId(billId);
    setNotice("");
    setError("");
    try {
      const response = await fetch(
        `${getApiUrl()}/bills/${encodeURIComponent(billId)}/toggle-reimburse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ reimbursed: targetState ? 1 : 0 }),
        }
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Could not update reimbursement status.");
      }

      // Update state in allBills and bills locally
      const updater = (list) =>
        list.map((b) => (b.id === billId ? { ...b, isReimbursed: targetState } : b));
      setAllBills(updater);
      setBills(updater);

      setNotice(
        targetState
          ? `Bill #${billId} marked as Reimbursed (1) in Google Sheets.`
          : `Bill #${billId} reverted to Pending.`
      );
    } catch (toggleErr) {
      setError(toggleErr.message || "Failed to update reimbursement status.");
    } finally {
      setReimbursingId("");
    }
  };

  // Email summary request (pending only OR all)
  const requestSummaryEmail = async (onlyPending) => {
    const type = onlyPending ? "pending" : "all";
    setSendingEmailType(type);
    setNotice("");
    setError("");
    try {
      const response = await fetch(`${getApiUrl()}/bills/request-summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ onlyPending }),
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
        onlyPending
          ? "Summary of your PENDING bills and receipts has been emailed to you!"
          : "Complete record of ALL your submitted bills has been emailed to you!"
      );
    } catch (requestError) {
      setError(requestError.message || "Could not send bill summary.");
    } finally {
      setSendingEmailType("");
    }
  };

  // Request single receipt
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
        }
      );
      const result = await response.json();
      if (response.status === 401) {
        onLogout();
        return;
      }
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Could not send bill details.");
      }
      setNotice(`Details and receipt for bill (₹${bill.amount}) sent to your email!`);
    } catch (requestError) {
      setError(requestError.message || "Could not send bill details.");
    } finally {
      setRequestingId("");
    }
  };

  // Calculations for Personal Bills
  const userPendingBills = useMemo(
    () => bills.filter((b) => !b.isReimbursed),
    [bills]
  );
  const userPendingAmount = useMemo(
    () => userPendingBills.reduce((acc, b) => acc + b.amountNum, 0),
    [userPendingBills]
  );
  const userReimbursedAmount = useMemo(
    () =>
      bills
        .filter((b) => b.isReimbursed)
        .reduce((acc, b) => acc + b.amountNum, 0),
    [bills]
  );
  const userTotalAmount = userPendingAmount + userReimbursedAmount;

  // Treasurer View calculations & filtering
  const uniqueMembers = useMemo(() => {
    const map = new Map();
    allBills.forEach((b) => {
      const name = b.name || "Unknown";
      if (!map.has(name)) {
        map.set(name, {
          name,
          team: b.team,
          totalPending: 0,
          pendingCount: 0,
        });
      }
      if (!b.isReimbursed) {
        map.get(name).totalPending += b.amountNum;
        map.get(name).pendingCount += 1;
      }
    });
    return Array.from(map.values()).sort((a, b) => b.totalPending - a.totalPending);
  }, [allBills]);

  const uniqueTeams = useMemo(() => {
    const set = new Set();
    allBills.forEach((b) => {
      if (b.team) set.add(b.team);
    });
    return Array.from(set).sort();
  }, [allBills]);

  const filteredTreasurerBills = useMemo(() => {
    return allBills.filter((b) => {
      if (filterStatus === "pending" && b.isReimbursed) return false;
      if (filterStatus === "reimbursed" && !b.isReimbursed) return false;
      if (filterMember && b.name !== filterMember) return false;
      if (filterTeam && b.team !== filterTeam) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = (b.name || "").toLowerCase().includes(q);
        const matchesReason = (b.reason || "").toLowerCase().includes(q);
        const matchesAmount = String(b.amount || "").includes(q);
        if (!matchesName && !matchesReason && !matchesAmount) return false;
      }
      return true;
    });
  }, [allBills, filterStatus, filterMember, filterTeam, searchQuery]);

  const treasurerTotalPending = useMemo(
    () =>
      allBills
        .filter((b) => !b.isReimbursed)
        .reduce((acc, b) => acc + b.amountNum, 0),
    [allBills]
  );
  const treasurerTotalReimbursed = useMemo(
    () =>
      allBills
        .filter((b) => b.isReimbursed)
        .reduce((acc, b) => acc + b.amountNum, 0),
    [allBills]
  );

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
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
          filter: "brightness(.65)",
        }}
      />
      <main style={styles.page}>
        <section style={styles.card}>
          {/* Top Bar Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <button type="button" style={styles.button} onClick={onBack}>
              ← Back to portal
            </button>

            {isTreasurer && (
              <div
                style={{
                  display: "inline-flex",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.08)",
                  padding: "3px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <button
                  type="button"
                  style={{
                    ...styles.button,
                    border: "none",
                    background:
                      activeTab === "my"
                        ? "linear-gradient(135deg, #e81b2a 0%, #a80000 100%)"
                        : "transparent",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "7px",
                    fontWeight: activeTab === "my" ? "700" : "500",
                  }}
                  onClick={() => setActiveTab("my")}
                >
                  My Bills ({bills.length})
                </button>
                <button
                  type="button"
                  style={{
                    ...styles.button,
                    border: "none",
                    background:
                      activeTab === "treasurer"
                        ? "linear-gradient(135deg, #e81b2a 0%, #a80000 100%)"
                        : "transparent",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "7px",
                    fontWeight: activeTab === "treasurer" ? "700" : "500",
                  }}
                  onClick={() => setActiveTab("treasurer")}
                >
                  👑 Treasurer Portal ({allBills.length || "…"})
                </button>
              </div>
            )}
          </div>

          <h1
            style={{
              margin: "0 0 6px",
              fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
              fontWeight: "800",
              background: "linear-gradient(135deg, #ff3b30 0%, #e81b2a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {activeTab === "treasurer"
              ? "Treasurer & Reimbursement Control"
              : "Previously Uploaded Bills"}
          </h1>
          <p style={{ color: "#aaa", marginTop: 0, fontSize: "0.92rem" }}>
            {activeTab === "treasurer"
              ? "Track, filter, and settle expense reimbursements across all committee members."
              : "Your submitted bills. Reimbursed expenses are settled and excluded from your pending balance."}
          </p>

          {/* Notifications & Errors */}
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
                onClick={activeTab === "treasurer" ? loadAllBills : loadBills}
              >
                Retry
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              VIEW A: MEMBER PERSONAL BILLS
             ══════════════════════════════════════════════════════════════════ */}
          {activeTab === "my" && (
            <>
              {!loading && bills.length > 0 && (
                <div
                  style={{
                    padding: "clamp(14px, 3vw, 18px)",
                    margin: "18px 0 16px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "14px",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.76rem",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "#f59e0b",
                          marginBottom: "3px",
                        }}
                      >
                        Pending Reimbursement
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(1.5rem, 4vw, 1.9rem)",
                          fontWeight: "800",
                          color: userPendingAmount > 0 ? "#ff4d4d" : "#2ecc71",
                          lineHeight: "1.1",
                        }}
                      >
                        ₹{userPendingAmount.toLocaleString("en-IN")}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "#888", marginTop: "4px" }}>
                        {userPendingBills.length} pending bill
                        {userPendingBills.length === 1 ? "" : "s"}
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.78rem", color: "#888" }}>
                        Already Reimbursed:{" "}
                        <strong style={{ color: "#2ecc71" }}>
                          ₹{userReimbursedAmount.toLocaleString("en-IN")}
                        </strong>
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#666", marginTop: "2px" }}>
                        Total Ever Submitted: ₹{userTotalAmount.toLocaleString("en-IN")} (
                        {bills.length} bills)
                      </div>
                    </div>
                  </div>

                  {/* Dual Mailing Options */}
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      paddingTop: "14px",
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        ...styles.button,
                        flex: "1 1 200px",
                        backgroundColor:
                          sendingEmailType === "pending"
                            ? "rgba(232,27,42,0.4)"
                            : "#e81b2a",
                        borderColor: "#e81b2a",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "10px 14px",
                        cursor:
                          sendingEmailType || userPendingAmount === 0
                            ? "not-allowed"
                            : "pointer",
                        opacity: userPendingAmount === 0 ? 0.5 : 1,
                      }}
                      disabled={Boolean(sendingEmailType) || userPendingAmount === 0}
                      onClick={() => requestSummaryEmail(true)}
                    >
                      {sendingEmailType === "pending"
                        ? "Sending Pending Summary…"
                        : `✉️ Email Pending Bills (₹${userPendingAmount.toLocaleString(
                            "en-IN"
                          )})`}
                    </button>

                    <button
                      type="button"
                      style={{
                        ...styles.button,
                        flex: "1 1 180px",
                        borderColor: "rgba(255,255,255,0.25)",
                        background: "rgba(255,255,255,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "10px 14px",
                        cursor: sendingEmailType ? "not-allowed" : "pointer",
                      }}
                      disabled={Boolean(sendingEmailType)}
                      onClick={() => requestSummaryEmail(false)}
                    >
                      {sendingEmailType === "all"
                        ? "Sending All Summary…"
                        : `✉️ Email All Bills (₹${userTotalAmount.toLocaleString(
                            "en-IN"
                          )})`}
                    </button>
                  </div>
                </div>
              )}

              {loading && <p style={{ color: "#ccc", margin: "30px 0" }}>Loading your bills…</p>}
              {!loading && !error && bills.length === 0 && (
                <p style={{ color: "#ccc", margin: "30px 0" }}>
                  No uploaded bills found for your account.
                </p>
              )}

              {!loading &&
                bills.map((bill) => (
                  <article
                    key={bill.id}
                    style={{
                      ...styles.billCard,
                      ...(bill.isReimbursed ? styles.billCardReimbursed : {}),
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 10,
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <strong
                          style={{
                            fontSize: "clamp(1.1rem, 3.5vw, 1.3rem)",
                            color: bill.isReimbursed ? "#8ee6a0" : "#ff3b30",
                            textDecoration: bill.isReimbursed ? "line-through" : "none",
                          }}
                        >
                          ₹{bill.amount || "—"}
                        </strong>
                        <span
                          style={
                            bill.isReimbursed
                              ? styles.badgeReimbursed
                              : styles.badgePending
                          }
                        >
                          {bill.isReimbursed ? "✓ Reimbursed" : "⏳ Pending"}
                        </span>
                      </div>

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
                        color: bill.isReimbursed ? "#bbb" : "#eee",
                        wordBreak: "break-word",
                        lineHeight: 1.4,
                      }}
                    >
                      {bill.reason || "No specific reason provided."}
                    </p>

                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#777",
                        fontSize: "0.8rem",
                        wordBreak: "break-word",
                      }}
                    >
                      {bill.team || "Team unavailable"} · {bill.gstCategory || "Non-GST"}
                      {bill.reimbursementNote && (
                        <span style={{ color: "#aaa", marginLeft: "8px" }}>
                          · Note: <i>{bill.reimbursementNote}</i>
                        </span>
                      )}
                    </p>

                    <div
                      style={{
                        marginTop: "12px",
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <button
                        type="button"
                        style={{
                          ...styles.button,
                          fontSize: "0.78rem",
                          padding: "6px 12px",
                          borderColor: "rgba(232,27,42,0.4)",
                          background: "rgba(232,27,42,0.08)",
                          color: "#fff",
                          cursor: requestingId === bill.id ? "not-allowed" : "pointer",
                        }}
                        disabled={requestingId === bill.id}
                        onClick={() => requestSingleBill(bill)}
                      >
                        {requestingId === bill.id ? "Sending…" : "✉️ Email Receipt"}
                      </button>

                      {bill.fileUrl && bill.fileUrl.startsWith("http") && (
                        <a
                          href={bill.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            ...styles.button,
                            fontSize: "0.78rem",
                            padding: "6px 12px",
                            textDecoration: "none",
                            color: "#ccc",
                          }}
                        >
                          ↗ View Bill Image
                        </a>
                      )}
                    </div>
                  </article>
                ))}
            </>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              VIEW B: TREASURER DASHBOARD (AFAAN / FINANCE ONLY)
             ══════════════════════════════════════════════════════════════════ */}
          {activeTab === "treasurer" && (
            <>
              {/* Treasurer Metrics Banner */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                  margin: "16px 0 20px",
                }}
              >
                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: "rgba(232, 27, 42, 0.08)",
                    border: "1px solid rgba(232, 27, 42, 0.25)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: "700",
                      color: "#ff5555",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Total Outstanding
                  </div>
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "800",
                      color: "#ff3b30",
                      marginTop: "4px",
                    }}
                  >
                    ₹{treasurerTotalPending.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#999", marginTop: "2px" }}>
                    To be paid to members
                  </div>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: "rgba(46, 204, 113, 0.08)",
                    border: "1px solid rgba(46, 204, 113, 0.25)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: "700",
                      color: "#2ecc71",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Total Reimbursed
                  </div>
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "800",
                      color: "#2ecc71",
                      marginTop: "4px",
                    }}
                  >
                    ₹{treasurerTotalReimbursed.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#999", marginTop: "2px" }}>
                    Settled expenses
                  </div>
                </div>

                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: "700",
                      color: "#aaa",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    All-Time Expenses
                  </div>
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "800",
                      color: "#fff",
                      marginTop: "4px",
                    }}
                  >
                    ₹
                    {(
                      treasurerTotalPending + treasurerTotalReimbursed
                    ).toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#999", marginTop: "2px" }}>
                    {allBills.length} total entries
                  </div>
                </div>
              </div>

              {/* Filtering Controls */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "14px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  marginBottom: "18px",
                }}
              >
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {/* Member Selector */}
                  <div style={{ flex: "1 1 220px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.72rem",
                        color: "#888",
                        marginBottom: "4px",
                        textTransform: "uppercase",
                        fontWeight: "600",
                      }}
                    >
                      Select Person
                    </label>
                    <select
                      style={{ ...styles.select, width: "100%" }}
                      value={filterMember}
                      onChange={(e) => setFilterMember(e.target.value)}
                    >
                      <option value="">All Members ({uniqueMembers.length})</option>
                      {uniqueMembers.map((m) => (
                        <option key={m.name} value={m.name}>
                          {m.name} —{" "}
                          {m.totalPending > 0
                            ? `Pending: ₹${m.totalPending.toLocaleString("en-IN")}`
                            : "Settled"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Team Filter */}
                  <div style={{ flex: "1 1 180px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.72rem",
                        color: "#888",
                        marginBottom: "4px",
                        textTransform: "uppercase",
                        fontWeight: "600",
                      }}
                    >
                      Filter Team
                    </label>
                    <select
                      style={{ ...styles.select, width: "100%" }}
                      value={filterTeam}
                      onChange={(e) => setFilterTeam(e.target.value)}
                    >
                      <option value="">All Teams ({uniqueTeams.length})</option>
                      {uniqueTeams.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div style={{ flex: "1 1 150px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.72rem",
                        color: "#888",
                        marginBottom: "4px",
                        textTransform: "uppercase",
                        fontWeight: "600",
                      }}
                    >
                      Status
                    </label>
                    <select
                      style={{ ...styles.select, width: "100%" }}
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="pending">⏳ Pending Only (Default)</option>
                      <option value="reimbursed">✓ Reimbursed Only</option>
                      <option value="all">Show All</option>
                    </select>
                  </div>
                </div>

                {/* Quick Search */}
                <div>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="Search by member name, reason, or amount..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Status Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.85rem",
                  color: "#aaa",
                  marginBottom: "10px",
                }}
              >
                <span>
                  Showing {filteredTreasurerBills.length} of {allBills.length} bill(s)
                </span>
                {(filterMember || filterTeam || filterStatus !== "pending" || searchQuery) && (
                  <button
                    type="button"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#e81b2a",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      setFilterMember("");
                      setFilterTeam("");
                      setFilterStatus("pending");
                      setSearchQuery("");
                    }}
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {loadingAll && (
                <p style={{ color: "#ccc", margin: "30px 0" }}>Loading all bills data…</p>
              )}
              {!loadingAll && filteredTreasurerBills.length === 0 && (
                <p style={{ color: "#888", margin: "30px 0", textAlign: "center" }}>
                  No bills matched the selected filters.
                </p>
              )}

              {/* Bills List for Treasurer */}
              {!loadingAll &&
                filteredTreasurerBills.map((bill) => (
                  <article
                    key={bill.id}
                    style={{
                      ...styles.billCard,
                      ...(bill.isReimbursed ? styles.billCardReimbursed : {}),
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span
                            style={{
                              fontSize: "1rem",
                              fontWeight: "700",
                              color: "#fff",
                            }}
                          >
                            {bill.name}
                          </span>
                          <span
                            style={{
                              fontSize: "0.72rem",
                              background: "rgba(255,255,255,0.08)",
                              padding: "2px 8px",
                              borderRadius: "4px",
                              color: "#bbb",
                            }}
                          >
                            {bill.team}
                          </span>
                        </div>
                        <p
                          style={{
                            margin: "6px 0 2px",
                            fontSize: "0.92rem",
                            color: "#ddd",
                            wordBreak: "break-word",
                          }}
                        >
                          {bill.reason}
                        </p>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontSize: "1.3rem",
                            fontWeight: "800",
                            color: bill.isReimbursed ? "#2ecc71" : "#ff3b30",
                          }}
                        >
                          ₹{bill.amount}
                        </div>
                        <span
                          style={
                            bill.isReimbursed
                              ? styles.badgeReimbursed
                              : styles.badgePending
                          }
                        >
                          {bill.isReimbursed ? "✓ Reimbursed" : "⏳ Pending"}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "12px",
                        paddingTop: "10px",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontSize: "0.76rem", color: "#777" }}>
                        {bill.timestamp
                          ? new Date(bill.timestamp).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                        {bill.gstCategory ? ` · ${bill.gstCategory}` : ""}
                        {bill.id ? ` · Row #${bill.id}` : ""}
                      </span>

                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        {bill.fileUrl && bill.fileUrl.startsWith("http") && (
                          <a
                            href={bill.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              ...styles.button,
                              fontSize: "0.74rem",
                              padding: "5px 10px",
                              textDecoration: "none",
                            }}
                          >
                            ↗ Bill Photo
                          </a>
                        )}

                        {/* Mark / Unmark Action */}
                        {!bill.isReimbursed ? (
                          <button
                            type="button"
                            style={{
                              ...styles.button,
                              fontSize: "0.76rem",
                              padding: "6px 12px",
                              background: "#2ecc71",
                              borderColor: "#2ecc71",
                              color: "#000",
                              fontWeight: "700",
                              cursor:
                                reimbursingId === bill.id
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                            disabled={reimbursingId === bill.id}
                            onClick={() => toggleReimburse(bill.id, true)}
                          >
                            {reimbursingId === bill.id
                              ? "Saving…"
                              : "Mark Reimbursed ✓"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            style={{
                              ...styles.button,
                              fontSize: "0.74rem",
                              padding: "5px 10px",
                              background: "rgba(255,255,255,0.05)",
                              borderColor: "rgba(255,255,255,0.15)",
                              color: "#aaa",
                              cursor:
                                reimbursingId === bill.id
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                            disabled={reimbursingId === bill.id}
                            onClick={() => toggleReimburse(bill.id, false)}
                          >
                            {reimbursingId === bill.id ? "Saving…" : "Unmark ↺"}
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
