import React from "react";
import "./ui.css";

const RadioGroup = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  error,
  helperText,
  fullWidth = false,
  className = "",
  style = {},
}) => {
  const hasError = Boolean(error);

  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "object" && opt !== null) {
      return {
        value: opt.value !== undefined ? opt.value : opt.label,
        label: opt.label !== undefined ? opt.label : opt.value,
      };
    }
    return { value: opt, label: String(opt) };
  });

  const handleSelect = (optValue) => {
    if (disabled) return;
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: optValue,
          type: "radio",
        },
      });
    }
  };

  const containerClasses = [
    "ui-form-field",
    fullWidth ? "ui-col-full" : "",
    hasError ? "ui-has-error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} style={style}>
      {label && (
        <div className="ui-label">
          <span>{label}</span>
          {required && <span className="ui-label-required">*</span>}
        </div>
      )}

      <div className="ui-radio-group" role="radiogroup">
        {normalizedOptions.map((opt) => {
          const isSelected = String(value) === String(opt.value);
          return (
            <div
              key={opt.value}
              className={`ui-radio-option ${isSelected ? "ui-radio-selected" : ""}`}
              onClick={() => handleSelect(opt.value)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  handleSelect(opt.value);
                }
              }}
            >
              <span className="ui-radio-circle">
                <span className="ui-radio-dot" />
              </span>
              <span>{opt.label}</span>
            </div>
          );
        })}
      </div>

      {hasError && typeof error === "string" && (
        <div className="ui-error-text" role="alert">
          {error}
        </div>
      )}

      {!hasError && helperText && (
        <div className="ui-helper-text">{helperText}</div>
      )}
    </div>
  );
};

export default RadioGroup;
