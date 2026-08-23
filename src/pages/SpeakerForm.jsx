import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import backgroundVideo from "../assets/backgrounds/background.mp4";

import FooterSection from "../sections/Common/FooterSection";
import { FiExternalLink } from "react-icons/fi";
import {
  Input,
  Textarea,
  Button,
  FormAlert,
  FormGrid,
} from "../components/ui";

const SpeakerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    domain: "",
    organization: "",
    current_location: "",
    professional_affiliation: "",
    speaker_bio: "",
    previous_ted_talk: "",
    theme_alignment: "",
    additional_info: "",
    linkedin: "",
    instagram: "",
    phone_number: "",
    portfolio: "",
    audience_impact: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const timer = setTimeout(() => {
      alert(
        "🚫 Speaker nominations for Drishti (TEDxPVGCOET 2025) are now closed.\nThank you for your interest in being part of our journey.\nWe look forward to your application next time.\nStay connected, and keep spreading Ideas Worth Spreading!",
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

      setStatus({
        type: "success",
        message: "Thank you! Your speaker nomination has been submitted successfully.",
      });

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        age: "",
        domain: "",
        organization: "",
        current_location: "",
        professional_affiliation: "",
        speaker_bio: "",
        previous_ted_talk: "",
        theme_alignment: "",
        additional_info: "",
        linkedin: "",
        instagram: "",
        phone_number: "",
        portfolio: "",
        audience_impact: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({
        type: "error",
        message: error.message || "Failed to submit nomination. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="hero-container1">
      <Helmet defer={false}>
        <title>Speaker Nomination | TEDxPVGCOET</title>
      </Helmet>
      <video autoPlay loop muted playsInline className="hero-video1">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <main className="form-page">
        <div className="para">
          <h2>Theme for TEDxPVGCOET 2025-2026:</h2>
          <br />
          <br />

          <p>
            The theme for <strong>TEDxPVGCOET 2025</strong> is{" "}
            <strong>"Drishti (दृष्टि)"</strong>, a Sanskrit word that means
            vision or perspective. But this isn’t just about what we see with
            our eyes—it’s about how we understand, interpret, and connect with
            the world around us. Drishti is about looking beyond the surface to
            find deeper meaning and clarity.
            <br />
            <br />
            In a fast-paced world full of noise and distraction, Drishti asks us
            to slow down, reflect, and truly see—ourselves, others, and the
            challenges we face. It’s about shifting perspective, finding insight
            in unexpected places, and discovering new ways of thinking, feeling,
            and acting.
            <br />
            <br />
            For more details about the theme check out this document:
            <br />
            <a
              href="https://docs.google.com/document/d/1Sw1Fh00eBpIFEEyjzYP6uHSiJABevaSqhiyfg0tmFh8/edit?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              Theme Document&nbsp;
              <FiExternalLink size={12} />
            </a>
            <br />
            <br />
            <strong> Date:</strong> September 13th, 2025&nbsp;&nbsp;
            <strong> Location:</strong> PVGCOET, Pune, Maharashtra, India
            <br />
          </p>
        </div>
        <div className="form-inner">
          <h1>Registrations have been closed for TEDxPVGCOET2025</h1>

          {status.message && (
            <FormAlert
              type={status.type}
              message={status.message}
              onClose={() => setStatus({ type: "", message: "" })}
              scrollIntoView
            />
          )}

          <form className="speaker-form-container" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="Your Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />

            <FormGrid>
              <Input
                label="Age"
                type="number"
                name="age"
                placeholder="Age"
                required
                value={formData.age}
                onChange={handleChange}
              />
              <Input
                label="Domain"
                type="text"
                name="domain"
                placeholder="Domain"
                required
                value={formData.domain}
                onChange={handleChange}
              />
            </FormGrid>

            <Input
              label="Organization"
              type="text"
              name="organization"
              placeholder="Organization"
              required
              value={formData.organization}
              onChange={handleChange}
              fullWidth
            />

            <Input
              label="Current Location / City"
              type="text"
              name="current_location"
              placeholder="Current Location/City"
              required
              value={formData.current_location}
              onChange={handleChange}
              fullWidth
            />

            <Input
              label="Professional Affiliation / Title"
              type="text"
              name="professional_affiliation"
              placeholder="Professional Affiliation/Title"
              required
              value={formData.professional_affiliation}
              onChange={handleChange}
              fullWidth
            />

            <Textarea
              label="How do you think your talk will impact or inspire the audience?"
              name="audience_impact"
              placeholder="Provide details on audience impact"
              required
              rows={3}
              value={formData.audience_impact}
              onChange={handleChange}
              fullWidth
            />

            <Textarea
              label="Speaker's Bio (Briefly describe your professional background and current occupation)"
              name="speaker_bio"
              placeholder="Brief professional biography"
              required
              rows={3}
              value={formData.speaker_bio}
              onChange={handleChange}
              fullWidth
            />

            <Textarea
              label="Have you given a TED or TEDx talk before? If yes, please provide details."
              name="previous_ted_talk"
              placeholder="Previous TED/TEDx talks or 'None'"
              required
              rows={2}
              value={formData.previous_ted_talk}
              onChange={handleChange}
              fullWidth
            />

            <Textarea
              label="How will your talk align with this year's TEDxPVGCOET theme 'Drishti'?"
              name="theme_alignment"
              placeholder="Describe theme alignment"
              required
              rows={3}
              value={formData.theme_alignment}
              onChange={handleChange}
              fullWidth
            />

            <Textarea
              label="Any Additional Comments or Information:"
              name="additional_info"
              placeholder="Any additional details..."
              rows={2}
              value={formData.additional_info}
              onChange={handleChange}
              fullWidth
            />

            <FormGrid>
              <Input
                label="Phone Number"
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                required
                value={formData.phone_number}
                onChange={handleChange}
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </FormGrid>

            <FormGrid>
              <Input
                label="Instagram Profile"
                type="url"
                name="instagram"
                placeholder="https://instagram.com/..."
                value={formData.instagram}
                onChange={handleChange}
              />
              <Input
                label="LinkedIn Profile"
                type="url"
                name="linkedin"
                placeholder="https://linkedin.com/in/..."
                value={formData.linkedin}
                onChange={handleChange}
              />
            </FormGrid>

            <FormGrid>
              <Input
                label="Portfolio / Website Link"
                type="url"
                name="portfolio"
                placeholder="https://..."
                value={formData.portfolio}
                onChange={handleChange}
              />
              <div style={{ display: "flex", alignItems: "flex-end", marginBottom: "1.25rem" }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  loading={submitting}
                  loadingText="Submitting..."
                >
                  Submit Nomination
                </Button>
              </div>
            </FormGrid>
          </form>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default SpeakerForm;
