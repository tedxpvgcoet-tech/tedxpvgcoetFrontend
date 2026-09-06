import PunarutthanTeamGrid from "./PunarutthanTeamGrid";
// Replace with actual team data and images
const teamMembers = [
  {
    name: "Dhrushti Chilveri",
    role: "Media and Communication Lead",
    img: require("../../../assets/team/M&C_Dhrushti_Chilveri.webp"),
  },
  {
    name: "Komal Pathare",
    role: "Media and Communication Lead",
    img: require("../../../assets/team/M&C_Komal_Pathare.webp"),
  },
  {
    name: "Tanmay Mare",
    role: "Member",
    img: require("../../../assets/team/M&C_Tanmay_Mare.webp"),
  },
  {
    name: "Yash Garve",
    role: "Member",
    img: require("../../../assets/team/M&C_Yash_Garve.webp"),
  },
  {
    name: "Afaan Shaikh",
    role: "Member",
    img: require("../../../assets/team/M&C_Afaan_Shaikh.webp"),
  },
  {
    name: "Ishika Dhorajkar",
    role: "Member",
    img: require("../../../assets/team/M&C_Ishika_Dhorajkar.webp"),
  },
  {
    name: "Varun Tammewar",
    role: "Member",
    img: require("../../../assets/team/M&C_Varun_Tammewar.webp"),
  },

  // Add more members as needed
];

const PunarutthanTeamMediaandCommunicationSection = () => {
  return (
    <PunarutthanTeamGrid
      title="Team Media & Communication"
      teamMembers={teamMembers}
    />
  );
};

export default PunarutthanTeamMediaandCommunicationSection;
