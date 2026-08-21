import React from "react";
import { Helmet } from "react-helmet";
import AvantGardeHeroSection from "../sections/Events/AvantGarde/AvantGardeHeroSection";
import AvantGardeTalksSection from "../sections/Events/AvantGarde/AvantGardeTalkSection";
import AvantGardeTeamSection from "../sections/Events/AvantGarde/AvantGardeTeamSection";

const AvantGarde = () => {
  return (
    <>
      <Helmet defer={false}>
        <title>Avant Garde | TEDxPVGCOET</title>
      </Helmet>
      <div id="page-top" />
      <AvantGardeHeroSection />
      <AvantGardeTalksSection />
      <AvantGardeTeamSection />
    </>
  );
};

export default AvantGarde;
