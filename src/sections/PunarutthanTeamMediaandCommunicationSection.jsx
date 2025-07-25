import React from "react";
import "./PunarutthanTeamLogisticsandOperationSection.css";
import FooterSection from "./FooterSection";

// Replace with actual team data and images
const teamMembers = [
   {
    name: "Dhrushti Chilveri",
    role: "Media and Communication Lead",
    img: require("../assets/M&C_Dhrushti_Chilveri.png")
  },
  {
    name: "Komal Pathare",
    role: "Media and Communication Lead",
    img: require("../assets/M&C_Komal_Pathare.png")
  },
  {
    name: "Tanmay Mare",
    role: "Member",
    img: require("../assets/M&C_Tanmay_Mare.png")
  },
  {
    name: "Yash Garve",
    role: "Member",
    img: require("../assets/M&C_Yash_Garve.png")
  },
  {
    name: "Afaan Shaikh",
    role: "Member",
    img: require("../assets/M&C_Afaan_Shaikh.png")
  },
  {
    name: "Ishika Dhorajkar",
    role: "Member",
    img: require("../assets/M&C_Ishika_Dhorajkar.png")
  },
  {
    name: "Varun Tammewar",
    role: "Member",
    img: require("../assets/M&C_Varun_Tammewar.png")
  },
 
 
  
    // Add more members as needed
];

const PunarutthanTeamMediaandCommunicationSection = () => {
  return (
    <section className="team-section">
      <div className="team-section-dum">

      <h2>Media and Communication</h2>
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

export default PunarutthanTeamMediaandCommunicationSection;
