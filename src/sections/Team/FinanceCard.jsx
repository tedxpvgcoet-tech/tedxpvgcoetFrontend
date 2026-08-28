import React from "react";
import TeamGrid from "./TeamGrid";

const financeTeam = [
  {
    name: "Sargun Kaur Gurudatta",
    role: "Finance Lead",
    image: require("../../assets/B-W Individual/Fin_sargun-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/sargun-kaur-gurudatta-2a88931a7",
      instagram: "https://www.instagram.com/sargun__gurudatta",
    },
  },
  {
    name: "Darshan Pakhale",
    role: "Finance Team Member",
    image: require("../../assets/B-W Individual/Fin_darshan-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/darshan-pakhale-a97b12329",
    },
  },
  {
    name: "Kaustabh Nalawade",
    role: "Finance Team Member",
    image: require("../../assets/B-W Individual/fin_kaustubh-small.webp"),
    social: {
      linkedin: "http://www.linkedin.com/in/kaustubhkn",
      instagram: "http://www.instagram.com/kaustubhkn",
    },
  },
  {
    name: "Girija Awate",
    role: "Finance Team Member",
    image: require("../../assets/B-W Individual/fin_girija-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/girija-awate-6894b5217",
      instagram: "https://www.instagram.com/girija_awate1093",
    },
  },
  {
    name: "Devashree Deshpande",
    role: "Finance Team Member",
    image: require("../../assets/B-W Individual/fin_devashree-small.webp"),
    social: {
      linkedin: "http://www.linkedin.com/in/devashree-deshpande-729b30290",
      instagram: "https://www.instagram.com/devashree__23",
    },
  },
  {
    name: "Mahek Mishra",
    role: "Finance Team Member",
    image: require("../../assets/B-W Individual/Fin_mahek-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/mahek-mishra-264130340",
      instagram: "https://www.instagram.com/mahek.1726",
    },
  },
  {
    name: "Aditya Bhise",
    role: "Finance Team Member",
    image: require("../../assets/B-W Individual/fin_aditya-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/aditya-bhise-899493291",
      instagram: "https://www.instagram.com/adityabhisepatil",
    },
  },
  {
    name: "Sanidhi Gade",
    role: "Finance Team Member",
    image: require("../../assets/B-W Individual/fin_saanidhi-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/saanidhi-gade-431344241",
      instagram: "https://www.instagram.com/_.saanidhi._",
    },
  },
];

const Finance = () => <TeamGrid title="FINANCE" members={financeTeam} />;

export default Finance;