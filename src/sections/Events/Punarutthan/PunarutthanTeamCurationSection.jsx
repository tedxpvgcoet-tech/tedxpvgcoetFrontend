import PunarutthanTeamGrid from "./PunarutthanTeamGrid";
const teamMembers = [
  {
    name: "Aniket Gaudgaul",
    role: "Curation Lead",
    img: require("../../../assets/team/Curation_Aniket_Gaudgal.webp"),
  },
  {
    name: "Ankita Renuse",
    role: "Curation Lead",
    img: require("../../../assets/team/Curation_Ankita_Renuse.webp"),
  },
  {
    name: "Girija Awate",
    role: "Member",
    img: require("../../../assets/team/Curation_Girija_Awate.webp"),
  },
  {
    name: "Pushkar Tipre",
    role: "Member",
    img: require("../../../assets/team/Curation_Pushkar_Tipre.webp"),
  },
  {
    name: "Monisha Aurora",
    role: "Member",
    img: require("../../../assets/team/Curation_Monisha_Aurora.webp"),
  },
  {
    name: "Aakash Joshi",
    role: "Member",
    img: require("../../../assets/team/Curation_Aakash_Joshi.webp"),
  },
  {
    name: "Sanavi Sonwane",
    role: "Member",
    img: require("../../../assets/team/Curation_Sanavi_Sonwane.webp"),
  },
  {
    name: "Yuvraj Yadav",
    role: "Member",
    img: require("../../../assets/team/Curation_Yuvraj_Yadav.webp"),
  },
  {
    name: "Swanand Nalawade",
    role: "Member",
    img: require("../../../assets/team/Curation_Swanand_Nalawade.webp"),
  },
  {
    name: "Pratik Damani",
    role: "Member",
    img: require("../../../assets/team/Curation_Pratik_Damani.webp"),
  },
];

const PunarutthanCurationSection = () => {
  return (
    <PunarutthanTeamGrid title="Team Curation" teamMembers={teamMembers} />
  );
};

export default PunarutthanCurationSection;
