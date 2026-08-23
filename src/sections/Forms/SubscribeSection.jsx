import React, { useState } from "react";


import logo from "../../assets/logos/Subscirbe-logo.webp";
import { Input, Button, FormAlert } from "../../components/ui";

export default function SubscribeSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("https://www.backend.tedxpvgcoet.in/subscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed.");
      }

      setStatus({
        type: "success",
        message: "You're subscribed! We'll keep you updated with the latest ideas.",
      });

      // Reset form on success
      setFormData({
        name: "",
        email: "",
      });
    } catch (err) {
      console.error("Subscription error:", err);
      setStatus({
        type: "error",
        message: err.message || "Failed to subscribe. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="subscribe-section">
      <img
        src={logo}
        alt="TEDx Icon"
        className="subscribe-logo"
        loading="lazy"
      />

      <div className="subscribe-content">
        <h2>
          The Best of <span className="highlight-red">TEDxPVGCOETM</span>,<br />
          Straight to You
        </h2>

        {status.message && (
          <FormAlert
            type={status.type}
            message={status.message}
            onClose={() => setStatus({ type: "", message: "" })}
            autoDismissMs={6000}
          />
        )}

        <form className="subscribe-form" onSubmit={handleSubmit}>
          <div className="subscribe-input-group">
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
              style={{ marginBottom: 0 }}
            />
          </div>

          <div className="subscribe-input-group">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              style={{ marginBottom: 0 }}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={submitting}
            loadingText="Subscribing..."
            className="subscribe-btn-override"
          >
            Receive Ideas
          </Button>
        </form>
      </div>
    </section>
  );
}
