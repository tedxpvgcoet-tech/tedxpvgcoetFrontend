import React from "react";
import "./PunarutthanTeamEditorialSection.css";
import FooterSection from "./FooterSection";

const teamMembers = [
 {
    name: "Aditya Bhambe",
    role: "Editorial Lead",
    img: require("../assets/ED_Aditya_Bhambe.png")
  },
 {
    name: "Saniya Deshpande",
    role: "Member",
    img: require("../assets/ED_Saniya_Deshpande.png")
  },
   {
    name: "Pratik Limbekar",
    role: "Member",
    img: require("../assets/ED_Pratik_Limbekar.png")
  },
   {
    name: "Vaidehi Deshpande",
    role: "Member",
    img: require("../assets/ED_Vaidehi_Deshpande.png")
  },
   {
    name: "Prajakta Khaty",
    role: "Member",
    img: require("../assets/ED_Prajakta_Khaty.png")
  },
   {
    name: "Aarya Joshi",
    role: "Member",
    img: require("../assets/ED_Aarya_Joshi.png")
  },
   {
    name: "Vedaant Deshpande",
    role: "Member",
    img: require("../assets/ED_Vedaant_Deshpande.png")
  },
   {
    name: "Maitrayee Bhave",
    role: "Member",
    img: require("../assets/ED_Maitrayee_Bhave.png")
  },
   {
    name: "Sanidhya Adhau",
    role: "Member",
    img: require("../assets/F&S_Sanidhya_Adhau.png")
  },
];

const PunarutthanTeamEditorialSection = () => {
  return (
    <section className="team-section">
      <div className="team-section-dum">
        <h2>Team Editorial</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={member.name}>
              <img src={member.img} alt={`Photo of ${member.name}`} />
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

export default PunarutthanTeamEditorialSection;
