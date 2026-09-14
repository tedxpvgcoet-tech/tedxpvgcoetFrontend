import { useState } from "react";
import {
  FiUser,
  FiBriefcase,
  FiAward,
  FiGlobe,
  FiMail,
  FiPhone,
  FiLayers,
  FiLock,
  FiUnlock,
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

  const tierPackages = {
    Bronze: "₹10,000",
    Silver: "₹20,000",
    Gold: "₹40,000",
    Platinum: "₹60,000",
  };

  const handleClearTier = () => {
    setFormData((prev) => ({
      ...prev,
      tier: "",
      range: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "have_sponsored_before") {
      setFormData((prev) => ({
        ...prev,
        have_sponsored_before: checked ? "Yes" : "No",
      }));
    } else if (name === "tier") {
      if (value) {
        const lockedAmount = tierPackages[value] || "";
        setFormData((prev) => ({
          ...prev,
          tier: value,
          range: lockedAmount,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          tier: "",
          range: "",
        }));
      }
    } else if (name === "range") {
      setFormData((prev) => ({
        ...prev,
        range: value,
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

  const sponsorshipTiers = [
    { label: "Bronze (₹10,000)", value: "Bronze" },
    { label: "Silver (₹20,000)", value: "Silver" },
    { label: "Gold (₹40,000)", value: "Gold" },
    { label: "Platinum (₹60,000)", value: "Platinum" },
  ];

  return (
    <main className="form-page-sponsor" style={{ padding: "120px 20px 80px" }}>
      <div className="ui-glass-card">
        {/* Header Row */}
        <div className="ui-header-row">
          <div className="ui-header-title-group">
            <h1 className="ui-gradient-title">Partner With Us</h1>
            <p className="ui-subtitle">
              Collaborate with TEDxPVGCOET to spark innovation and empower ideas
            </p>
          </div>
          <div className="ui-header-actions">
            <span className="ui-badge">TEDxPVGCOET 2026</span>
            <a
              href="/Sponsorship_Brochure.pdf"
              download="TEDxPVGCOET_Sponsorship_Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ui-brochure-btn"
              title="Download Sponsorship Brochure"
            >
              <FiDownload size={16} className="ui-brochure-icon" />
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
              label="Sponsorship Tier"
              name="tier"
              value={formData.tier}
              onChange={handleChange}
              options={sponsorshipTiers}
              fullWidth
            />

            <div style={{ marginTop: "1.25rem" }}>
              <Input
                label={
                  formData.tier
                    ? `Sponsorship Amount (${formData.tier} Tier - Fixed)`
                    : "Sponsorship Amount / Custom Budget"
                }
                type="text"
                name="range"
                value={formData.range}
                onChange={handleChange}
                placeholder="Enter custom sponsorship amount (e.g. ₹25,000)"
                readOnly={Boolean(formData.tier)}
                required
                fullWidth
                className={`ui-tier-field ${formData.tier ? `has-tier ui-tier-${formData.tier.toLowerCase()}` : ""}`}
                suffixIcon={
                  formData.tier ? (
                    <FiLock
                      size={16}
                      color="currentColor"
                      title={`Amount locked to ${formData.tier} tier`}
                    />
                  ) : (
                    <FiUnlock
                      size={16}
                      color="#9ca3af"
                      title="Custom amount unlocked"
                    />
                  )
                }
                helperText={
                  formData.tier ? (
                    <span>
                      Amount is locked to the <strong>{formData.tier}</strong>{" "}
                      tier.{" "}
                      <button
                        type="button"
                        onClick={handleClearTier}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ff4d4d",
                          cursor: "pointer",
                          textDecoration: "underline",
                          padding: 0,
                          fontSize: "inherit",
                          fontWeight: 600,
                        }}
                      >
                        Switch to custom amount
                      </button>
                    </span>
                  ) : (
                    "No tier selected. Enter your custom sponsorship budget."
                  )
                }
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
              label="I consent to be contacted regarding TEDxPVGCOET sponsorship opportunities."
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
