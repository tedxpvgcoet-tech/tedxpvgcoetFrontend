import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
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

function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  searchable = false,
  searchPlaceholder = "Search...",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen, searchable]);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm.trim()) return options;
    const term = searchTerm.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(term) ||
        (opt.subLabel && opt.subLabel.toLowerCase().includes(term)),
    );
  }, [options, searchable, searchTerm]);

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "relative",
        width: "100%",
        zIndex: isOpen ? 60 : 1,
        userSelect: "none",
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          background: isOpen
            ? "rgba(255, 255, 255, 0.09)"
            : "rgba(255, 255, 255, 0.05)",
          border: isOpen
            ? "1px solid #eb0028"
            : "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: isOpen ? "0 0 0 2px rgba(235, 0, 40, 0.25)" : "none",
          borderRadius: 8,
          padding: "8px 12px",
          color: "#fff",
          fontSize: "0.85rem",
          cursor: "pointer",
          outline: "none",
          transition: "all 0.2s ease",
          boxSizing: "border-box",
          textAlign: "left",
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            overflow: "hidden",
            flex: 1,
          }}
        >
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: selectedOption ? "#fff" : "rgba(255, 255, 255, 0.5)",
              fontWeight: selectedOption ? 500 : 400,
            }}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.subLabel && (
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                padding: "2px 6px",
                borderRadius: 4,
                flexShrink: 0,
                background: selectedOption.isPending
                  ? "rgba(245, 158, 11, 0.18)"
                  : "rgba(46, 204, 113, 0.18)",
                color: selectedOption.isPending ? "#fbbf24" : "#4ade80",
                border: selectedOption.isPending
                  ? "1px solid rgba(245, 158, 11, 0.35)"
                  : "1px solid rgba(46, 204, 113, 0.35)",
              }}
            >
              {selectedOption.subLabel}
            </span>
          )}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            flexShrink: 0,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            opacity: 0.7,
            color: "#fff",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 100,
            background: "rgba(18, 19, 26, 0.98)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            borderRadius: 10,
            boxShadow:
              "0 18px 40px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            maxHeight: "300px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {searchable && (
            <div
              style={{
                padding: "8px 10px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.02)",
              }}
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "100%",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  borderRadius: 6,
                  padding: "6px 10px",
                  color: "#fff",
                  fontSize: "0.8rem",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: '"Inter", sans-serif',
                }}
              />
            </div>
          )}

          <div
            style={{
              overflowY: "auto",
              maxHeight: searchable ? "240px" : "280px",
              padding: "4px",
            }}
          >
            {filteredOptions.length === 0 ? (
              <div
                style={{
                  padding: "12px 14px",
                  fontSize: "0.82rem",
                  color: "#888",
                  textAlign: "center",
                }}
              >
                No options found
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                      padding: "8px 10px",
                      borderRadius: 6,
                      fontSize: "0.83rem",
                      cursor: "pointer",
                      color: isSelected ? "#fff" : "rgba(255, 255, 255, 0.88)",
                      background: isSelected
                        ? "rgba(235, 0, 40, 0.22)"
                        : "transparent",
                      borderLeft: isSelected
                        ? "3px solid #eb0028"
                        : "3px solid transparent",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background =
                          "rgba(255, 255, 255, 0.08)";
                        e.currentTarget.style.color = "#ffffff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color =
                          "rgba(255, 255, 255, 0.88)";
                      }
                    }}
                  >
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontWeight: isSelected ? 600 : 400,
                      }}
                    >
                      {opt.label}
                    </span>

                    {opt.subLabel && (
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          padding: "2px 6px",
                          borderRadius: 4,
                          flexShrink: 0,
                          background: opt.isPending
                            ? "rgba(245, 158, 11, 0.18)"
                            : "rgba(46, 204, 113, 0.18)",
                          color: opt.isPending ? "#fbbf24" : "#4ade80",
                          border: opt.isPending
                            ? "1px solid rgba(245, 158, 11, 0.35)"
                            : "1px solid rgba(46, 204, 113, 0.35)",
                        }}
                      >
                        {opt.subLabel}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

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
    const email = (userEmail || localStorage.getItem("BRIDGE_EMAIL") || "")
      .toLowerCase()
      .trim();
    return TREASURER_EMAILS.includes(email);
  });
  const [loading, setLoading] = useState(true);
  const [loadingAll, setLoadingAll] = useState(false);
  const [error, setError] = useState("");
  const [sendingEmailType, setSendingEmailType] = useState(""); // "pending" | "all" | ""
  const [requestingId, setRequestingId] = useState("");
  const [reimbursingId, setReimbursingId] = useState("");
  const [notice, setNotice] = useState("");

  // Treasurer Query Modal state
  const [queryModalBill, setQueryModalBill] = useState(null);
  const [queryInput, setQueryInput] = useState("");
  const [sendingQuery, setSendingQuery] = useState(false);

  // Photo Proxy Modal state
  const [photoModal, setPhotoModal] = useState({
    isOpen: false,
    bill: null,
    loading: false,
    data: null,
    error: "",
  });

  // Lock background scroll when any modal is open
  useEffect(() => {
    if (queryModalBill || photoModal.isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [queryModalBill, photoModal.isOpen]);

  // Treasurer Filters
  const [filterMember, setFilterMember] = useState("");
  const [filterTeam, setFilterTeam] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending"); // "pending" | "reimbursed" | "queried" | "all"
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
      query: (b.query || b.treasurerQuery || "").trim(),
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
      const parsed = Array.isArray(result.bills)
        ? result.bills.map(parseBill)
        : [];
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
        throw new Error(
          result.error || "Could not load all bills for treasurer.",
        );
      }
      const parsed = Array.isArray(result.bills)
        ? result.bills.map(parseBill)
        : [];
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
        },
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Could not update reimbursement status.",
        );
      }

      // Update state in allBills and bills locally
      const updater = (list) =>
        list.map((b) =>
          b.id === billId ? { ...b, isReimbursed: targetState } : b,
        );
      setAllBills(updater);
      setBills(updater);

      setNotice(
        targetState
          ? `Bill #${billId} marked as Reimbursed (1) in Google Sheets.`
          : `Bill #${billId} reverted to Pending.`,
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
          : "Complete record of ALL your submitted bills has been emailed to you!",
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

  // Send Query to Member (Treasurer Action)
  const handleSendQuery = async (e) => {
    if (e) e.preventDefault();
    if (!queryModalBill || !queryInput.trim()) return;

    setSendingQuery(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(
        `${getApiUrl()}/bills/${encodeURIComponent(queryModalBill.id)}/query`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            message: queryInput.trim(),
            memberName: queryModalBill.name,
          }),
        },
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Could not send query to member.");
      }

      const updatedMsg = queryInput.trim();
      const updater = (list) =>
        list.map((b) =>
          b.id === queryModalBill.id ? { ...b, query: updatedMsg } : b,
        );
      setAllBills(updater);
      setBills(updater);

      setNotice(
        `Query emailed to ${queryModalBill.name} and logged in Google Sheets!`,
      );
      setQueryModalBill(null);
      setQueryInput("");
    } catch (queryErr) {
      setError(queryErr.message || "Failed to send query.");
    } finally {
      setSendingQuery(false);
    }
  };

  // Open & Load Receipt Photo via Backend Proxy (On Demand)
  const openPhotoModal = async (bill) => {
    if (!bill || !bill.fileUrl) return;
    setPhotoModal({
      isOpen: true,
      bill,
      loading: true,
      data: null,
      error: "",
    });

    try {
      const response = await fetch(`${getApiUrl()}/bills/photo-proxy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ fileUrl: bill.fileUrl }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Could not load receipt photo.");
      }
      setPhotoModal({
        isOpen: true,
        bill,
        loading: false,
        data: result,
        error: "",
      });
    } catch (photoErr) {
      setPhotoModal({
        isOpen: true,
        bill,
        loading: false,
        data: null,
        error: photoErr.message || "Failed to load receipt photo.",
      });
    }
  };

  const closePhotoModal = () => {
    setPhotoModal({
      isOpen: false,
      bill: null,
      loading: false,
      data: null,
      error: "",
    });
  };

  // Calculations for Personal Bills
  const userPendingBills = useMemo(
    () => bills.filter((b) => !b.isReimbursed),
    [bills],
  );
  const userPendingAmount = useMemo(
    () => userPendingBills.reduce((acc, b) => acc + b.amountNum, 0),
    [userPendingBills],
  );
  const userReimbursedAmount = useMemo(
    () =>
      bills
        .filter((b) => b.isReimbursed)
        .reduce((acc, b) => acc + b.amountNum, 0),
    [bills],
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
    return Array.from(map.values()).sort(
      (a, b) => b.totalPending - a.totalPending,
    );
  }, [allBills]);

  const uniqueTeams = useMemo(() => {
    const set = new Set();
    allBills.forEach((b) => {
      if (b.team) set.add(b.team);
    });
    return Array.from(set).sort();
  }, [allBills]);

  const memberOptions = useMemo(() => {
    return [
      { value: "", label: `All Members (${uniqueMembers.length})` },
      ...uniqueMembers.map((m) => ({
        value: m.name,
        label: m.name,
        subLabel:
          m.totalPending > 0
            ? `₹${m.totalPending.toLocaleString("en-IN")}`
            : "Settled",
        isPending: m.totalPending > 0,
      })),
    ];
  }, [uniqueMembers]);

  const teamOptions = useMemo(() => {
    return [
      { value: "", label: `All Teams (${uniqueTeams.length})` },
      ...uniqueTeams.map((t) => ({ value: t, label: t })),
    ];
  }, [uniqueTeams]);

  const statusOptions = useMemo(
    () => [
      { value: "pending", label: "⏳ Pending Only (Default)" },
      { value: "reimbursed", label: "✓ Reimbursed Only" },
      { value: "queried", label: "❓ Queried Bills" },
      { value: "all", label: "Show All" },
    ],
    [],
  );

  const filteredTreasurerBills = useMemo(() => {
    return allBills.filter((b) => {
      if (filterStatus === "pending" && b.isReimbursed) return false;
      if (filterStatus === "reimbursed" && !b.isReimbursed) return false;
      if (filterStatus === "queried" && !b.query) return false;
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
    [allBills],
  );
  const treasurerTotalReimbursed = useMemo(
    () =>
      allBills
        .filter((b) => b.isReimbursed)
        .reduce((acc, b) => acc + b.amountNum, 0),
    [allBills],
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
                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: "#888",
                          marginTop: "4px",
                        }}
                      >
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
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "#666",
                          marginTop: "2px",
                        }}
                      >
                        Total Ever Submitted: ₹
                        {userTotalAmount.toLocaleString("en-IN")} (
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
                      disabled={
                        Boolean(sendingEmailType) || userPendingAmount === 0
                      }
                      onClick={() => requestSummaryEmail(true)}
                    >
                      {sendingEmailType === "pending"
                        ? "Sending Pending Summary…"
                        : `✉️ Email Pending Bills (₹${userPendingAmount.toLocaleString(
                            "en-IN",
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
                            "en-IN",
                          )})`}
                    </button>
                  </div>
                </div>
              )}

              {loading && (
                <p style={{ color: "#ccc", margin: "30px 0" }}>
                  Loading your bills…
                </p>
              )}
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <strong
                          style={{
                            fontSize: "clamp(1.1rem, 3.5vw, 1.3rem)",
                            color: bill.isReimbursed ? "#8ee6a0" : "#ff3b30",
                            textDecoration: bill.isReimbursed
                              ? "line-through"
                              : "none",
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
                          ? new Date(bill.timestamp).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )
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

                    {bill.query && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          margin: "8px 0 6px",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          background: "rgba(245, 158, 11, 0.12)",
                          border: "1px solid rgba(245, 158, 11, 0.35)",
                          fontSize: "0.82rem",
                          color: "#fbbf24",
                        }}
                      >
                        <span style={{ fontSize: "0.95rem", flexShrink: 0 }}>
                          ❓
                        </span>
                        <div style={{ flex: 1, wordBreak: "break-word" }}>
                          <strong style={{ color: "#fef08a" }}>
                            Treasurer Query:{" "}
                          </strong>
                          {bill.query}
                          <div
                            style={{
                              fontSize: "0.72rem",
                              color: "#ccc",
                              marginTop: "3px",
                            }}
                          >
                            Please check your inbox or reply to the email sent
                            to resolve this.
                          </div>
                        </div>
                      </div>
                    )}

                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#777",
                        fontSize: "0.8rem",
                        wordBreak: "break-word",
                      }}
                    >
                      {bill.team || "Team unavailable"} ·{" "}
                      {bill.gstCategory || "Non-GST"}
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
                          cursor:
                            requestingId === bill.id
                              ? "not-allowed"
                              : "pointer",
                        }}
                        disabled={requestingId === bill.id}
                        onClick={() => requestSingleBill(bill)}
                      >
                        {requestingId === bill.id
                          ? "Sending…"
                          : "✉️ Email Receipt"}
                      </button>

                      {bill.fileUrl && bill.fileUrl.startsWith("http") && (
                        <button
                          type="button"
                          onClick={() => openPhotoModal(bill)}
                          style={{
                            ...styles.button,
                            fontSize: "0.78rem",
                            padding: "6px 12px",
                            cursor: "pointer",
                            color: "#eee",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          👁️ View Photo
                        </button>
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
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#999",
                      marginTop: "2px",
                    }}
                  >
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
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#999",
                      marginTop: "2px",
                    }}
                  >
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
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#999",
                      marginTop: "2px",
                    }}
                  >
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
                  <div style={{ flex: "1 1 220px", minWidth: 200 }}>
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
                    <CustomSelect
                      value={filterMember}
                      onChange={setFilterMember}
                      options={memberOptions}
                      placeholder="Select Person"
                      searchable={true}
                      searchPlaceholder="Search member..."
                    />
                  </div>

                  {/* Team Filter */}
                  <div style={{ flex: "1 1 180px", minWidth: 160 }}>
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
                    <CustomSelect
                      value={filterTeam}
                      onChange={setFilterTeam}
                      options={teamOptions}
                      placeholder="Filter Team"
                    />
                  </div>

                  {/* Status Filter */}
                  <div style={{ flex: "1 1 150px", minWidth: 150 }}>
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
                    <CustomSelect
                      value={filterStatus}
                      onChange={setFilterStatus}
                      options={statusOptions}
                      placeholder="Select Status"
                    />
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
                  Showing {filteredTreasurerBills.length} of {allBills.length}{" "}
                  bill(s)
                </span>
                {(filterMember ||
                  filterTeam ||
                  filterStatus !== "pending" ||
                  searchQuery) && (
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
                <p style={{ color: "#ccc", margin: "30px 0" }}>
                  Loading all bills data…
                </p>
              )}
              {!loadingAll && filteredTreasurerBills.length === 0 && (
                <p
                  style={{
                    color: "#888",
                    margin: "30px 0",
                    textAlign: "center",
                  }}
                >
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
                    {/* Header Row: Member Name + Team on Left, Amount on Right */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexWrap: "wrap",
                          minWidth: 0,
                          flex: 1,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.05rem",
                            fontWeight: "700",
                            color: "#fff",
                            wordBreak: "break-word",
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
                            flexShrink: 0,
                          }}
                        >
                          {bill.team}
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: "1.35rem",
                          fontWeight: "800",
                          color: bill.isReimbursed ? "#2ecc71" : "#ff3b30",
                          flexShrink: 0,
                          textAlign: "right",
                          lineHeight: 1.1,
                          letterSpacing: "0.3px",
                        }}
                      >
                        ₹{bill.amount}
                      </div>
                    </div>

                    {/* Sub-row: Reason on Left, Status Badge on Right */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "8px",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.92rem",
                          color: "#ddd",
                          wordBreak: "break-word",
                          flex: 1,
                        }}
                      >
                        {bill.reason || "No description provided"}
                      </p>

                      <span
                        style={{
                          ...(bill.isReimbursed
                            ? styles.badgeReimbursed
                            : styles.badgePending),
                          flexShrink: 0,
                        }}
                      >
                        {bill.isReimbursed ? "✓ Reimbursed" : "⏳ Pending"}
                      </span>
                    </div>

                    {/* Query Banner if bill was queried */}
                    {bill.query && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          marginTop: "8px",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          background: "rgba(245, 158, 11, 0.12)",
                          border: "1px solid rgba(245, 158, 11, 0.35)",
                          fontSize: "0.82rem",
                          color: "#fbbf24",
                        }}
                      >
                        <span style={{ fontSize: "0.95rem", flexShrink: 0 }}>
                          ❓
                        </span>
                        <div style={{ flex: 1, wordBreak: "break-word" }}>
                          <strong style={{ color: "#fef08a" }}>
                            Treasurer Query:{" "}
                          </strong>
                          {bill.query}
                        </div>
                      </div>
                    )}

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
                          ? new Date(bill.timestamp).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : ""}
                        {bill.gstCategory ? ` · ${bill.gstCategory}` : ""}
                        {bill.id ? ` · Row #${bill.id}` : ""}
                      </span>

                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        {bill.fileUrl && bill.fileUrl.startsWith("http") && (
                          <button
                            type="button"
                            onClick={() => openPhotoModal(bill)}
                            style={{
                              ...styles.button,
                              fontSize: "0.74rem",
                              padding: "5px 10px",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            👁️ View Photo
                          </button>
                        )}

                        {/* Query Member Action */}
                        <button
                          type="button"
                          style={{
                            ...styles.button,
                            fontSize: "0.74rem",
                            padding: "5px 10px",
                            background: bill.query
                              ? "rgba(245, 158, 11, 0.16)"
                              : "rgba(255, 255, 255, 0.05)",
                            borderColor: bill.query
                              ? "rgba(245, 158, 11, 0.45)"
                              : "rgba(255, 255, 255, 0.15)",
                            color: bill.query ? "#fbbf24" : "#fff",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setQueryModalBill(bill);
                            setQueryInput(
                              bill.query
                                ? bill.query.replace(/^\[.*?\]\s*/, "")
                                : "",
                            );
                          }}
                        >
                          {bill.query ? "💬 Queried ↺" : "💬 Query"}
                        </button>

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

          {/* ─── Query Modal ────────────────────────────────────────────── */}
          {queryModalBill &&
            createPortal(
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100vw",
                  height: "100vh",
                  zIndex: 999999,
                  background: "rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px",
                  animation: "fadeIn 0.2s ease",
                }}
                onClick={() => {
                  if (!sendingQuery) {
                    setQueryModalBill(null);
                    setQueryInput("");
                  }
                }}
              >
                <div
                  style={{
                    maxWidth: 500,
                    width: "100%",
                    background: "rgba(18, 19, 26, 0.98)",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    borderRadius: 14,
                    padding: "24px",
                    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8)",
                    boxSizing: "border-box",
                    color: "#fff",
                    position: "relative",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: "rgba(235, 0, 40, 0.18)",
                          border: "1px solid rgba(235, 0, 40, 0.4)",
                          color: "#ff4d4d",
                          fontSize: "0.9rem",
                        }}
                      >
                        💬
                      </span>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1.1rem",
                          fontWeight: "700",
                        }}
                      >
                        Query Member • Row #{queryModalBill.id}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setQueryModalBill(null);
                        setQueryInput("");
                      }}
                      disabled={sendingQuery}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#aaa",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        padding: "4px 8px",
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Bill Info Card */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      marginBottom: "16px",
                      fontSize: "0.85rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "4px",
                      }}
                    >
                      <strong>
                        {queryModalBill.name}{" "}
                        <span
                          style={{
                            fontSize: "0.74rem",
                            color: "#888",
                            fontWeight: "normal",
                          }}
                        >
                          ({queryModalBill.team})
                        </span>
                      </strong>
                      <span
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: "800",
                          color: "#ff4d4d",
                        }}
                      >
                        ₹{queryModalBill.amount}
                      </span>
                    </div>
                    <div style={{ color: "#aaa", fontSize: "0.82rem" }}>
                      {queryModalBill.reason}
                    </div>
                  </div>

                  {queryModalBill.query && (
                    <div
                      style={{
                        background: "rgba(245, 158, 11, 0.1)",
                        border: "1px solid rgba(245, 158, 11, 0.3)",
                        borderRadius: 8,
                        padding: "8px 12px",
                        marginBottom: "14px",
                        fontSize: "0.78rem",
                        color: "#fde68a",
                      }}
                    >
                      <strong>Existing query: </strong>
                      {queryModalBill.query}
                    </div>
                  )}

                  {/* Textarea Form */}
                  <form onSubmit={handleSendQuery}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        fontWeight: "600",
                        color: "#aaa",
                        marginBottom: "6px",
                      }}
                    >
                      Query / Message to Member:
                    </label>
                    <textarea
                      rows={4}
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                      placeholder="e.g. Please share the GST invoice, or who was this taxi ride for?"
                      required
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        background: "rgba(255, 255, 255, 0.06)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        borderRadius: 8,
                        padding: "10px 12px",
                        color: "#fff",
                        fontSize: "0.88rem",
                        fontFamily: '"Inter", sans-serif',
                        outline: "none",
                        resize: "vertical",
                        marginBottom: "12px",
                      }}
                    />

                    <div
                      style={{
                        fontSize: "0.73rem",
                        color: "#888",
                        marginBottom: "16px",
                        lineHeight: 1.4,
                      }}
                    >
                      ⚡ An email alert will be sent to{" "}
                      <strong>{queryModalBill.name}</strong> with this note and
                      bill details. A copy is CC&apos;d to Jagdish, Afaan, and
                      Ritika, and logged to Column K in Google Sheets.
                    </div>

                    {/* Action Buttons */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                      }}
                    >
                      <button
                        type="button"
                        style={styles.button}
                        disabled={sendingQuery}
                        onClick={() => {
                          setQueryModalBill(null);
                          setQueryInput("");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={sendingQuery || !queryInput.trim()}
                        style={{
                          ...styles.button,
                          background:
                            "linear-gradient(135deg, #e81b2a 0%, #a80000 100%)",
                          border: "none",
                          fontWeight: "700",
                          cursor:
                            sendingQuery || !queryInput.trim()
                              ? "not-allowed"
                              : "pointer",
                          opacity: sendingQuery || !queryInput.trim() ? 0.6 : 1,
                        }}
                      >
                        {sendingQuery
                          ? "Sending Query…"
                          : "💬 Send Email Alert"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>,
              document.body,
            )}

          {/* PHOTO PROXY MODAL (VIEW RECEIPT) */}
          {photoModal.isOpen &&
            createPortal(
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0, 0, 0, 0.88)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 100000,
                  padding: "16px",
                  boxSizing: "border-box",
                }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) closePhotoModal();
                }}
              >
                <div
                  style={{
                    background: "#101116",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "16px",
                    width: "100%",
                    maxWidth: "760px",
                    maxHeight: "92vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.9)",
                    overflow: "hidden",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 20px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.03)",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1.1rem",
                          fontWeight: "700",
                          color: "#fff",
                        }}
                      >
                        🧾 Bill Receipt
                      </h3>
                      {photoModal.bill && (
                        <p
                          style={{
                            margin: "4px 0 0",
                            fontSize: "0.82rem",
                            color: "#aaa",
                          }}
                        >
                          {photoModal.bill.name} • {photoModal.bill.team} •{" "}
                          <strong style={{ color: "#4ade80" }}>
                            ₹{photoModal.bill.amount}
                          </strong>
                          {photoModal.bill.reason
                            ? ` — "${photoModal.bill.reason}"`
                            : ""}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={closePhotoModal}
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "none",
                        color: "#fff",
                        fontSize: "1.2rem",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: 1,
                      }}
                      title="Close"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div
                    style={{
                      padding: "20px",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "260px",
                      background: "#08090c",
                    }}
                  >
                    {photoModal.loading && (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "40px 20px",
                          color: "#bbb",
                        }}
                      >
                        <div
                          className="spin-loader"
                          style={{
                            width: "38px",
                            height: "38px",
                            border: "3px solid rgba(255, 255, 255, 0.15)",
                            borderTopColor: "#e81b2a",
                            borderRadius: "50%",
                            margin: "0 auto 16px",
                          }}
                        />
                        <div style={{ fontSize: "0.95rem", fontWeight: "600" }}>
                          Loading Receipt Securely…
                        </div>
                        <div
                          style={{
                            fontSize: "0.78rem",
                            color: "#777",
                            marginTop: "6px",
                          }}
                        >
                          Fetching image via backend proxy
                        </div>
                      </div>
                    )}

                    {photoModal.error && !photoModal.loading && (
                      <div
                        style={{
                          background: "rgba(239, 68, 68, 0.12)",
                          border: "1px solid rgba(239, 68, 68, 0.35)",
                          color: "#fca5a5",
                          padding: "16px 20px",
                          borderRadius: "10px",
                          fontSize: "0.88rem",
                          textAlign: "center",
                          maxWidth: "460px",
                        }}
                      >
                        <div style={{ fontWeight: "700", marginBottom: "6px" }}>
                          ⚠️ Unable to load image preview
                        </div>
                        <div style={{ fontSize: "0.82rem", color: "#f87171" }}>
                          {photoModal.error}
                        </div>
                        {photoModal.bill?.fileUrl && (
                          <a
                            href={photoModal.bill.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              ...styles.button,
                              display: "inline-block",
                              marginTop: "12px",
                              fontSize: "0.78rem",
                              padding: "6px 12px",
                              textDecoration: "none",
                            }}
                          >
                            ↗ Try Opening Drive Link
                          </a>
                        )}
                      </div>
                    )}

                    {photoModal.data && !photoModal.loading && (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "14px",
                        }}
                      >
                        {photoModal.data.mimeType === "application/pdf" ? (
                          <iframe
                            src={`data:application/pdf;base64,${photoModal.data.base64}`}
                            title="Receipt PDF"
                            style={{
                              width: "100%",
                              height: "60vh",
                              border: "none",
                              borderRadius: "8px",
                              background: "#fff",
                            }}
                          />
                        ) : (
                          <img
                            src={`data:${photoModal.data.mimeType || "image/jpeg"};base64,${photoModal.data.base64}`}
                            alt="Receipt"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "68vh",
                              objectFit: "contain",
                              borderRadius: "8px",
                              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Modal Footer */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 20px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.02)",
                    }}
                  >
                    {photoModal.data ? (
                      <a
                        href={`data:${photoModal.data.mimeType || "application/octet-stream"};base64,${photoModal.data.base64}`}
                        download={photoModal.data.name || "receipt"}
                        style={{
                          ...styles.button,
                          fontSize: "0.8rem",
                          padding: "6px 14px",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        ⬇️ Download File
                      </a>
                    ) : (
                      <div />
                    )}

                    <button
                      type="button"
                      onClick={closePhotoModal}
                      style={{
                        ...styles.button,
                        fontSize: "0.8rem",
                        padding: "6px 16px",
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>,
              document.body,
            )}
        </section>
      </main>
    </div>
  );
}
