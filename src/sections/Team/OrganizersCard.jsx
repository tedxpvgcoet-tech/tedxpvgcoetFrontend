import React from "react";
import TeamGrid from "./TeamGrid";

const coreTeamMembers = [
  {
    name: "Abhijeet Thore",
    role: "Licensee, Organizer",
    image: require("../../assets/B-W Individual/core_abhijeet-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/abhijeet-thore-98909924a",
      instagram: "https://www.instagram.com/abhijeet_thore2704",
    },
  },
  {
    name: "Avani Thakur",
    role: "Co Organizer",
    image: require("../../assets/B-W Individual/core_avani-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/avani-thakur-81b6351b2",
      instagram: "https://www.instagram.com/avani_thakur68",
    },
  },
  {
    name: "Aarya Gandhe",
    role: "Treasurer",
    image: require("../../assets/B-W Individual/core_aarya-small.webp"),
    social: {
      linkedin: "http://linkedin.com/in/aarya-gandhe",
      instagram: "https://www.instagram.com/aarya_aaaaaaaa",
    },
  },
];

const CoreTeam = () => (
  <TeamGrid title="TEAM ORGANIZERS" members={coreTeamMembers} isTwoColumn={true} />
);

export default CoreTeam;
