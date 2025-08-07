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
      linkedin: "https://www.linkedin.com/in/gargeesk24?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/shelfrighteouss?igsh=MTczc3pxNDNzMTFpcg==",
      website: "#",
    },
  },
  {
    name: "Hiya Pantvaidya",
    role: "Editorial Lead",
    image: require("../assets/B-W Individual/Edi_hiya.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/hiya-pantvaidya-8a7058332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/hiyaaa_007?igsh=MTF0NXA0ZzI2b2J5Nw==",
      website: "#",
    },
  },
  {
    name: "Abhishek Rangole",
    role: "Editorial Team Member",
    image: require("../assets/B-W Individual/edi_abhishek.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/abhishek-rangole",
      instagram: "https://www.instagram.com/rango_abhi?igsh=MXhzaGxudG96bnMwcQ==",
      website: "#",
    },
  },
  {
    name: "Sneha Ghodke",
    role: "Editorial Team Member",
    image: require("../assets/B-W Individual/Edi_sneha.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/snehaganeshghodke",
      instagram: "https://www.instagram.com/the_.sg._/",
      website: "#",
    },
  },
  {
    name: "Renuka Joshi",
    role: "Editorial Team Member",
    image: require("../assets/B-W Individual/edi_renuka.jpg"),
     social: {
      linkedin: "https://www.linkedin.com/in/renuka-joshi-430541290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/renuka___.__?igsh=M2FtcTdiOGNmamN3",
      website: "#",
    },
    
  },
  {
    name: "Raviraj Bhoge",
    role: "Editorial Team Member",
    image: require("../assets/B-W Individual/edi_raviraj.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/raviraj-bhoge-2627722b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/iamraviraj69?igsh=MTU2aHNnaDE5cWg5dA==",
      website: "#",
    },
  },
  {
    name: "Omkar Hokarne",
    role: "Editorial Team Member",
    image: require("../assets/B-W Individual/Edi_omkar.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/omkar-hokarne-0a15aa224?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      instagram: "https://www.instagram.com/_omkar_hokarne?igsh=eTlkajVkem1kMDF3&utm_source=qr",
      website: "#",
    },
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
