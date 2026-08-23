import React, { useState, useRef, useEffect } from "react";
import "./ui.css";

const Dropdown = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option...",
  required = false,
  disabled = false,
  error,
  helperText,
  fullWidth = false,
  className = "",
  style = {},
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const dropdownId = id || name || `dropdown-${Math.random().toString(36).substring(2, 9)}`;
  const hasError = Boolean(error);

  // Normalize options to [{ value, label }]
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "object" && opt !== null) {
      return {
        value: opt.value !== undefined ? opt.value : opt.label,
        label: opt.label !== undefined ? opt.label : opt.value,
      };
    }
    return { value: opt, label: String(opt) };
  });

  // Selected option label
  const selectedOption = normalizedOptions.find((opt) => String(opt.value) === String(value));
  const displayLabel = selectedOption ? selectedOption.label : "";

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (optValue) => {
    if (disabled) return;
    if (onChange) {
      // Support both event-like objects (e.target) and direct values
      const eventLike = {
        target: {
          name: name || dropdownId,
          value: optValue,
        },
      };
      // If caller expects event or value:
      onChange(eventLike);
    }
    setIsOpen(false);
  };

  const containerClasses = [
    "ui-form-field",
    fullWidth ? "ui-col-full" : "",
    hasError ? "ui-has-error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const triggerClasses = [
    "ui-dropdown-trigger",
    isOpen ? "ui-open" : "",
    disabled ? "ui-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} style={style} ref={containerRef}>
      {label && (
        <label htmlFor={dropdownId} className="ui-label">
          <span>{label}</span>
          {required && <span className="ui-label-required">*</span>}
        </label>
      )}

      <div className="ui-dropdown-container">
        <button
          type="button"
          id={dropdownId}
          className={triggerClasses}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
        >
          <span className={`ui-dropdown-label ${!displayLabel ? "ui-placeholder" : ""}`}>
            {displayLabel || placeholder}
          </span>
          <span className={`ui-dropdown-chevron ${isOpen ? "ui-rotated" : ""}`}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        {isOpen && !disabled && (
          <div className="ui-dropdown-menu" role="listbox" tabIndex={-1}>
            {normalizedOptions.length > 0 ? (
              normalizedOptions.map((opt) => {
                const isSelected = String(opt.value) === String(value);
                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    className={`ui-dropdown-option ${isSelected ? "ui-selected" : ""}`}
                    onClick={() => handleSelect(opt.value)}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="ui-dropdown-empty">No options available</div>
            )}
          </div>
        )}
      </div>

      {hasError && typeof error === "string" && (
        <div className="ui-error-text" role="alert">
          {error}
        </div>
      )}

      {!hasError && helperText && <div className="ui-helper-text">{helperText}</div>}
    </div>
  );
};

export default Dropdown;
