import React from "react";
import "./TeamSection.css";
import FooterSection from "../sections/FooterSection";

// Replace with actual team data and images
const teamMembers = [
  {
    name: "Nisarg Kudgunti",
    role: "Licensee & Organizer ",
    img: require("../assets/Licencee_Nisarg_Kudgunti.png")
  },
  {
    name: "Vaishnavi Habbu",
    role: "Co-organizer ",
    img: require("../assets/Co-organizer_Vaishnavi_Habbu.png")
  },
  {
    name: "Atharva Ostwal",
    role: "Treasurer ",
    img: require("../assets/Treasurer_Atharva_Ostwal.png")
  },
 
  
    // Add more members as needed
];

const PunarutthanTeamSection = () => {
  return (
    <section className="team-section3">
        <div className="team-section3-dum">

      <h2>Team Punaratthan</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card3" key={index}>
            <img src={member.img} alt={member.name} />
            <div className="team-info3">
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

export default PunarutthanTeamSection;
