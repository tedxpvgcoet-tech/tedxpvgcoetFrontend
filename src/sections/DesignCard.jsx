// src/pages/Curation.jsx
import React from "react";
import "./DesignCard.css";
import "../pages/Team.css"


const curationTeam = [
  {
    name: "Varun Tammewar",
    role: "Design & Production Head",
    image: require("../assets/B-W Individual/dnp_varun (1).jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/varun-tammewar-41a191225?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/varruunnnnnn?igsh=MXVyNzlwbnZyeDMy",
      
    },
  },
   {
    name: "Lakshmikant Chaudhari",
    role: "Design & Production Head",
    image: require("../assets/B-W Individual/Dnp_laksh.jpg"),
    social: {
      linkedin: "https://in.linkedin.com/in/lakshmikant-chaudhari-506453285",
      instagram: "https://www.instagram.com/laksh.me.kant_c?igsh=OG5tdW5lYXhjNGdi",
     
    },
  },
  {
    name: "Anuj Kale",
    role: "Design & Production Team Member",
    image: require("../assets/B-W Individual/dnp_anuj.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/anuj-kale-672532291",
      instagram: "https://www.instagram.com/anujxkale?igsh=MTJ3emFsa200YXdlYg==",
      
    },
  },
  {
    name: "Sutirth Doshi",
    role: "Design & Production Team Member",
    image: require("../assets/B-W Individual/Dnp_sutirth.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/sutirthdoshi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/sutirthdoshi?igsh=aGVvd3F0dDYxNzBo",
      
    },
  },
  {
    name: "Anuj Wagh",
    role: "Design & Production Team Member",
    image: require("../assets/B-W Individual/Dnp_anujw.jpg"),
    social: {
      
      instagram: "https://www.instagram.com/anujjjjj._2726_",
     
    },
  },
  {
    name: "Avanti Satpute",
    role: "Design & Production Team Member",
    image: require("../assets/B-W Individual/Dnp_avanti.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/avanti-satpute-b35494317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/ss_avantii?igsh=OWI0OTVyb3kzMzg5",
      
    },
  },
  

];

const Design = () => {
  return (
    <div className="curation-page team-page">
        <div className="title-hero">
      <h1 className="demo">DESIGN & PRODUCTION</h1>
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

export default Design;
