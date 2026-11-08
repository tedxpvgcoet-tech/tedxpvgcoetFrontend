import React from "react";
import { Helmet } from "react-helmet";
import PunarutthanHeroSection from "../sections/Events/Punarutthan/PunarutthanHeroSection";
import PunarutthanTalksSection from "../sections/Events/Punarutthan/PunarutthanTalksSection";
import PunarutthanTeamSection from "../sections/Events/Punarutthan/PunarutthanTeamSection";
import SponsorsSection from "../sections/Events/Common/SponsorSection";
import "../sections/Events/Punarutthan/PunarutthanSponsorSection.css";

const punarutthanSponsors = [
  {
    name: "North 37",
    category: "Sponsor",
    description:
      "Supporting TEDxPVGCOET and contributing to a vibrant event experience.",
    website: "#",
    logo: require("../assets/sponsors/north37.webp"),
  },
  {
    name: "Ganesh Bhel and Chaat",
    category: "Sponsor",
    description:
      "Adding flavour to the Punarutthan experience with their support.",
    website: "#",
    logo: require("../assets/sponsors/ganeshbhel.webp"),
  },
  {
    name: "Elite Enterprises",
    category: "Sponsor",
    description:
      "Supporting the event and helping us create a memorable experience.",
    website: "#",
    logo: require("../assets/sponsors/eliteenterprisies.webp"),
  },
  {
    name: "Delval",
    category: "Sponsor",
    description:
      "Proudly supporting TEDxPVGCOET and the Punarutthan initiative.",
    website: "#",
    logo: require("../assets/sponsors/Delval LOGO.webp"),
  },
  {
    name: "Nikol EV",
    category: "Sponsor",
    description: "Supporting innovation and meaningful ideas at TEDxPVGCOET.",
    website: "#",
    logo: require("../assets/sponsors/nikolEV.webp"),
  },
  {
    name: "Colombian Brew",
    category: "Sponsor",
    description:
      "Brewing support for an inspiring and engaging TEDx experience.",
    website: "#",
    logo: require("../assets/sponsors/colombianbrew.webp"),
  },
  {
    name: "Guru Krupa Budhani Bros. Wafers",
    category: "Sponsor",
    description: "",
    website: "#",
    logo: require("../assets/sponsors/budhani.webp"),
  },
  {
    name: "Amhi Pohekar",
    category: "Sponsor",
    description:
      "Supporting TEDxPVGCOET and celebrating ideas that inspire change.",
    website: "#",
    logo: require("../assets/sponsors/AmhiPohekar.webp"),
  },
];

const Punarutthan = () => {
  return (
    <>
      <Helmet defer={false}>
        <title>Punarutthan | TEDxPVGCOET</title>
      </Helmet>
      <div id="page-top" />
      <PunarutthanHeroSection />
      <PunarutthanTalksSection />
      <SponsorsSection
        className="punarutthan-sponsors"
        sponsors={punarutthanSponsors}
        compact
      />
      <PunarutthanTeamSection />
    </>
  );
};

export default Punarutthan;
