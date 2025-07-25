import React from "react";
import "./PunarutthanTeamCurationSection.css";
import FooterSection from "./FooterSection";

const teamMembers = [
 {
    name: "Aniket Gaudgaul",
    role: "Curation Lead",
    img: require("../assets/Curation_Aniket_Gaudgal.png")
  },
  {
    name: "Ankita Renuse",
    role: "Curation Lead",
    img: require("../assets/Curation_Ankita_Renuse.png")
  },
   {
    name: "Girija Awate",
    role: "Member",
    img: require("../assets/Curation_Girija_Awate.png")
  },
   {
    name: "Pushkar Tipre",
    role: "Member",
    img: require("../assets/Curation_Pushkar_Tipre.png")
  },
   {
    name: "Monisha Aurora",
    role: "Member",
    img: require("../assets/Curation_Monisha_Aurora.png")
  },
   {
    name: "Aakash Joshi",
    role: "Member",
    img: require("../assets/Curation_Aakash_Joshi.png")
  },
   {
    name: "Sanavi Sonwane",
    role: "Member",
    img: require("../assets/Curation_Sanavi_Sonwane.png")
  },
   {
    name: "Yuvraj Yadav",
    role: "Member",
    img: require("../assets/Curation_Yuvraj_Yadav.png")
  },
   {
    name: "Swanand Nalawade",
    role: "Member",
    img: require("../assets/Curation_Swanand_Nalawade.png")
  },
  {
    name: "Pratik Damani",
    role: "Member",
    img: require("../assets/Curation_Pratik_Damani.png")
  },
];

const PunarutthanCurationSection = () => {
  return (
    <section className="team-section">
      <div className="team-section-dum">
        <h2>Team Curation</h2>
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

export default PunarutthanCurationSection;
