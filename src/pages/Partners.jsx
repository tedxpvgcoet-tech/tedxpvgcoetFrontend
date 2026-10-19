
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import SponsorFeedbackSection from "../sections/Forms/SponsorFeedbackSection";
import FooterSection from "../sections/Common/FooterSection";
import "./Partners.css";

import north37Logo from "../assets/sponsors/north37.png.png";
import ganeshBhelLogo from "../assets/sponsors/ganeshbhel.png";
import eliteLogo from "../assets/sponsors/eliteenterprisies.png";
import delvalLogo from "../assets/sponsors/Delval LOGO.png";
import nikolEVLogo from "../assets/sponsors/nikolEV.png.png";
import colombianBrewLogo from "../assets/sponsors/colombianbrew.png";
import budhaniLogo from "../assets/sponsors/budhani.png";
import amhiPohekarLogo from "../assets/sponsors/AmhiPohekar.png";

const currentSponsors = [
  { name: "North 37", logo: north37Logo },
  { name: "Ganesh Bhel and Chaat", logo: ganeshBhelLogo },
  { name: "Elite Enterprises", logo: eliteLogo },
  { name: "Delval", logo: delvalLogo },
  { name: "Nikol EV", logo: nikolEVLogo },
  { name: "Colombian Brew", logo: colombianBrewLogo },
  { name: "Guru Krupa Budhani Bros. Wafers", logo: budhaniLogo },
  { name: "Amhi Pohekar", logo: amhiPohekarLogo },
];

const previousSponsors = [
  {
    name: "Impact Mints",
    logo: require("../assets/sponsors/impactmints.png"),
  },
  {
    name: "Malpani's Bake-lite",
    logo: require("../assets/sponsors/malpanis.png"),
  },
  {
    name: "Domino's",
    logo: require("../assets/sponsors/dominos.png"),
  },
];

const SponsorGrid = ({ title, sponsors }) => (
  <section className="partners-sponsor-section">
    <h2>{title}</h2>

    <div className="partners-sponsor-grid">
      {sponsors.map((sponsor) => (
        <article className="partners-sponsor-card" key={sponsor.name}>
          <div className="partners-logo-wrap">
            <img
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              loading="lazy"
            />
          </div>

          <h3>{sponsor.name}</h3>
        </article>
      ))}
    </div>
  </section>
);

const Partners = () => {
  const allSponsors = [...currentSponsors, ...previousSponsors];

  return (
    <main className="partners-page">
      <Helmet defer={false}>
        <title>Our Partners | TEDxPVGCOET</title>
        <meta
          name="description"
          content="Meet the partners who help TEDxPVGCOET bring ideas worth spreading to life."
        />
      </Helmet>

      <section className="partners-hero">
        <p className="partners-eyebrow">TEDxPVGCOET</p>

        <h1>Ideas grow stronger together.</h1>

        <p>
          Our partners help create a space where fresh perspectives, meaningful
          conversations, and ideas worth spreading can thrive.
        </p>

        <div className="partners-hero-actions">
          <Link
            className="partners-button partners-button-primary"
            to="/sponsor"
          >
            Interested in becoming a partner
          </Link>

          <a
            className="partners-button partners-button-secondary"
            href="#previous-sponsor-feedback"
          >
            A word from our previous sponsors
          </a>
        </div>
      </section>

      <div className="partners-content">
        <SponsorGrid title="Our Sponsors" sponsors={allSponsors} />
      </div>

      <div id="previous-sponsor-feedback">
        <SponsorFeedbackSection />
      </div>

      <FooterSection />
    </main>
  );
};

export default Partners;
