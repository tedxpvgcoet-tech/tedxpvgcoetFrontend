// SubscribeSection.jsx
import React from "react";
import "./SubscribeSection.css";
import logo from "../assets/Subscirbe-logo.png"; // replace with your small logo path

export default function SubscribeSection() {
  return (
    <section className="subscribe-section">
      {/* Top‐right miniature logo */}
      <img src={logo} alt="TEDx Icon" className="subscribe-logo" />

      {/* Centered content */}
      <div className="subscribe-content">
        <h2>The Best of <span className="highlight-red">TEDxPVGCOET</span>,<br/>Straight to You</h2>
        <form className="subscribe-form">

          <input
            type="text"
            placeholder="Enter your name"
            className="subscribe-input"
          />
          
          <input
            type="email"
            placeholder="Enter your email"
            className="subscribe-input"
          />
          
          <button type="submit" className="subscribe-button">
            Receive Ideas
          </button>
        </form>
      </div>
    </section>
  );
}
