import React from "react";
import "./AvantGardeSponsorsSection.css";

const sponsor = {
  name: "Muellners",
  category: "Technology Sponsor",
  description:
    "Muellners is a tech capital company which offers analytical services, Intellectual Property capital, RnD in financial technology.",
  website: "https://www.muellners.com/",
  logo: require("../../../assets/2021 Core/muellners_small.jpeg"),
};

const AvantGardeSponsorsSection = () => {
  return (
    <section className="avant-garde-sponsors">
      <div className="avant-garde-sponsors-container">
        <h2>Our Sponsors</h2>

        <div className="sponsor-card">
          <div className="sponsor-logo">
            <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
          </div>

          <div className="sponsor-content">
            <a
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="sponsor-name"
            >
              {sponsor.name}
            </a>

            <p className="sponsor-category">{sponsor.category}</p>

            <p className="sponsor-description">{sponsor.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvantGardeSponsorsSection;
