import backgroundVideo from "../assets/background.mp4";
import SponsorFormSection from "../sections/SponsorFormSection";
import SponsorFeedback from "../sections/SponsorFeedback";
import FooterSection from "../sections/FooterSection";

const SponsorForm = () => {
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
