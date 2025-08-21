// src/pages/Curation.jsx
import React from "react";
import "./TechnicalCard.css";
import "../pages/Team.css"


const curationTeam = [
  {
    name: "Tanushka Bankar",
    role: "Technical Lead",
    image: require("../assets/B-W Individual/tech_tanushka.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Jagdish Prajapati",
    role: "Technical Team Member",
    image: require("../assets/B-W Individual/tech_jagdish.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/jagdish-15-prajapati/",
      instagram: "#",
      website: "https://exercism.org/profiles/jagdishdrp",
    },
  },
  {
    name: "Hussain Patanwala",
    role: "Technical Team Member",
    image: require("../assets/B-W Individual/tech_hussain.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/hussain-patanwala-9881b6328/",
      instagram: "https://www.instagram.com/hussainn_53/",
      website: "https://hussain053.github.io/Updated_Modern_Portfolio_2025/",
    },
  },
  {
    name: "Shrikant Mhaske",
    role: "Technical Team Member",
    image: require("../assets/B-W Individual/Tech_shrikant.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/shrikant-mhaske-920ab9290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Atharva Kamble",
    role: "Technical Team Member",
    image: require("../assets/B-W Individual/tech_atharva.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/atharva-kamble-10685928b/",
      instagram: "https://www.instagram.com/atharva_kamble.09/",
      website: "#",
    },
  },
 

];

const Technical = () => {
  return (
    <div className="curation-page team-page">
        <div className="title-hero">
      <h1 className="curation-title">TECHNICAL</h1>
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

export default Technical;
