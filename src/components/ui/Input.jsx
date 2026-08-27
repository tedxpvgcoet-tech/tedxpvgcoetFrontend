import React, { forwardRef } from "react";
import "./ui.css";

const Input = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      value,
      onChange,
      placeholder,
      required = false,
      disabled = false,
      error,
      helperText,
      prefixIcon,
      suffixIcon,
      fullWidth = false,
      className = "",
      inputClassName = "",
      style = {},
      inputStyle = {},
      id,
      ...rest
    },
    ref,
  ) => {
    const inputId =
      id || name || `input-${Math.random().toString(36).substring(2, 9)}`;
    const hasError = Boolean(error);

    const containerClasses = [
      "ui-form-field",
      fullWidth ? "ui-col-full" : "",
      hasError ? "ui-has-error" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inputClasses = [
      "ui-input",
      prefixIcon ? "ui-has-prefix" : "",
      suffixIcon ? "ui-has-suffix" : "",
      inputClassName,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses} style={style}>
        {label && (
          <label htmlFor={inputId} className="ui-label">
            <span>{label}</span>
            {required && <span className="ui-label-required">*</span>}
          </label>
        )}

        <div className="ui-input-wrapper">
          {prefixIcon && (
            <span className="ui-input-icon ui-input-prefix">{prefixIcon}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={inputClasses}
            style={inputStyle}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...rest}
          />
          {suffixIcon && (
            <span className="ui-input-icon ui-input-suffix">{suffixIcon}</span>
          )}
        </div>

        {hasError && typeof error === "string" && (
          <div id={`${inputId}-error`} className="ui-error-text" role="alert">
            {error}
          </div>
        )}

        {!hasError && helperText && (
          <div id={`${inputId}-helper`} className="ui-helper-text">
            {helperText}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
