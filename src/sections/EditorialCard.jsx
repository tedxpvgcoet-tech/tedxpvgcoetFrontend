// src/pages/Curation.jsx
import React from "react";
import "./LogisticsCard.css";
import "../pages/Team.css"


const curationTeam = [
  {
    name: "Gargee Kulkarni",
    role: "Editorial Lead",
    image: require("../assets/B-W Individual/Edi_gargee.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Hiya Pantvaidya",
    role: "Editorial Lead",
    image: require("../assets/B-W Individual/Edi_hiya.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Abhishek Rangole",
    role: "Editorial Team Member",
    image: require("../assets/B-W Individual/edi_abhishek.jpg"),
  },
  {
    name: "Sneha Ghodke",
    role: "Editorial Team Member",
    image: require("../assets/B-W Individual/Edi_sneha.jpg"),
  },
  {
    name: "Renuka Joshi",
    role: "Editorial Team Member",
    image: require("../assets/B-W Individual/edi_renuka.jpg"),
  },
  {
    name: "Raviraj Bhoge",
    role: "Editorial Team Member",
    image: require("../assets/B-W Individual/edi_raviraj.jpg"),
  },
  {
    name: "Omkar Hokarne",
    role: "Editorial Team Member",
    image: require("../assets/B-W Individual/Edi_omkar.jpg"),
  },
 

];

const Editorial = () => {
  return (
    <div className="curation-page team-page">
        <div className="title-hero">
      <h1 className="curation-title">EDITORIAL</h1>
        </div>
     <div className="curation-grid">
  {curationTeam.map((member, index) => {
    const isEvenRow = Math.floor(index / 2) % 2 === 0;
    const isLeft = index % 2 === 0;

    const renderImage = (
      <div className="curation-img-tile" key={`${index}-img`}>
        <img src={member.image} alt={member.name} className="chessboard-img" />
      </div>
    );

    const renderInfo = (
      <div className="curation-info-tile" key={`${index}-info`}>
        <h3>{member.name}</h3>
        <p>{member.role}</p>
        {member.social && (
          <div className="social-icons">
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

export default Editorial;
