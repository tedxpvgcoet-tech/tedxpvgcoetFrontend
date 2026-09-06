import PunarutthanTeamGrid from "./PunarutthanTeamGrid";
// Replace with actual team data and images
const teamMembers = [
  {
    name: "Ved Dalvi",
    role: "Finance & Sponsorship Lead",
    img: require("../../../assets/team/F&S_Ved_Dalvi.webp"),
  },
  {
    name: "Aarya Gandhe",
    role: "Member",
    img: require("../../../assets/team/F&S_Aarya_Gandhe.webp"),
  },
  {
    name: "Arav Petkar",
    role: "Member",
    img: require("../../../assets/team/F&S_Arav_Petkar.webp"),
  },
  {
    name: "Nishikant Toshiwal",
    role: "Member",
    img: require("../../../assets/team/F&S_Nishikant_Toshniwal.webp"),
  },
  {
    name: "Rugved Bopardikar",
    role: "Member",
    img: require("../../../assets/team/F&S_Rugved_Bopardikar.webp"),
  },
  {
    name: "Hemil Shah",
    role: "Member",
    img: require("../../../assets/team/F&S_Hemil_Shah.webp"),
  },
  {
    name: "Nachiket Kulkarni",
    role: "Member",
    img: require("../../../assets/team/F&S_Nachiket_Kulkarni.webp"),
  },
  // Add more members as needed
];

const PunarutthanTeamFinanceandSponsorshipSection = () => {
  return (
    <PunarutthanTeamGrid
      title="Team Finance & Sponsorship"
      teamMembers={teamMembers}
    />
  );
};

export default PunarutthanTeamFinanceandSponsorshipSection;
