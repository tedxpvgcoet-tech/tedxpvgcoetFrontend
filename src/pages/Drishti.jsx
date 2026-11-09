import React from "react";
import { Helmet } from "react-helmet";
import PerspectiveSection from "../sections/Common/PerspectiveSection";
import DrishtiSection from "../sections/Events/Drishti/DrishtiSection";
import Speaker from "../sections/Forms/Speaker";
import Booknow from "../sections/Booknow";
import DrishtiVideo from "../sections/Events/Drishti/DrishtiVideo";
import TeamHeroSection from "../sections/Team/TeamHeroSection";

const Drishti = () => {
  return (
    <div id="page-top" className="drishti-page">
      <Helmet defer={false}>
        <title>Drishti | TEDxPVGCOET</title>
      </Helmet>
      <Booknow />
      <DrishtiVideo />
      <DrishtiSection />
      <Speaker />
      <TeamHeroSection isEventSection={true} />
      <PerspectiveSection />
    </div>
  );
};

export default Drishti;
