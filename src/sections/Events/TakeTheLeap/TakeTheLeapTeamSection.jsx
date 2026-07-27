import React from "react";
import "../../TeamSection.css";
import FooterSection from "../../Common/FooterSection";

// Replace with actual team data and images
const teamMembers = [
  {
    name: "Atharva Dhekne",
    role: "Licencee & Lead Organizer",
    img: require("../../../assets/2021 Core/lice-atharva-dhekne.webp")
  },
  {
    name: "Chaitanya Damane",
    role: "Co-organizer",
    img: require("../../../assets/2021 Core/co-org-chaitanya-damame.webp")
  },
  {
    name: "Malay Khare",
    role: "Treasurer",
    img: require("../../../assets/2021 Core/tres-malay-khare.webp")
  },
  
  {
    name: "Vedant Khake",
    role: "Logistics & Operations Lead",
    img: require("../../../assets/2021 Core/L&O-vedant-khake.webp")
  },
  {
    name: "Advait Madhekar",
    role: "Logistics & Operations Lead",
    img: require("../../../assets/2021 Core/L&O-advait-madhekar.webp")
  },
  {
    name: "Prashant Sureja",
    role: "Logistics & Operations Lead",
    img: require("../../../assets/2021 Core/L&O-prashant-sureja.webp")
  },
   {
    name: "Kshitij Chitnis",
    role: "Media & Communications Lead",
    img: require("../../../assets/2021 Core/M&C-kshitij-chitnis.webp")
  },
   {
    name: "Pranav Jagtap",
    role: "Media & Communications Lead",
    img: require("../../../assets/2021 Core/M&C-pranav-jagtap.webp")
  },
   {
    name: "Rohan Wangikar",
    role: "Media & Communications Lead",
    img: require("../../../assets/2021 Core/M&C-rohan-wangikar.webp")
  },
   {
    name: "Taraquee Nalawade",
    role: "Finance Lead",
    img: require("../../../assets/2021 Core/Finance-taraquee-nalawade.webp")
  },
   {
    name: "Anurag Modak",
    role: "Curation & Editorial Lead",
    img: require("../../../assets/2021 Core/Cu&Ed-anurag-modak.webp")
  },
   {
    name: "Priyanka Gujar",
    role: "Curation & Editorial Lead",
    img: require("../../../assets/2021 Core/Cu&Ed-priyanka-gujar.webp")
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
            <img src={member.img} alt={member.name}  loading="lazy" />
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
