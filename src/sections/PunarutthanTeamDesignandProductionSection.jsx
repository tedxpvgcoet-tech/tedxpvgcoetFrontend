import React from "react";
import "./PunarutthanTeamDesignandProductionSection.css";
import FooterSection from "./FooterSection";

const teamMembers = [
{
    name: "Nirjara Mhaskar",
    role: "Design & Production Lead",
    img: require("../assets/D&P_Nirjara_Mhaskar.png")
  },
  {
    name: "Ayush Koparde",
    role: "Design & Production Lead",
    img: require("../assets/D&P_Ayush_Koparde.png")
  },
   {
    name: "Sahil Batgeri",
    role: "Member",
    img: require("../assets/D&P_Sahil_Batgeri.png")
  },
  {
    name: "Avani Thakur",
    role: "Member",
    img: require("../assets/D&P_Avani_Thakur.png")
  },
  {
    name: "Vishwajit Sherkar",
    role: "Member",
    img: require("../assets/D&P_Vishwajit_Sherkar.png")
  },
  {
    name: "Shreenidhi Bedarkar",
    role: "Member",
    img: require("../assets/D&P_Shreenidhi_Bedarkar.png")
  },
  {
    name: "Vedant Joshi",
    role: "Member",
    img: require("../assets/D&P_Vedant_Joshi.png")
  },
  {
    name: "Shruti Natekar",
    role: "Member",
    img: require("../assets/D&P_Shruti_Natekar.png")
  },
   {
    name: "Rutvij Deo",
    role: "Member",
    img: require("../assets/D&P_Rutvij_Deo.png")
  },
];

const PunarutthanTeamDesignandProductionSection = () => {
  return (
    <section className="team-section">
      <div className="team-section-dum">
        <h2>Team Design and Production</h2>
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
      <FooterSection />
    </section>
  );
};

export default PunarutthanTeamDesignandProductionSection;
