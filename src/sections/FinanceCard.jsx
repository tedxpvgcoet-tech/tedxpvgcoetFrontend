// src/pages/Curation.jsx
import React from "react";
import "./FinanceCard.css";
import "../pages/Team.css"


const curationTeam = [
  {
    name: "Sargun Kaur Gurudatta",
    role: "Finance Lead",
    image: require("../assets/B-W Individual/Fin_sargun.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Darshan Pakhale",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/Fin_darshan.jpg"),
  },
  {
    name: "Kaustabh Nalawade",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/fin_kaustubh.jpg"),
  },
  {
    name: "Girija Awate",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/fin_girija.jpg"),
  },
  {
    name: "Devashree Deshpande",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/fin_devashree.jpg"),
  },
  {
    name: "Mahek Mishra",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/Fin_mahek.jpg"),
  },
  {
    name: "Aditya Bhise",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/fin_aditya.jpg"),
  },
  {
    name: "Sanidhi Gade",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/fin_saanidhi.jpg"),
  },
 

];

const Finance = () => {
  return (
    <div className="curation-page team-page">
        <div className="title-hero">
      <h1 className="curation-title">FINANCE</h1>
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

export default Finance;
