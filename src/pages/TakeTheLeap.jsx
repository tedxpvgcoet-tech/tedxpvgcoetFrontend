import React from "react";
import TakeTheLeapTalksSection from "../sections/TakeTheLeapTalkSection";
import TakeTheLeapHeroSection from "../sections/TakeTheLeapHeroSection";
import FooterSection from "../sections/FooterSection";
import "../index.css"

const TakeTheLeap = () => {
  return (
    <div className="bg" id="page-top">

    <TakeTheLeapHeroSection />
    <TakeTheLeapTalksSection/>
     <FooterSection />
    </div>
  );
};

export default TakeTheLeap;