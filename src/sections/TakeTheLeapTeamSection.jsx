import React from "react";
import "./TeamSection.css";
import FooterSection from "../sections/FooterSection";

// Replace with actual team data and images
const teamMembers = [
  {
    name: "Atharva Dhekne",
    role: "Licencee & Lead Organizer",
    img: require("../assets/2021 Core/lice-atharva-dhekne.png")
  },
  {
    name: "Chaitanya Damane",
    role: "Co-organizer",
    img: require("../assets/2021 Core/co-org-chaitanya-damame.png")
  },
  {
    name: "Malay Khare",
    role: "Treasurer",
    img: require("../assets/2021 Core/tres-malay-khare.png")
  },
  
  {
    name: "Vedant Khake",
    role: "Logistics & Operations Lead",
    img: require("../assets/2021 Core/L&O-vedant-khake.png")
  },
  {
    name: "Advait Madhekar",
    role: "Logistics & Operations Lead",
    img: require("../assets/2021 Core/L&O-advait-madhekar.png")
  },
  {
    name: "Prashant Sureja",
    role: "Logistics & Operations Lead",
    img: require("../assets/2021 Core/L&O-prashant-sureja.png")
  },
   {
    name: "Kshitij Chitnis",
    role: "Media & Communications Lead",
    img: require("../assets/2021 Core/M&C-kshitij-chitnis.png")
  },
   {
    name: "Pranav Jagtap",
    role: "Media & Communications Lead",
    img: require("../assets/2021 Core/M&C-pranav-jagtap.png")
  },
   {
    name: "Rohan Wangikar",
    role: "Media & Communications Lead",
    img: require("../assets/2021 Core/M&C-rohan-wangikar.png")
  },
   {
    name: "Taraquee Nalawade",
    role: "Finance Lead",
    img: require("../assets/2021 Core/Finance-taraquee-nalawade.png")
  },
   {
    name: "Anurag Modak",
    role: "Curation & Editorial Lead",
    img: require("../assets/2021 Core/Cu&Ed-anurag-modak.png")
  },
   {
    name: "Priyanka Gujar",
    role: "Curation & Editorial Lead",
    img: require("../assets/2021 Core/Cu&Ed-priyanka-gujar.png")
  },


 
  // Add more members as needed
];

const AvantGardeTeamSection = () => {
  return (
    <section className="team-section3">
        <div className="team-section3-dum">

      <h2>Core Team</h2>
      <div className="team-grid3">
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
      <FooterSection />
    </section>
  );
};

export default AvantGardeTeamSection;
