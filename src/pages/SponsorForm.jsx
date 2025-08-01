import backgroundVideo from "../assets/background.mp4";
import SponsorFormSection from "../sections/SponsorFormSection";
import SponsorFeedback from "../sections/SponsorFeedback";
import FooterSection from "../sections/FooterSection";

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

      // Reset the form
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
    <div className="hero-container-sponsor">
      <video autoPlay loop muted className="hero-video-sponsor">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <SponsorFormSection />
      <SponsorFeedback />
      <FooterSection />
    </div>
  );
};

export default SponsorForm;
