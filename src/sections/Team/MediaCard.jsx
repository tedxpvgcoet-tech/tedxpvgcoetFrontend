import React from "react";
import TeamGrid from "./TeamGrid";

const mediaTeam = [
  {
    name: "Afaan Shaikh",
    role: "Media & Marketing Lead",
    image: require("../../assets/B-W Individual/mnm_afaan-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/afaanshaikh",
      instagram: "https://www.instagram.com/instashebang",
    },
  },
  {
    name: "Prathamesh Jadhav",
    role: "Media & Marketing Lead",
    image: require("../../assets/B-W Individual/Mnm_prathamesh_-small.webp"),
    social: {
      linkedin: "http://linkedin.com/in/prathamesh-jadhav-51ba0b346",
      instagram: "https://www.instagram.com/prathamj_13",
    },
  },
  {
    name: "Aryan Kanse",
    role: "Media & Marketing Team Member",
    image: require("../../assets/B-W Individual/mnm_aryan-small.webp"),
    social: {
      linkedin: "http://linkedin.com/in/aryan-kanse-684618256",
      instagram: "https://www.instagram.com/aryankanse_14",
    },
  },
  {
    name: "Soham Kale",
    role: "Media & Marketing Team Member",
    image: require("../../assets/B-W Individual/mnm_sohamk-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/sohamkale",
      instagram: "https://www.instagram.com/limbu.paani.clicks",
      website:
        "https://drive.google.com/file/d/1oREASEBx7OhCGXGA44ckbVIbpreJvFu_/view?usp=drivesdk",
    },
  },
  {
    name: "Soham Patwardhan",
    role: "Media & Marketing Team Member",
    image: require("../../assets/B-W Individual/mnm_sohamp-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/soham-patwardhan-180b12270",
      instagram: "https://www.instagram.com/soham_0804",
    },
  },
  {
    name: "Ishika Dhorajkar",
    role: "Media & Marketing Team Member",
    image: require("../../assets/B-W Individual/mnm_ishika-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/ishika-dhorajkar-a47863303",
      instagram: "https://www.instagram.com/ishika_dhorajkar",
    },
  },
  {
    name: "Janhavi Salunkhe",
    role: "Media & Marketing Team Member",
    image: require("../../assets/B-W Individual/Mnm_janhvi-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/janhavi-s-49736536b",
      instagram: "https://www.instagram.com/janhaviii_salunkhe",
    },
  },
  {
    name: "Rohan Naik",
    role: "Media & Marketing Team Member",
    image: require("../../assets/B-W Individual/mnm_rohan-small.webp"),
    social: {
      linkedin: "http://www.linkedin.com/in/rohann23",
      instagram: "https://www.instagram.com/rrrrohan_n/",
    },
  },
  {
    name: "Yash Garve",
    role: "Media & Marketing Team Member",
    image: require("../../assets/B-W Individual/mnm_yash-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/yash-garve-b63492248",
      instagram: "https://www.instagram.com/fantasticyash",
    },
  },
  {
    name: "Atharva Joshi",
    role: "Media & Marketing Team Member",
    image: require("../../assets/B-W Individual/mnm_atharva-small.webp"),
    social: {
      linkedin: "https://www.linkedin.com/in/atharva-joshi-786200290",
      instagram: "https://www.instagram.com/ajcliks",
      website: "https://atharvaportfolio.carrd.co/",
    },
  },
];

const Media = () => <TeamGrid title="MEDIA & MARKETING" members={mediaTeam} />;

export default Media;