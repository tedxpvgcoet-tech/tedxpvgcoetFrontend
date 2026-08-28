import React from "react";
import TeamGrid from "./TeamGrid";

const curationTeam = [
  {
    name: "Jui Brahme",
    role: "Curation Lead",
    image: require("../../assets/B-W Individual/Curation/cur_jui.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/jui-brahme-7a4a18215",
      instagram: "https://www.instagram.com/___.juiiiib.___",
    },
  },
  {
    name: "Radha Hardikar",
    role: "Curation Lead",
    image: require("../../assets/B-W Individual/Curation/Cur_radha.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/radha-hardikar-4054a323a",
      instagram: "https://www.instagram.com/raradha.jpg",
    },
  },
  {
    name: "Samiksha Jadhav",
    role: "Curation Team Member",
    image: require("../../assets/B-W Individual/Curation/Cur_samiksha.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/samiksha-jadhav-1b2998339",
      instagram: "https://www.instagram.com/samikshaj._",
    },
  },
  {
    name: "Amey Pardeshi",
    role: "Curation Team Member",
    image: require("../../assets/B-W Individual/Curation/cur_amey.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/amey-pardeshi-5169252b2",
      instagram: "https://www.instagram.com/binging._.bad",
    },
  },
  {
    name: "Rugved Dhole",
    role: "Curation Team Member",
    image: require("../../assets/B-W Individual/Curation/cur_rugveda.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/rugveda-dhole-7a7052324",
      instagram: "https://www.instagram.com/rug_veda2020",
    },
  },
  {
    name: "Ritika Paradkar",
    role: "Curation Team Member",
    image: require("../../assets/B-W Individual/Curation/Cur_Ritika.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/ritika-paradkar-6aa9b1322",
      instagram: "https://www.instagram.com/ritikaaa.1111",
    },
  },
  {
    name: "Archit Sonawane",
    role: "Curation Team Member",
    image: require("../../assets/B-W Individual/Curation/Cur_archit.webp"),
    social: {
      linkedin: "#",
      instagram: "https://www.instagram.com/_archit._._",
    },
  },
  {
    name: "Narayani Jalgaonkar",
    role: "Curation Team Member",
    image: require("../../assets/B-W Individual/Curation/cur_narayani.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/narayani-j-b5081936a",
      instagram: "https://www.instagram.com/narayani_02",
    },
  },
  {
    name: "Ved Purohit",
    role: "Curation Team Member",
    image: require("../../assets/B-W Individual/Curation/cur_ved.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/ved-vivek-purohit-592802338",
      instagram: "https://www.instagram.com/ved_vadak04",
    },
  },
];

const Curation = () => <TeamGrid title="CURATION" members={curationTeam} />;

export default Curation;