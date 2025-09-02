import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./SponsorFeedback.css";



const SponsorFeedback = () => {
  const [consent, setConsent] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
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
    alert("Thank you for your feedback!");
    setFormData({
      name: "",
      email: "",
      comments: "",
      consent: false,
    });
    setRating(0);
    setHovered(null);
  };

  return (
    <section className="feedback-section">
      <h2>We value your feedback</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label className="star-label">Rate your experience:</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={
                (hovered || rating) >= star ? "star filled" : "star"
              }
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </div>

        <textarea
          name="comments"
          placeholder="Any suggestions or feedback?"
          value={formData.comments}
          onChange={handleChange}
        ></textarea>

        <div className="consent-label">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          <label htmlFor="consent">I agree to be contacted in the future.</label>
        </div>


        <button type="submit">Submit Feedback</button>
      </form>
    </section>
  );
};

export default SponsorFeedback;
