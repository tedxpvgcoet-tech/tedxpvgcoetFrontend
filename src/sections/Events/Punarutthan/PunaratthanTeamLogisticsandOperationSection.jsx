import PunarutthanTeamGrid from "./PunarutthanTeamGrid";

const teamMembers = [
  {
    name: "Ayushi Chougule",
    role: "Logistics and Operation Lead",
    img: require("../../../assets/team/L&O_Ayushi_Chougule.webp"),
  },
  {
    name: "Kasturi Bhandare",
    role: "Logistics and Operation Lead",
    img: require("../../../assets/team/L&O_Kasturi_Bhandare.webp"),
  },
  {
    name: "Omkar Kalburgi",
    role: "Member",
    img: require("../../../assets/team/L&O_Omkar_Kalburge.webp"),
  },
  {
    name: "Gaurav Dhande",
    role: "Member",
    img: require("../../../assets/team/L&O_Gaurav_Dhande.webp"),
  },
  {
    name: "Varad Ghumare",
    role: "Member",
    img: require("../../../assets/team/L&O_Varad_Ghumare.webp"),
  },
  {
    name: "Shruti Khumbar",
    role: "Member",
    img: require("../../../assets/team/L&O_Shruti_Kumbhar.webp"),
  },
  {
    name: "Akash Lohar",
    role: "Member",
    img: require("../../../assets/team/L&O_Akash_Lohar.webp"),
  },
  {
    name: "Apurv Kochar",
    role: "Member",
    img: require("../../../assets/team/L&O_Apurv_Kochar.webp"),
  },
  {
    name: "Janhavi Shinde",
    role: "Member",
    img: require("../../../assets/team/L&O_Janhavi_Shinde.webp"),
  },
  {
    name: "Jui Bramhe", // Corrected name, assuming it should be Jui Bramhe
    role: "Member",
    img: require("../../../assets/team/L&O_Jui_Bramhe.webp"),
  },
  {
    name: "Abhijeet Thore",
    role: "Member",
    img: require("../../../assets/team/L&O_Abhijeet_Thore.webp"),
  },
  {
    name: "Rudraunsh Joshi",
    role: "Member",
    img: require("../../../assets/team/L&O_Rudraunsh_Joshi.webp"),
  },
  // Add more members as needed
];

const PunaratthanTeamLogisticsandOperationSection = () => {
  return (
    <PunarutthanTeamGrid
      title="Team Logistics & Operation"
      teamMembers={teamMembers}
    />
  );
};

export default PunaratthanTeamLogisticsandOperationSection;
