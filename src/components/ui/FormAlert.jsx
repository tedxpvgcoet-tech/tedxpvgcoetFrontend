import React, { useEffect, useRef, useState } from "react";
import "./ui.css";

const FormAlert = ({
  type = "error",
  title,
  message,
  shake = true,
  autoDismissMs = 0,
  onClose,
  scrollIntoView = false,
  className = "",
  style = {},
}) => {
  const [isShaking, setIsShaking] = useState(shake);
  const alertRef = useRef(null);

  // Trigger shake animation when message changes or shake is true
  useEffect(() => {
    if (shake && message) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shake, message, type]);

  // Optional auto-scroll into view
  useEffect(() => {
    if (scrollIntoView && message && alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [scrollIntoView, message]);

  // Optional auto-dismiss
  useEffect(() => {
    if (autoDismissMs > 0 && message && onClose) {
      const timer = setTimeout(onClose, autoDismissMs);
      return () => clearTimeout(timer);
    }
  }, [autoDismissMs, message, onClose]);

  if (!message) return null;

  const alertClasses = [
    "ui-alert",
    `ui-alert-${type}`,
    isShaking ? "ui-shake-active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      case "warning":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      case "info":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
      case "error":
      default:
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
    }
  };

  return (
    <div ref={alertRef} className={alertClasses} style={style} role="alert">
      <span className="ui-alert-icon">{renderIcon()}</span>
      <div className="ui-alert-content">
        {title && <div className="ui-alert-title">{title}</div>}
        <div>
          {typeof message === "string"
            ? message.split("\n").map((line, idx) => (
                <p key={idx} style={{ margin: idx > 0 ? "4px 0 0" : 0 }}>
                  {line}
                </p>
              ))
            : message}
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          className="ui-alert-close"
          onClick={onClose}
          aria-label="Close notification"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default FormAlert;
