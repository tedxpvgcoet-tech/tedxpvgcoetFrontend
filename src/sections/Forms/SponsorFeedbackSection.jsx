import "./SponsorFeedbackSection.css";

import colombianBrewLogo from "../../assets/sponsors/colombianbrew.png";
import impactMintsLogo from "../../assets/sponsors/impactmints.png";
import budhaniLogo from "../../assets/sponsors/budhani.png";
import malpanisLogo from "../../assets/sponsors/malpanis.png";
import dominosLogo from "../../assets/sponsors/dominos.png";
import ganeshBhelLogo from "../../assets/sponsors/ganeshbhel.png";
import north37Logo from "../../assets/sponsors/north37.png.png";

const sponsorFeedback = [
  {
    name: "Colombian Brew Coffee",
    logo: colombianBrewLogo,
    feedback:
      "Our association helped increase brand visibility during the event. We continued the partnership as we expanded operations, including our new warehouse.",
  },
  {
    name: "Impact Mints",
    logo: impactMintsLogo,
    feedback:
      "TEDxPVGCOETM helped us put our brand in front of a young, relevant audience, increasing our visibility and helping us reach potential new customers.",
  },
  {
    name: " Budhani Bros. Wafers",
    logo: budhaniLogo,
    feedback:
      "Smooth coordination and timely communication throughout the event. The team handled the sponsorship requirements efficiently.",
  },
  {
    name: "Malpani's Bake-lite",
    logo: malpanisLogo,
    feedback:
      "Our products received good visibility during the event, helping us reach a young and engaged audience.",
  },
  {
    name: "Domino's",
    logo: dominosLogo,
    feedback:
      "A smooth association with clear communication and well-coordinated execution throughout the event.",
  },
  {
    name: "Ganesh Bhel and Chaat",
    logo: ganeshBhelLogo,
    feedback:
      "Great booth and advertising space provided by the team during the snack break.",
  },
  {
    name: "North 37",
    logo: north37Logo,
    feedback:
      "Our association with TEDxPVGCOETM was a great experience, and we've since expanded with a new branch.",
  },
];

const SponsorFeedbackSection = () => {
  return (
    <section className="sponsor-feedback-section">
      <div className="ui-glass-card sponsor-feedback-card">
        <div className="ui-header-row">
          <div className="ui-header-title-group">
            <h2 className="ui-gradient-title">Our Previous Sponsors</h2>
            <p className="ui-subtitle">
              Hear what our previous sponsors have to say about their
              experience with TEDxPVGCOET.
            </p>
          </div>
        </div>

        <div className="sponsor-feedback-list">
          {sponsorFeedback.map((sponsor, index) => (
            <article className="ui-subcard sponsor-feedback-item" key={sponsor.name}>
              <div className="ui-subcard-header">
                <h3 className="ui-subcard-title">{sponsor.name}</h3>
              </div>

              <div className="sponsor-feedback-content">
                <div className="sponsor-feedback-logo-wrapper">
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="sponsor-feedback-logo"
                  />
                </div>

                <blockquote className="sponsor-feedback-quote">
                  <span className="sponsor-feedback-quote-mark">“</span>
                  <p>{sponsor.feedback}</p>
                  <span className="sponsor-feedback-quote-mark closing">”</span>
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorFeedbackSection;