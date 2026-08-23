import React, { forwardRef } from "react";
import "./ui.css";

const Checkbox = forwardRef(
  (
    {
      label,
      name,
      checked,
      onChange,
      required = false,
      disabled = false,
      error,
      id,
      className = "",
      style = {},
      ...rest
    },
    ref,
  ) => {
    const checkboxId =
      id || name || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
    const hasError = Boolean(error);

    return (
      <div
        className={`ui-form-field ${hasError ? "ui-has-error" : ""} ${className}`}
        style={style}
      >
        <label htmlFor={checkboxId} className="ui-checkbox-container">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            name={name}
            checked={checked}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className="ui-checkbox-input"
            aria-invalid={hasError}
            {...rest}
          />
          <span className="ui-checkbox-box">
            <svg
              className="ui-checkbox-checkmark"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          {label && (
            <span className="ui-checkbox-label">
              {label}
              {required && (
                <span
                  className="ui-label-required"
                  style={{ marginLeft: "4px" }}
                >
                  *
                </span>
              )}
            </span>
          )}
        </label>

        {hasError && typeof error === "string" && (
          <div className="ui-error-text" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
