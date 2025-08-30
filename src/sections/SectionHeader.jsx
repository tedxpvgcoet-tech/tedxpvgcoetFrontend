// src/components/SectionHeader.jsx
import React from "react";
import "./SectionHeader.css";

const SectionHeader = () => {
  return (
    <div className="section-header">
      <h2 className="section-header__title">
        <span className="section-header__pre">MEET THE</span>
        <span className="section-header__main">SPEAKERS</span>
      </h2>
    </div>
  );
};

export default SectionHeader;
