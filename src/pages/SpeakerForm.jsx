import { useState } from "react";
import backgroundVideo from "../assets/background.mp4";
import "./SpeakerForm.css";
import FooterSection from "../sections/FooterSection";
import { FiExternalLink } from "react-icons/fi";

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
            and acting. Whether in our personal lives, work, or relationships,
            this kind of vision leads to transformation.
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
              <input
                type="text"
                name="current_location"
                placeholder="Current Location/City"
                required
                value={formData.current_location}
                onChange={handleChange}
              />
            </div>

            <div className="full-width">
              <input
                type="text"
                name="professional_affiliation"
                placeholder="Professional Affiliation/Title"
                required
                value={formData.professional_affiliation}
                onChange={handleChange}
              />
            </div>

            <div className="full-width">
              <h3>
                How do you think your talk will impact or inspire the audience?
              </h3>
              <br />
              <input
                name="audience_impact"
                placeholder="Answer"
                required
                value={formData.audience_impact}
                onChange={handleChange}
              />
            </div>

            <div className="full-width">
              <h3>
                Speaker's Bio (Briefly describe your professional background and
                current occupation)
              </h3>
              <br />
              <input
                name="speaker_bio"
                placeholder="Answer"
                required
                value={formData.speaker_bio}
                onChange={handleChange}
              />
            </div>

            <div className="full-width">
              <h3>
                Have you given a TED or TEDx talk before? If yes, please provide
                details.
              </h3>
              <br />
              <input
                name="previous_ted_talk"
                placeholder="Answer"
                required
                value={formData.previous_ted_talk}
                onChange={handleChange}
              />
            </div>

            <div className="full-width">
              <h3>
                How will your talk align with this year's TEDxPVGCOET theme
                "Drishti"?
              </h3>
              <br />
              <input
                name="theme_alignment"
                placeholder="Answer"
                required
                value={formData.theme_alignment}
                onChange={handleChange}
              />
            </div>

            <div className="full-width">
              <h3>Any Additional Comments or Information:</h3>
              <br />
              <input
                name="additional_info"
                placeholder="Answer"
                required
                value={formData.additional_info}
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
