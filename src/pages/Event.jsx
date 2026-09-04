import React from "react";
import { Helmet } from "react-helmet";
import ScrollToTop from "../components/ScrollToTop";
import EventHeroSection from "../sections/Events/Common/EventHeroSection";
import PastEventSection from "../sections/Events/PastEvents/PastEventSection";
import FooterSection from "../sections/Common/FooterSection";

// Import event images
import leapImg from "../assets/Event/Take-the-leap-bg-1.webp";
import avantGardeImg from "../assets/backgrounds/AvantGarde-bg.webp";
import punarutthanImg from "../assets/backgrounds/Punarutthan-bg.webp";

const pastEvents = [
  {
    id: "take-the-leap",
    title: "Take the Leap",
    year: "2020",
    desc: "Take The Leap! encourages us to unleash passion, challenge limits, and discover life's full potential.",
    image: leapImg,
    link: "/events/TakeTheLeap",
    alt: "Take the Leap Event",
  },
  {
    id: "avant-garde",
    title: "Avant Garde",
    year: "2021",
    desc: '"Avant Garde" embraces bold, unconventional ideas and celebrates those ahead of their time. It invites us to think differently and challenge the norm.',
    image: avantGardeImg,
    link: "/events/AvantGarde",
    alt: "Avant Garde Event",
  },
  {
    id: "punarutthan",
    title: "Punarutthan",
    year: "2023",
    desc: "“Punarutthan” stands for revival and renewal, drawing from deep cultural roots. It invites us to rethink, rebuild, and reimagine a better future.",
    image: punarutthanImg,
    link: "/events/Punarutthan",
    alt: "Punarutthan Event",
  },
];

const Event = () => {
  return (
    <div id="page-top" className="event-page">
      <Helmet defer={false}>
        <title>Events | TEDxPVGCOET</title>
      </Helmet>
      <ScrollToTop />
      <EventHeroSection />
      {pastEvents.map((event) => (
        <PastEventSection key={event.id} {...event} />
      ))}
      <FooterSection />
    </div>
  );
};

export default Event;
