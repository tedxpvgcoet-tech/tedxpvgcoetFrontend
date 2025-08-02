// src/pages/Curation.jsx
import React from "react";
import "./CurationCard.css";
import "../pages/Team.css"


const curationTeam = [
  {
    name: "Jui Brahme",
    role: "Curation Lead",
    image: require("../assets/B-W Individual/Curation/cur_jui.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Radha Hardikar",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/Cur_radha.jpg"),
  },
  {
    name: "Samiksha Jadhav",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/Cur_samiksha.jpg"),
  },
  {
    name: "Amey Pardeshi",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/cur_amey.jpg"),
  },
  {
    name: "Rugved Dhole",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/cur_rugveda.jpg"),
  },
  {
    name: "Ritika Paradkar",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/Cur_Ritika.jpg"),
  },
  {
    name: "Archit Sonawane",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/Cur_archit.jpg"),
  },
  {
    name: "Narayani Jalgaonkar",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/cur_narayani.jpg"),
  },
  {
    name: "Ved Purohit",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/cur_ved.jpg"),
  },

];

const Curation = () => {
  return (
    <div className="curation-page team-page">
        <div className="title-hero">
      <h1 className="curation-title">CURATION</h1>
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

export default Curation;
