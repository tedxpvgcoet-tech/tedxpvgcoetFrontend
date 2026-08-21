import backgroundVideo from "../assets/backgrounds/background.mp4";
import { Helmet } from "react-helmet";
import SponsorFormSection from "../sections/Forms/SponsorFormSection";
import SponsorFeedback from "../sections/Forms/SponsorFeedback";
import FooterSection from "../sections/Common/FooterSection";

const SponsorForm = () => {
  return (
    <div className="hero-container-sponsor">
      <Helmet defer={false}>
        <title>Partner With Us | TEDxPVGCOET</title>
      </Helmet>
      <video autoPlay loop muted playsInline className="hero-video-sponsor">
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
