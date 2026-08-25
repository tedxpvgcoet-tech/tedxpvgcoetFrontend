import PunarutthanTeamGrid from "./PunarutthanTeamGrid";

const teamMembers = [
  {
    name: "Aditya Bhambe",
    role: "Editorial Lead",
    img: require("../../../assets/team/ED_Aditya_Bhambe.webp"),
  },
  {
    name: "Saniya Deshpande",
    role: "Member",
    img: require("../../../assets/team/ED_Saniya_Deshpande.webp"),
  },
  {
    name: "Pratik Limbekar",
    role: "Member",
    img: require("../../../assets/team/ED_Pratik_Limbekar.webp"),
  },
  {
    name: "Vaidehi Deshpande",
    role: "Member",
    img: require("../../../assets/team/ED_Vaidehi_Deshpande.webp"),
  },
  {
    name: "Prajakta Khaty",
    role: "Member",
    img: require("../../../assets/team/ED_Prajakta_Khaty.webp"),
  },
  {
    name: "Aarya Joshi",
    role: "Member",
    img: require("../../../assets/team/ED_Aarya_Joshi.webp"),
  },
  {
    name: "Vedaant Deshpande",
    role: "Member",
    img: require("../../../assets/team/ED_Vedaant_Deshpande.webp"),
  },
  {
    name: "Maitrayee Bhave",
    role: "Member",
    img: require("../../../assets/team/ED_Maitrayee_Bhave.webp"),
  },
  {
    name: "Sanidhya Adhau",
    role: "Member",
    img: require("../../../assets/team/F&S_Sanidhya_Adhau.webp"),
  },
];

const PunarutthanTeamEditorialSection = () => {
  return (
    <PunarutthanTeamGrid
      title="Team Editorial"
      teamMembers={teamMembers}
    />
  );
};

export default PunarutthanTeamEditorialSection;
