import { useState } from "react";
import {
  FiUser,
  FiBriefcase,
  FiAward,
  FiGlobe,
  FiMail,
  FiPhone,
  FiLayers,
  FiDownload,
} from "react-icons/fi";
import {
  Input,
  RadioGroup,
  Checkbox,
  Button,
  FormAlert,
  FormGrid,
} from "../../components/ui";

const SponsorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    designation: "",
    email: "",
    phone_number: "",
    tier: "",
    range: "",
    link: "",
    expectations: "",
    have_sponsored_before: "No",
  });

  const [submitting, setSubmitting] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const contributionOptions = [
    { label: "Cash", value: "Cash" },
    { label: "In-Kind", value: "In-Kind" },
    { label: "Both (Cash & In-Kind)", value: "Both" },
  ];

  const getAmountPlaceholder = () => {
    if (formData.tier === "In-Kind") {
      return "Enter estimated valuation of goods or services (e.g. ₹25,000)";
    }
    if (formData.tier === "Both") {
      return "Enter combined monetary and in-kind valuation (e.g. ₹50,000)";
    }
    return "Enter proposed contribution amount (e.g. ₹25,000)";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "have_sponsored_before") {
      setFormData((prev) => ({
        ...prev,
        have_sponsored_before: checked ? "Yes" : "No",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consentGiven) {
      setStatus({
        type: "warning",
        message: "Please provide consent to be contacted before submitting.",
      });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("https://www.backend.tedxpvgcoet.in/sponsor", {
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
        message:
          "Thank you for your interest! Our sponsorship team will contact you shortly.",
      });

      setFormData({
        name: "",
        organization: "",
        designation: "",
        email: "",
        phone_number: "",
        tier: "",
        range: "",
        link: "",
        expectations: "",
        have_sponsored_before: "No",
      });
      setConsentGiven(false);
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="form-page-sponsor" style={{ padding: "120px 20px 80px" }}>
      <div className="ui-glass-card">
        {/* Header Row */}
        <div className="ui-header-row">
          <div className="ui-header-title-group">
            <h1 className="ui-gradient-title">Partner With Us</h1>
            <p className="ui-subtitle">
              Collaborate with TEDxPVGCOETM to spark innovation and empower
              ideas
            </p>
          </div>
          <div className="ui-header-actions">
            <span className="ui-badge">TEDxPVGCOETM 2026</span>
            <a
              href="/Sponsorship_Brochure.pdf"
              download="TEDxPVGCOET_Sponsorship_Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ui-brochure-btn"
              title="Download Sponsorship Brochure"
            >
              <FiDownload size={15} className="ui-brochure-icon" />
              <span>Download Brochure</span>
            </a>
          </div>
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
          {/* Subcard 01: Organization & Representative */}
          <div className="ui-subcard">
            <div className="ui-subcard-header">
              <span className="ui-subcard-number">01</span>
              <FiUser size={16} color="#eb0028" />
              <h3 className="ui-subcard-title">
                Organization & Representative
              </h3>
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

            <Input
              label="Organization / Company Name"
              type="text"
              name="organization"
              placeholder="Organization or Company Name"
              prefixIcon={<FiBriefcase size={16} />}
              required
              value={formData.organization}
              onChange={handleChange}
              fullWidth
            />

            <FormGrid>
              <Input
                label="Designation / Title"
                type="text"
                name="designation"
                placeholder="e.g. Director, Marketing Lead"
                prefixIcon={<FiAward size={16} />}
                required
                value={formData.designation}
                onChange={handleChange}
              />
              <Input
                label="Website / Social Media Links"
                type="url"
                name="link"
                placeholder="https://yourcompany.com"
                prefixIcon={<FiGlobe size={16} />}
                required
                value={formData.link}
                onChange={handleChange}
              />
            </FormGrid>
          </div>

          {/* Subcard 02: Contact Information */}
          <div className="ui-subcard">
            <div className="ui-subcard-header">
              <span className="ui-subcard-number">02</span>
              <FiMail size={16} color="#eb0028" />
              <h3 className="ui-subcard-title">Contact Information</h3>
            </div>

            <FormGrid>
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="representative@company.com"
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
          </div>

          {/* Subcard 03: Partnership Details */}
          <div className="ui-subcard">
            <div className="ui-subcard-header">
              <span className="ui-subcard-number">03</span>
              <FiLayers size={16} color="#eb0028" />
              <h3 className="ui-subcard-title">Partnership Details</h3>
            </div>

            <RadioGroup
              label="How would you like to contribute?"
              name="tier"
              value={formData.tier}
              onChange={handleChange}
              options={contributionOptions}
              required
              fullWidth
            />

            <div style={{ marginTop: "1.25rem" }}>
              <Input
                label="What amount are you willing to contribute?"
                type="text"
                name="range"
                value={formData.range}
                onChange={handleChange}
                placeholder={getAmountPlaceholder()}
                required
                fullWidth
              />
            </div>

            <div style={{ marginTop: "1.25rem" }}>
              <Input
                label="What would you expect in return?"
                type="text"
                name="expectations"
                placeholder="e.g. Brand visibility, product booth, speaking slot"
                required
                value={formData.expectations}
                onChange={handleChange}
                fullWidth
              />
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Checkbox
                name="have_sponsored_before"
                label="Have you sponsored similar events before?"
                checked={formData.have_sponsored_before === "Yes"}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Consent and Submit */}
          <div style={{ margin: "1.25rem 0 1.5rem" }}>
            <Checkbox
              name="consent"
              id="sponsor-consent"
              label="I consent to be contacted regarding TEDxPVGCOETM sponsorship opportunities."
              required
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={submitting}
            loadingText="Submitting Enquiry..."
            disabled={submitting || !consentGiven}
          >
            Submit Partnership Enquiry
          </Button>
        </form>
      </div>
    </main>
  );
};

export default SponsorForm;
