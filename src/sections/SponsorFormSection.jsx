import { useState } from "react";
import "./SponsorFormSection.css";

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
    if (!consentGiven) return;

    setSubmitting(true);

    try {
      const res = await fetch("https://tedx-backend-tedz.onrender.com/sponsor", {
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="form-page-sponsor">
      <div className="form-inner-sponsor">
        <h1>Partner With Us</h1>
        <form className="sponsor-form" onSubmit={handleSubmit}>
          <div className="full-width-sponsor">
            <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="full-width-sponsor">
            <input type="text" name="organization" placeholder="Organization / Company Name" required value={formData.organization} onChange={handleChange} />
          </div>
          <div className="full-width-sponsor">
            <input type="text" name="designation" placeholder="Designation" required value={formData.designation} onChange={handleChange} />
          </div>
          <div className="two-col-sponsor">
            <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
            <input type="text" name="phone_number" placeholder="Phone Number" required value={formData.phone_number} onChange={handleChange} />
          </div>
          <div className="full-width-sponsor">
            <input type="url" name="link" placeholder="Website / Social Media Links" required value={formData.link} onChange={handleChange} />
          </div>
          <div className="full-width-sponsor checkbox-group">
            <label>Type of Partnership Interested In:</label>
            <div>
              {["Title Sponsor", "Co-Sponsor", "Gifting Partner", "Media Partner"].map((type) => (
                <label key={type}>
                  <input type="radio" name="tier" value={type} required checked={formData.tier === type} onChange={handleChange} /> {type}
                </label>
              ))}
            </div>
          </div>
          <div className="full-width-sponsor">
            <select name="range" required value={formData.range} onChange={handleChange}>
              <option value="">Select Sponsorship Range</option>
              <option value="10k-50k">₹10,000 - ₹50,000</option>
              <option value="50k-1lakh">₹50,000 - ₹1,00,000</option>
              <option value="1lakh+">₹1,00,000+</option>
            </select>
          </div>
          <div className="full-width-sponsor">
            <input type="text" name="expectations" placeholder="What would you expect in return?" required value={formData.expectations} onChange={handleChange} />
          </div>
          <div className="full-width-sponsor">
                <div className="statements">
                  <label>
                    <input
                      type="checkbox"
                      name="have_sponsored_before"
                      checked={formData.have_sponsored_before === "Yes"}
                      onChange={handleChange}
                    />{" "}
                    Have you sponsored similar events before?
                  </label>
                </div>
              </div>

              <div className="full-width-sponsor">
                <div className="statements">
                  <label>
                    <input
                      type="checkbox"
                      required
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                    />{" "}
                    I consent to be contacted regarding sponsorship.
                  </label>
                </div>
          </div>
          <div className="full-width-sponsor">
            <button type="submit" disabled={submitting || !consentGiven}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SponsorForm;
