import React from "react";
import { Helmet } from "react-helmet";
import AvantGardeHeroSection from "../sections/Events/AvantGarde/AvantGardeHeroSection";
import AvantGardeTalksSection from "../sections/Events/AvantGarde/AvantGardeTalkSection";
import AvantGardeTeamSection from "../sections/Events/AvantGarde/AvantGardeTeamSection";
import SponsorsSection from "../sections/Events/Common/SponsorSection";
import "../sections/Events/AvantGarde/AvantGardeSponsorSection.css";

const avantGardeSponsors = [
  {
    name: "Muellners",
    category: "Technology Sponsor",
    description:
      "Muellners is a tech capital company which offers analytical services, Intellectual Property capital, RnD in financial technology.",
    website: "https://www.muellners.com/",
    logo: require("../assets/sponsors/muellners.png"),
  },
];

const AvantGarde = () => {
  return (
    <>
      <Helmet defer={false}>
        <title>Avant Garde | TEDxPVGCOET</title>
      </Helmet>

      <div id="page-top" />

      <AvantGardeHeroSection />
      <AvantGardeTalksSection />

      <SponsorsSection
        className="avant-garde-sponsors"
        sponsors={avantGardeSponsors}
      />

      <AvantGardeTeamSection />
    </>
  );
};

export default AvantGarde;
