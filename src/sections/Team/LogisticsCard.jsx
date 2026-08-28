import React from "react";
import TeamGrid from "./TeamGrid";

const logisticsTeam = [
  {
    name: "Rudraunsh Joshi",
    role: "Logistics & Operations Lead",
    image: require("../../assets/B-W Individual/lno_rudraunsh-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/rudraunsh-joshi",
      instagram: "https://www.instagram.com/rudraunsh._",
    },
  },
  {
    name: "Tanishka Ahirekar",
    role: "Logistics & Operations Lead",
    image: require("../../assets/B-W Individual/Lno_tanishka-small.webp"),
    social: {
      linkedin: "http://linkedin.com/in/tanishkaahirekar",
      instagram: "https://www.instagram.com/tanisshkkaa_",
    },
  },
  {
    name: "Niyati Jadhav",
    role: "Logistics & Operations Team Member",
    image: require("../../assets/B-W Individual/lno_niyati-small.webp"),
    social: {
      instagram: "https://www.instagram.com/niyati._9",
    },
  },
  {
    name: "Roanak Rajurkar",
    role: "Logistics & Operations Team Member",
    image: require("../../assets/B-W Individual/lno_roanak-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/roanak-rajurkar-150937341",
      instagram: "https://www.instagram.com/roanak.572",
    },
  },
  {
    name: "Atharva Deshmukh",
    role: "Logistics & Operations Team Member",
    image: require("../../assets/B-W Individual/lno_atharva-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/atharva-deshmukh-b4812a290",
      instagram: "https://www.instagram.com/atharvad_06",
    },
  },
  {
    name: "Alpesh Bhavar",
    role: "Logistics & Operations Team Member",
    image: require("../../assets/B-W Individual/lno_alpesh-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/alpesh-bhavar-11355428b",
      instagram: "https://www.instagram.com/alpesh_bhavar_patil",
    },
  },
  {
    name: "Ayush Deshmukh",
    role: "Logistics & Operations Team Member",
    image: require("../../assets/B-W Individual/lno_ayush-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/aayush-deshmukh1248",
      instagram: "https://www.instagram.com/aayush.3am/",
    },
  },
  {
    name: "Anish Kherdikar",
    role: "Logistics & Operations Team Member",
    image: require("../../assets/B-W Individual/lno_anish-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/anish-kherdikar-326085294",
      instagram: "https://www.instagram.com/anish_kherdikar",
    },
  },
  {
    name: "Anushka Kanade",
    role: "Logistics & Operations Team Member",
    image: require("../../assets/B-W Individual/lno_anushka-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/anushka-kanade-415614378",
      instagram: "https://www.instagram.com/iwantcheesecakeee",
    },
  },
  {
    name: "Sukrut Angal",
    role: "Logistics & Operations Team Member",
    image: require("../../assets/B-W Individual/lno_sukrut-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/sukrut-angal-a40b10290",
      instagram: "https://www.instagram.com/sukrut__07",
    },
  },
  {
    name: "Fanaa Jain",
    role: "Logistics & Operations Team Member",
    image: require("../../assets/B-W Individual/Lno_fana-small.webp"),
    social: {
      instagram: "https://www.instagram.com/fanaajain",
    },
  },
  {
    name: "Krishna Gandhi",
    role: "Logistics & Operations Team Member",
    image: require("../../assets/B-W Individual/lno_krishna-small.webp"),
    social: {
      instagram: "https://www.instagram.com/krishnagandhi_26",
    },
  },
];

const Logistics = () => (
  <TeamGrid title="LOGISTIC AND OPERATION" members={logisticsTeam} />
);

export default Logistics;
