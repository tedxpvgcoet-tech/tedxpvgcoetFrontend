import React, { forwardRef } from "react";
import "./ui.css";

const Textarea = forwardRef(
  (
    {
      label,
      name,
      value,
      onChange,
      placeholder,
      required = false,
      disabled = false,
      error,
      helperText,
      rows = 4,
      fullWidth = false,
      className = "",
      textareaClassName = "",
      style = {},
      textareaStyle = {},
      id,
      ...rest
    },
    ref,
  ) => {
    const textareaId = id || name || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    const hasError = Boolean(error);

    const containerClasses = [
      "ui-form-field",
      fullWidth ? "ui-col-full" : "",
      hasError ? "ui-has-error" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const textareaClasses = ["ui-textarea", textareaClassName]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses} style={style}>
        {label && (
          <label htmlFor={textareaId} className="ui-label">
            <span>{label}</span>
            {required && <span className="ui-label-required">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={textareaClasses}
          style={textareaStyle}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          {...rest}
        />

        {hasError && typeof error === "string" && (
          <div id={`${textareaId}-error`} className="ui-error-text" role="alert">
            {error}
          </div>
        )}

        {!hasError && helperText && (
          <div id={`${textareaId}-helper`} className="ui-helper-text">
            {helperText}
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
