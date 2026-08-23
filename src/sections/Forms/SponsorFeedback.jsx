import React, { useState } from "react";
import { FaStar } from "react-icons/fa";


import {
  Input,
  Textarea,
  Checkbox,
  Button,
  FormAlert,
} from "../../components/ui";

const SponsorFeedback = () => {
  const [consent, setConsent] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comments: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) {
      setStatus({
        type: "warning",
        message: "Please agree to the contact consent before submitting feedback.",
      });
      return;
    }

    setStatus({
      type: "success",
      message: "Thank you for your valuable feedback!",
    });

    setFormData({
      name: "",
      email: "",
      comments: "",
      consent: false,
    });
    setRating(0);
    setHovered(null);
    setConsent(false);
  };

  return (
    <section className="feedback-section">
      <h2>We value your feedback</h2>

      {status.message && (
        <FormAlert
          type={status.type}
          message={status.message}
          onClose={() => setStatus({ type: "", message: "" })}
          autoDismissMs={5000}
        />
      )}

      <form className="feedback-form" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />

        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />

        <div className="ui-form-field">
          <label className="star-label">Rate your experience:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={(hovered || rating) >= star ? "star filled" : "star"}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </div>
        </div>

        <Textarea
          name="comments"
          placeholder="Any suggestions or feedback?"
          value={formData.comments}
          onChange={handleChange}
          rows={3}
          fullWidth
        />

        <Checkbox
          name="consent"
          id="feedback-consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          label="I agree to be contacted in the future."
          required
        />

        <Button type="submit" variant="primary" size="lg" fullWidth>
          Submit Feedback
        </Button>
      </form>
    </section>
  );
};

export default SponsorFeedback;
