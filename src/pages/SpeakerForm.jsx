import { useState } from "react";
import { Helmet } from "react-helmet";
import backgroundVideo from "../assets/backgrounds/background.mp4";

import FooterSection from "../sections/Common/FooterSection";
import {
  FiExternalLink,
  FiUser,
  FiBriefcase,
  FiMapPin,
  FiMic,
  FiShare2,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiInstagram,
  FiGlobe,
  FiCalendar,
} from "react-icons/fi";
import { Input, Textarea, Button, FormAlert, FormGrid } from "../components/ui";

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
        message:
          "Thank you! Your speaker nomination has been submitted successfully.",
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
        message:
          error.message || "Failed to submit nomination. Please try again.",
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

      <main className="form-page" style={{ padding: "120px 20px 80px" }}>
        <div className="ui-glass-card">
          {/* Header Row */}
          <div className="ui-header-row">
            <div>
              <h1 className="ui-gradient-title">Speaker Nomination</h1>
              <p className="ui-subtitle">
                Share your voice and ideas worth spreading on the TEDx stage
              </p>
            </div>
            <span className="ui-badge">TEDxPVGCOET 2026</span>
          </div>

          {status.message && (
            <FormAlert
              type={status.type}
              message={status.message}
              onClose={() => setStatus({ type: "", message: "" })}
              scrollIntoView
              style={{ marginBottom: "24px" }}
            />
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Section 1: Speaker Information */}
            <div className="ui-subcard">
              <div className="ui-subcard-header">
                <span className="ui-subcard-number">01</span>
                <FiUser size={16} color="#eb0028" />
                <h3 className="ui-subcard-title">Speaker Information</h3>
              </div>

              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="Your Full Name"
                prefixIcon={<FiUser size={16} />}
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
                  label="Domain / Field"
                  type="text"
                  name="domain"
                  placeholder="e.g. Technology, Art, Science"
                  required
                  value={formData.domain}
                  onChange={handleChange}
                />
              </FormGrid>

              <Input
                label="Organization / Institute"
                type="text"
                name="organization"
                placeholder="Current Organization or University"
                prefixIcon={<FiBriefcase size={16} />}
                required
                value={formData.organization}
                onChange={handleChange}
                fullWidth
              />

              <FormGrid>
                <Input
                  label="Current Location / City"
                  type="text"
                  name="current_location"
                  placeholder="e.g. Pune, Maharashtra"
                  prefixIcon={<FiMapPin size={16} />}
                  required
                  value={formData.current_location}
                  onChange={handleChange}
                />
                <Input
                  label="Professional Designation / Title"
                  type="text"
                  name="professional_affiliation"
                  placeholder="e.g. Founder, Researcher, Architect"
                  required
                  value={formData.professional_affiliation}
                  onChange={handleChange}
                />
              </FormGrid>
            </div>

            {/* Section 2: Talk & Experience */}
            <div className="ui-subcard">
              <div className="ui-subcard-header">
                <span className="ui-subcard-number">02</span>
                <FiMic size={16} color="#eb0028" />
                <h3 className="ui-subcard-title">Talk & Experience</h3>
              </div>

              <Textarea
                label="Audience Impact"
                helperText="How do you think your talk will impact or inspire the audience?"
                name="audience_impact"
                placeholder="Describe key takeaways and the core inspirational message..."
                required
                rows={3}
                value={formData.audience_impact}
                onChange={handleChange}
                fullWidth
              />

              <Textarea
                label="Speaker's Bio"
                helperText="Briefly describe your professional background, milestones, and current occupation."
                name="speaker_bio"
                placeholder="Concise professional biography..."
                required
                rows={3}
                value={formData.speaker_bio}
                onChange={handleChange}
                fullWidth
              />

              <Textarea
                label="Previous Speaking Experience"
                helperText="Have you given a TED or TEDx talk before? (Mention 'None' if first time)"
                name="previous_ted_talk"
                placeholder="Details of previous talks or 'None'..."
                required
                rows={2}
                value={formData.previous_ted_talk}
                onChange={handleChange}
                fullWidth
              />

              <Textarea
                label="Additional Comments or Information"
                name="additional_info"
                placeholder="Any additional context, special requirements, or links..."
                rows={2}
                value={formData.additional_info}
                onChange={handleChange}
                fullWidth
              />
            </div>

            {/* Section 3: Contact & Social Profiles */}
            <div className="ui-subcard">
              <div className="ui-subcard-header">
                <span className="ui-subcard-number">03</span>
                <FiShare2 size={16} color="#eb0028" />
                <h3 className="ui-subcard-title">Contact & Social Profiles</h3>
              </div>

              <FormGrid>
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  prefixIcon={<FiMail size={16} />}
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone_number"
                  placeholder="+91 98765 43210"
                  prefixIcon={<FiPhone size={16} />}
                  required
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </FormGrid>

              <FormGrid>
                <Input
                  label="LinkedIn Profile"
                  type="url"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/..."
                  prefixIcon={<FiLinkedin size={16} />}
                  value={formData.linkedin}
                  onChange={handleChange}
                />
                <Input
                  label="Instagram Profile"
                  type="url"
                  name="instagram"
                  placeholder="https://instagram.com/..."
                  prefixIcon={<FiInstagram size={16} />}
                  value={formData.instagram}
                  onChange={handleChange}
                />
              </FormGrid>

              <Input
                label="Portfolio / Website Link"
                type="url"
                name="portfolio"
                placeholder="https://yourportfolio.com"
                prefixIcon={<FiGlobe size={16} />}
                value={formData.portfolio}
                onChange={handleChange}
                fullWidth
              />
            </div>

            <div style={{ marginTop: "28px" }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={submitting}
                loadingText="Submitting Nomination..."
              >
                Submit Speaker Nomination
              </Button>
            </div>
          </form>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default SpeakerForm;
