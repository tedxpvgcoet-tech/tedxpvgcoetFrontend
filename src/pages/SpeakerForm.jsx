import { useState } from "react";
import backgroundVideo from "../assets/background.mp4";
import "./SpeakerForm.css";
import FooterSection from "../sections/FooterSection";

const SpeakerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    domain: "",
    organization: "",
    linkedin: "",
    instagram: "",
    phone_number: "",
    portfolio: "",
    audience_impact: "",
  });

  const [submitting, setSubmitting] = useState(false);

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

    try {
      const res = await fetch("https://www.backend.tedxpvgcoet.in/speaker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed.");
      }

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        age: "",
        domain: "",
        organization: "",
        linkedin: "",
        instagram: "",
        phone_number: "",
        portfolio: "",
        audience_impact: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="hero-container1">
      <video autoPlay loop muted className="hero-video1">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <main className="form-page">
        <div className="form-inner">
          <h1>Speaker Nomination</h1>
          <form className="speaker-form" onSubmit={handleSubmit}>
            <div className="full-width">
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="two-col">
              <input
                type="number"
                name="age"
                placeholder="Age"
                required
                value={formData.age}
                onChange={handleChange}
              />
              <input
                type="text"
                name="domain"
                placeholder="Domain"
                required
                value={formData.domain}
                onChange={handleChange}
              />
            </div>

            <div className="full-width">
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                required
                value={formData.organization}
                onChange={handleChange}
              />
            </div>

            <div className="full-width">
              <h3>How do you think your talk will impact or inspire the audience?</h3>
              <br />
              <input
                type="text"
                name="audience_impact"
                placeholder="Answer"
                required
                value={formData.audience_impact}
                onChange={handleChange}
              />
            </div>

            <div className="two-col">
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                required
                value={formData.phone_number}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="two-col">
              <input
                type="url"
                name="instagram"
                placeholder="Instagram Profile URL"
                value={formData.instagram}
                onChange={handleChange}
              />
              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn Profile URL"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="two-col">
              <input
                type="url"
                name="portfolio"
                placeholder="Portfolio Link"
                value={formData.portfolio}
                onChange={handleChange}
              />
              <button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default SpeakerForm;
