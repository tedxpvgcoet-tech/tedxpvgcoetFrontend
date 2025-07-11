import React, { useState } from "react";
import "./SubscribeSection.css";
import logo from "../assets/Subscirbe-logo.png";

export default function SubscribeSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("https://tedx-backend-tedz.onrender.com/subscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed.");
      }

      // Reset form on success
      setFormData({
        name: "",
        email: ""
      });
    } catch (err) {
      console.error("Subscription error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="subscribe-section">
      <img src={logo} alt="TEDx Icon" className="subscribe-logo" />

      <div className="subscribe-content">
        <h2>
          The Best of <span className="highlight-red">TEDxPVGCOET</span>,<br />Straight to You
        </h2>

        <form className="subscribe-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="subscribe-input"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="subscribe-input"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <button type="submit" className="subscribe-button" disabled={submitting}>
            {submitting ? "Subscribing..." : "Receive Ideas"}
          </button>
        </form>
      </div>
    </section>
  );
}
