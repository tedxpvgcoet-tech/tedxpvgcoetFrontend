import React from "react";
import AvantGardeHeroSection from "../sections/Events/AvantGarde/AvantGardeHeroSection";
import AvantGardeTalksSection from "../sections/Events/AvantGarde/AvantGardeTalkSection";
import AvantGardeTeamSection from "../sections/Events/AvantGarde/AvantGardeTeamSection";

const AvantGarde = () => {
  return (
    <>
      <div id="page-top" />
      <AvantGardeHeroSection />
      <AvantGardeTalksSection />
      <AvantGardeTeamSection />
    </>
  );
};

export default AvantGarde;
