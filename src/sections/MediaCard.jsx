// src/pages/Curation.jsx
import React from "react";
import "./MediaCard.css";
import "../pages/Team.css"


const curationTeam = [
  {
    name: "Afaan Shaikh",
    role: "Media & Marketing Lead",
    image: require("../assets/B-W Individual/mnm_afaan.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
   {
    name: "Prathamesh Jadhav",
    role: "Media & Marketing Lead",
    image: require("../assets/B-W Individual/Mnm_prathamesh_.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Aryan Kanse",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_aryan.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Soham Kale",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_sohamk.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Soham Patwardhan",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_sohamp.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Ishika Dhorajkar",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_ishika.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Janhavi Salunkhe",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/Mnm_janhvi.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Rohan Naik",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_rohan.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Yash Garve",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_yash.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Atharva Joshi",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_atharva.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },

];

const Media = () => {
  return (
    <div className="curation-page team-page">
        <div className="title-hero">
      <h1 className=" demo">MEDIA & MARKETING</h1>
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

export default Media;
