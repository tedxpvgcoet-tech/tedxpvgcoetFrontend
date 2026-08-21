import React from "react";
import { Helmet } from "react-helmet";
import TakeTheLeapTalksSection from "../sections/Events/TakeTheLeap/TakeTheLeapTalkSection";
import TakeTheLeapHeroSection from "../sections/Events/TakeTheLeap/TakeTheLeapHeroSection";
import FooterSection from "../sections/Common/FooterSection";
import "../index.css";

const TakeTheLeap = () => {
  return (
    <div className="bg" id="page-top">
      <Helmet defer={false}>
        <title>Take The Leap | TEDxPVGCOET</title>
      </Helmet>
      <TakeTheLeapHeroSection />
      <TakeTheLeapTalksSection />
      <FooterSection />
    </div>
  );
};

export default TakeTheLeap;
