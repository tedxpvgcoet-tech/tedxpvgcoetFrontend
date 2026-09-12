import React from "react";
import { Helmet } from "react-helmet";
import PunarutthanHeroSection from "../sections/Events/Punarutthan/PunarutthanHeroSection";
import PunarutthanTalksSection from "../sections/Events/Punarutthan/PunarutthanTalksSection";
import PunarutthanTeamSection from "../sections/Events/Punarutthan/PunarutthanTeamSection";

const Punarutthan = () => {
  return (
    <>
      <Helmet defer={false}>
        <title>Punarutthan | TEDxPVGCOET</title>
      </Helmet>
      <div id="page-top" />
      <PunarutthanHeroSection />
      <PunarutthanTalksSection />
      <PunarutthanTeamSection />
    </>
  );
};

export default Punarutthan;
