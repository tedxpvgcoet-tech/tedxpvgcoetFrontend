import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <div className="loader-text">
        TEDx<span className="loader-x">PVGCOETM</span>
      </div>
    </div>
  );
};

export default Loader;
