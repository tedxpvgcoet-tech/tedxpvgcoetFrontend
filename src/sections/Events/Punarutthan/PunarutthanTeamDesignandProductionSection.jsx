import PunarutthanTeamGrid from "./PunarutthanTeamGrid";
import FooterSection from "../../Common/FooterSection";

const teamMembers = [
  {
    name: "Nirjara Mhaskar",
    role: "Design & Production Lead",
    img: require("../../../assets/team/D&P_Nirjara_Mhaskar.webp"),
  },
  {
    name: "Ayush Koparde",
    role: "Design & Production Lead",
    img: require("../../../assets/team/D&P_Ayush_Koparde.webp"),
  },
  {
    name: "Sahil Batgeri",
    role: "Member",
    img: require("../../../assets/team/D&P_Sahil_Batgeri.webp"),
  },
  {
    name: "Avani Thakur",
    role: "Member",
    img: require("../../../assets/team/D&P_Avani_Thakur.webp"),
  },
  {
    name: "Vishwajit Sherkar",
    role: "Member",
    img: require("../../../assets/team/D&P_Vishwajit_Sherkar.webp"),
  },
  {
    name: "Shreenidhi Bedarkar",
    role: "Member",
    img: require("../../../assets/team/D&P_Shreenidhi_Bedarkar.webp"),
  },
  {
    name: "Vedant Joshi",
    role: "Member",
    img: require("../../../assets/team/D&P_Vedant_Joshi.webp"),
  },
  {
    name: "Shruti Natekar",
    role: "Member",
    img: require("../../../assets/team/D&P_Shruti_Natekar.webp"),
  },
  {
    name: "Rutvij Deo",
    role: "Member",
    img: require("../../../assets/team/D&P_Rutvij_Deo.webp"),
  },
];

const PunarutthanTeamDesignandProductionSection = () => {
  return (
    <PunarutthanTeamGrid
      title="Team Design & Production"
      teamMembers={teamMembers}
    />
  );
};

export default PunarutthanTeamDesignandProductionSection;