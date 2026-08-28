import React from "react";
import TeamGrid from "./TeamGrid";

const technicalTeam = [
  {
    name: "Tanushka Bankar",
    role: "Technical Lead",
    image: require("../../assets/B-W Individual/tech_tanushka-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/tanushka-bankar-93727731a",
      instagram: "https://www.instagram.com/tanushka_bankar",
    },
  },
  {
    name: "Jagdish Prajapati",
    role: "Technical Team Member",
    image: require("../../assets/B-W Individual/tech_jagdish-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/jagdish-15-prajapati/",
      instagram: "https://www.instagram.com/jagdish15p/",
      website: "https://exercism.org/profiles/jagdishdrp",
    },
  },
  {
    name: "Hussain Patanwala",
    role: "Technical Team Member",
    image: require("../../assets/B-W Individual/tech_hussain-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/hussain-patanwala-9881b6328/",
      instagram: "https://www.instagram.com/hussainn_53/",
      website: "https://hussain053.github.io/Updated_Modern_Portfolio_2025/",
    },
  },
  {
    name: "Shrikant Mhaske",
    role: "Technical Team Member",
    image: require("../../assets/B-W Individual/Tech_shrikant-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/shrikant-mhaske-920ab9290",
    },
  },
  {
    name: "Atharva Kamble",
    role: "Technical Team Member",
    image: require("../../assets/B-W Individual/tech_atharva-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/atharva-kamble-10685928b/",
      instagram: "https://www.instagram.com/atharva_kamble.09/",
    },
  },
];

const Technical = () => <TeamGrid title="TECHNICAL" members={technicalTeam} />;

export default Technical;
