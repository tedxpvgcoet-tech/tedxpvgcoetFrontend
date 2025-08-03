// src/pages/CoreTeam.jsx
import React from "react";
import "./OrganizersCard.css";
import "../pages/Team.css"

const coreTeamMembers = [
  {
    name: "Abhijeet Thore",
    role: "Licensee, Organizer",
    image: require("../assets/B-W Individual/core_abhijeet.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Avani Thakur",
    role: "Co Organizer",
    image: require("../assets/B-W Individual/core_avani.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Aarya Gandhe",
    role: "Treasurer",
    image: require("../assets/B-W Individual/core_aarya.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
];

const CoreTeam = () => {
  return (
    <div className="core-team-page team-page">
      <div className="core-team-hero">
        <h1 className="demo">TEAM ORGANIZERS</h1>
      </div>
      <div className="core-team-grid">
        {coreTeamMembers.map((member, index) => {
          const isEvenRow = Math.floor(index / 2) % 2 === 0;
          const isLeft = index % 2 === 0;
          
          const renderImage = (
            <div className="core-team-img-tile" key={`${index}-img`}>
              <img src={member.image} alt={member.name} className="core-team-img" />
            </div>
          );
          
          const renderInfo = (
            <div className="core-team-info-tile" key={`${index}-info`}>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              {member.social && (
                <div className="core-team-social-icons">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noreferrer">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  )}
                  {member.social.instagram && (
                    <a href={member.social.instagram} target="_blank" rel="noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                  {member.social.website && (
                    <a href={member.social.website} target="_blank" rel="noreferrer">
                      <i className="fas fa-user"></i>
                    </a>
                  )}
                </div>
              )}
            </div>
          );
          
          return isEvenRow
            ? [renderImage, renderInfo]
            : [renderInfo, renderImage];
        })}
      </div>
    </div>
  );
};

export default CoreTeam;