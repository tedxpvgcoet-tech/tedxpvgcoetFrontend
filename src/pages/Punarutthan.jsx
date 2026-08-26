import React from "react";
import { Helmet } from "react-helmet";
import PunarutthanHeroSection from "../sections/Events/Punarutthan/PunarutthanHeroSection";
import PunarutthanTalksSection from "../sections/Events/Punarutthan/PunarutthanTalksSection";
import PunarutthanTeamSection from "../sections/Events/Punarutthan/PunarutthanTeamSection";
import PunarutthanTeamLogicticsandOperationSection from "../sections/Events/Punarutthan/PunaratthanTeamLogisticsandOperationSection";
import PunarutthanTeamMediaandCommunicationSection from "../sections/Events/Punarutthan/PunarutthanTeamMediaandCommunicationSection";
import PunarutthanTeamFinanceandSponsorshipSection from "../sections/Events/Punarutthan/PunarutthanTeamFinanceandSponsorshipSection";
import PunarutthanTeamEditorialSection from "../sections/Events/Punarutthan/PunarutthanTeamEditorialSection";
import PunarutthanTeamCurationSection from "../sections/Events/Punarutthan/PunarutthanTeamCurationSection";
import PunarutthanTeamDesignandProductionSection from "../sections/Events/Punarutthan/PunarutthanTeamDesignandProductionSection";

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
      <PunarutthanTeamLogicticsandOperationSection />
      <PunarutthanTeamMediaandCommunicationSection />
      <PunarutthanTeamFinanceandSponsorshipSection />
      <PunarutthanTeamEditorialSection />
      <PunarutthanTeamCurationSection />
      <PunarutthanTeamDesignandProductionSection />
    </>
  );
};

export default Punarutthan;
