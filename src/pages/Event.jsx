import {React,useEffect} from "react";
import EventHeroSection from "../sections/EventHeroSection";
import PastEventSection from "../sections/PastEventSection";
import PastEventSection1 from "../sections/PastEventSection1";
import PastEventSection2 from "../sections/PastEventSection2";
import ScrollToTop from "../components/ScrollToTop";



const Event = () => {

  return (
    <div id="page-top">
    
    <ScrollToTop/>
    <EventHeroSection />
    <PastEventSection2/>
    <PastEventSection1/>
    <PastEventSection />
    </div>
  );
};

export default Event;
