import React from "react";

const SponsorsSection = ({ sponsors, className, compact = false }) => {
  const sponsorCards = sponsors.map((sponsor) => (
    <div className="sponsor-card" key={sponsor.name}>
      <div className="sponsor-logo">
        <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
      </div>

      <div className="sponsor-content">
        {compact ? (
          <h3 className="sponsor-name">{sponsor.name}</h3>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  ));

  return (
    <section className={className}>
      <div className="sponsors-container">
        <h2>Our Sponsors</h2>
        {compact ? (
          <div className="sponsors-grid">{sponsorCards}</div>
        ) : (
          sponsorCards
        )}
      </div>
    </section>
  );
};

export default SponsorsSection;
