import React from "react";
import { Helmet } from "react-helmet";
import EventHeroSection from "../sections/Events/Common/EventHeroSection";
import PastEventSection from "../sections/Events/PastEvents/PastEventSection";
import PastEventSection1 from "../sections/Events/PastEvents/PastEventSection1";
import PastEventSection2 from "../sections/Events/PastEvents/PastEventSection2";
import ScrollToTop from "../components/ScrollToTop";

const Event = () => {
  return (
    <div id="page-top">
      <Helmet defer={false}>
        <title>Events | TEDxPVGCOET</title>
      </Helmet>
      <ScrollToTop />
      <EventHeroSection />
      <PastEventSection2 />
      <PastEventSection1 />
      <PastEventSection />
    </div>
  );
};

export default Event;
