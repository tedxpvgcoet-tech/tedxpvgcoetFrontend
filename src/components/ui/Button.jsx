import React from "react";
import "./ui.css";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  style = {},
  onClick,
  ...rest
}) => {
  const buttonClasses = [
    "ui-btn",
    `ui-btn-${variant}`,
    `ui-btn-${size}`,
    fullWidth ? "ui-btn-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      style={style}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <>
          <span className="ui-spinner" aria-hidden="true" />
          <span>{loadingText || "Please wait..."}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="ui-btn-icon-left">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ui-btn-icon-right">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
