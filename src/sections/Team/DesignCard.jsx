import React from "react";
import TeamGrid from "./TeamGrid";

const designTeam = [
  {
    name: "Varun Tammewar",
    role: "Design & Production Head",
    image: require("../../assets/B-W Individual/dnp_varun (1)-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/varun-tammewar-41a191225",
      instagram: "https://www.instagram.com/varruunnnnnn",
    },
  },
  {
    name: "Lakshmikant Chaudhari",
    role: "Design & Production Head",
    image: require("../../assets/B-W Individual/Dnp_laksh-small.webp"),
    social: {
      linkedin: "https://in.linkedin.com/in/lakshmikant-chaudhari-506453285",
      instagram: "https://www.instagram.com/laksh.me.kant_c",
    },
  },
  {
    name: "Anuj Kale",
    role: "Design & Production Team Member",
    image: require("../../assets/B-W Individual/dnp_anuj-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/anuj-kale-672532291",
      instagram: "https://www.instagram.com/anujxkale",
    },
  },
  {
    name: "Sutirth Doshi",
    role: "Design & Production Team Member",
    image: require("../../assets/B-W Individual/Dnp_sutirth-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/sutirthdoshi",
      instagram: "https://www.instagram.com/sutirthdoshi",
    },
  },
  {
    name: "Anuj Wagh",
    role: "Design & Production Team Member",
    image: require("../../assets/B-W Individual/Dnp_anujw-small.webp"),
    social: {
      instagram: "https://www.instagram.com/anujjjjj._2726_",
    },
  },
  {
    name: "Avanti Satpute",
    role: "Design & Production Team Member",
    image: require("../../assets/B-W Individual/Dnp_avanti-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/avanti-satpute-b35494317",
      instagram: "https://www.instagram.com/ss_avantii",
    },
  },
];

const Design = () => <TeamGrid title="DESIGN & PRODUCTION" members={designTeam} />;

export default Design;