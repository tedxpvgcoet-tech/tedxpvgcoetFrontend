import { useState } from "react";


import {
  Input,
  Dropdown,
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
        message: "Thank you for your interest! Our sponsorship team will contact you shortly.",
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
    "Title Sponsor",
    "Co-Sponsor",
    "Gifting Partner",
    "Media Partner",
  ];

  const rangeOptions = [
    { label: "₹10,000 - ₹50,000", value: "10k-50k" },
    { label: "₹50,000 - ₹1,00,000", value: "50k-1lakh" },
    { label: "₹1,00,000+", value: "1lakh+" },
  ];

  return (
    <main className="form-page-sponsor">
      <div className="form-inner-sponsor">
        <h1>Partner With Us</h1>

        {status.message && (
          <FormAlert
            type={status.type}
            message={status.message}
            onClose={() => setStatus({ type: "", message: "" })}
            scrollIntoView
          />
        )}

        <form className="sponsor-form-container" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />

          <Input
            label="Organization / Company Name"
            type="text"
            name="organization"
            placeholder="Organization / Company Name"
            required
            value={formData.organization}
            onChange={handleChange}
            fullWidth
          />

          <Input
            label="Designation"
            type="text"
            name="designation"
            placeholder="Designation"
            required
            value={formData.designation}
            onChange={handleChange}
            fullWidth
          />

          <FormGrid>
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Phone Number"
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              required
              value={formData.phone_number}
              onChange={handleChange}
            />
          </FormGrid>

          <Input
            label="Website / Social Media Links"
            type="url"
            name="link"
            placeholder="https://..."
            required
            value={formData.link}
            onChange={handleChange}
            fullWidth
          />

          <RadioGroup
            label="Type of Partnership Interested In"
            name="tier"
            value={formData.tier}
            onChange={handleChange}
            options={sponsorshipTiers}
            required
            fullWidth
          />

          <Dropdown
            label="Sponsorship Budget Range"
            name="range"
            value={formData.range}
            onChange={handleChange}
            options={rangeOptions}
            placeholder="Select Sponsorship Range..."
            required
            fullWidth
          />

          <Input
            label="What would you expect in return?"
            type="text"
            name="expectations"
            placeholder="What would you expect in return?"
            required
            value={formData.expectations}
            onChange={handleChange}
            fullWidth
          />

          <div style={{ margin: "1rem 0" }}>
            <Checkbox
              name="have_sponsored_before"
              label="Have you sponsored similar events before?"
              checked={formData.have_sponsored_before === "Yes"}
              onChange={handleChange}
            />

            <Checkbox
              name="consent"
              id="sponsor-consent"
              label="I consent to be contacted regarding sponsorship."
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
            loadingText="Submitting..."
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
