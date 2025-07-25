import React from "react";
import "./PunarutthanTeamFinanceandSponsorshipSection.css";
import FooterSection from "./FooterSection";

// Replace with actual team data and images
const teamMembers = [
 {
    name: "Ved Dalvi",
    role: "Finance & Sponsorship Lead",
    img: require("../assets/F&S_Ved_Dalvi.png")
  },
  {
    name: "Aarya Gandhe",
    role: "Member",
    img: require("../assets/F&S_Aarya_Gandhe.png")
  },
  {
    name: "Arav Petkar",
    role: "Member",
    img: require("../assets/F&S_Arav_Petkar.png")
  },
  {
    name: "Nishikant Toshiwal",
    role: "Member",
    img: require("../assets/F&S_Nishikant_Toshniwal.png")
  },
  {
    name: "Rugved Bopardikar",
    role: "Member",
    img: require("../assets/F&S_Rugved_Bopardikar.png")
  },
  {
    name: "Hemil Shah",
    role: "Member",
    img: require("../assets/F&S_Hemil_Shah.png")
  },
  {
    name: "Nachiket Kulkarni",
    role: "Member",
    img: require("../assets/F&S_Nachiket_Kulkarni.png")
  },
    // Add more members as needed
];

const PunarutthanTeamFinanceandSponsorshipSection = () => {
  return (
    <section className="team-section">
      <div className="team-section-dum">

      <h2>Team Finance and Sponsorship</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.img} alt={member.name} />
            <div className="team-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
      
    </section>
  );
};

export default PunarutthanTeamFinanceandSponsorshipSection;
