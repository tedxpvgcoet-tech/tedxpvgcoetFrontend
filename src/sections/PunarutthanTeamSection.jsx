import React from "react";
import "./PunarutthanTeamSection.css";

// Replace with actual team data and images
const teamMembers = [
  {
    name: "Nisarg Kudgunti",
    role: "Licensee & Organizer ",
    img: require("../assets/team/Licencee_Nisarg_Kudgunti.webp")
  },
  {
    name: "Vaishnavi Habbu",
    role: "Co-organizer ",
    img: require("../assets/team/Co-organizer_Vaishnavi_Habbu.webp")
  },
  {
    name: "Atharva Ostwal",
    role: "Treasurer ",
    img: require("../assets/team/Treasurer_Atharva_Ostwal.webp")
  },
 
  
    // Add more members as needed
];

const PunarutthanTeamSection = () => {
  return (
    <section className="team-section">
      <div className="team-section-dum">

      <h2>Team Punaratthan</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.img} alt={member.name}  loading="lazy" />
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

export default PunarutthanTeamSection;
