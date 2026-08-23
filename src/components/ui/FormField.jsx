import React from "react";
import "./ui.css";

export const FormGrid = ({ children, columns = 2, className = "", style = {} }) => {
  return (
    <div
      className={`ui-form-grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const FormField = ({
  label,
  required = false,
  optional = false,
  error,
  helperText,
  fullWidth = false,
  children,
  className = "",
  style = {},
  id,
}) => {
  const hasError = Boolean(error);

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
        <label htmlFor={id} className="ui-label">
          <span>{label}</span>
          {required && <span className="ui-label-required">*</span>}
          {optional && <span className="ui-label-optional">(Optional)</span>}
        </label>
      )}

      {children}

      {hasError && typeof error === "string" && (
        <div className="ui-error-text" role="alert">
          {error}
        </div>
      )}

      {!hasError && helperText && <div className="ui-helper-text">{helperText}</div>}
    </div>
  );
};

export default FormField;
