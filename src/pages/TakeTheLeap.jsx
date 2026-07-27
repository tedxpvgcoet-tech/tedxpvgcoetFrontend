import React from "react";
import TakeTheLeapTalksSection from "../sections/Events/TakeTheLeap/TakeTheLeapTalkSection";
import TakeTheLeapHeroSection from "../sections/Events/TakeTheLeap/TakeTheLeapHeroSection";
import FooterSection from "../sections/Common/FooterSection";
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