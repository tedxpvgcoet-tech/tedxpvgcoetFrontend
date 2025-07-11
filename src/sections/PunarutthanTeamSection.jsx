import React from "react";
import "./PunarutthanTeamSection.css";
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
  {
    name: "Ayushi Chougule",
    role: "Logistics and Operation Lead",
    img: require("../assets/L&O_Ayushi_Chougule.png")
  },
  {
    name: "Kasturi Bhandare",
    role: "Logistics and Operation Lead",
    img: require("../assets/L&O_Kasturi_Bhandare.png")
  },
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
    name: "Ved Dalvi",
    role: "Finance & Sponsorship Lead",
    img: require("../assets/F&S_Ved_Dalvi.png")
  },
  {
    name: "Aditya Bhambe",
    role: "Editorial Lead",
    img: require("../assets/ED_Aditya_Bhambe.png")
  },
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
    name: "Nirjara Mhaskar",
    role: "Design & Production Lead",
    img: require("../assets/D&P_Nirjara_Mhaskar.png")
  },
  {
    name: "Ayush Koparde",
    role: "Design & Production Lead",
    img: require("../assets/D&P_Ayush_Koparde.png")
  },
  // Add more members as needed
];

const PunarutthanTeamSection = () => {
  return (
    <section className="team-section">
      <div className="team-section-dum">

      <h2>Core Team</h2>
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
      <FooterSection />
    </section>
  );
};

export default PunarutthanTeamSection;
