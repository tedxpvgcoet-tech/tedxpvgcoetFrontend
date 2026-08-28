import React from "react";
import TeamGrid from "./TeamGrid";

const editorialTeam = [
  {
    name: "Gargee Kulkarni",
    role: "Editorial Lead",
    image: require("../../assets/B-W Individual/Edi_gargee-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/gargeesk24",
      instagram: "https://www.instagram.com/shelfrighteouss",
    },
  },
  {
    name: "Hiya Pantvaidya",
    role: "Editorial Lead",
    image: require("../../assets/B-W Individual/Edi_hiya-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/hiya-pantvaidya-8a7058332",
      instagram: "https://www.instagram.com/hiyaaa_007",
    },
  },
  {
    name: "Abhishek Rangole",
    role: "Editorial Team Member",
    image: require("../../assets/B-W Individual/edi_abhishek-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/abhishek-rangole",
      instagram: "https://www.instagram.com/rango_abhi",
    },
  },
  {
    name: "Sneha Ghodke",
    role: "Editorial Team Member",
    image: require("../../assets/B-W Individual/Edi_sneha-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/snehaganeshghodke",
      instagram: "https://www.instagram.com/the_.sg./",
    },
  },
  {
    name: "Renuka Joshi",
    role: "Editorial Team Member",
    image: require("../../assets/B-W Individual/edi_renuka-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/renuka-joshi-430541290",
      instagram: "https://www.instagram.com/renuka__",
    },
  },
  {
    name: "Raviraj Bhoge",
    role: "Editorial Team Member",
    image: require("../../assets/B-W Individual/edi_raviraj-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/raviraj-bhoge-2627722b4",
      instagram: "https://www.instagram.com/iamraviraj69",
    },
  },
  {
    name: "Omkar Hokarne",
    role: "Editorial Team Member",
    image: require("../../assets/B-W Individual/Edi_omkar-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/omkar-hokarne-0a15aa224",
      instagram: "https://www.instagram.com/_omkar_hokarne",
    },
  },
];

const Editorial = () => <TeamGrid title="EDITORIAL" members={editorialTeam} />;

export default Editorial;
