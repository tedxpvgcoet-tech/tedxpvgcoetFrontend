
// src/pages/Curation.jsx
import React from "react";
import "./LogisticsCard.css"
import "../pages/Team.css"

const curationTeam = [
  {
    name: "Rudraunsh Joshi",
    role: "Logistics & Operations Lead",
    image: require("../assets/B-W Individual/lno_rudraunsh.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
   {
    name: "Tanishka Ahirekar",
    role: "Logistics & Operations Lead",
    image: require("../assets/B-W Individual/Lno_tanishka.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Niyati Jadhav",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_niyati.jpg"),
  },
  {
    name: "Roanak Rajurkar",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_roanak.jpg"),
  },
  {
    name: "Janhavi Shinde",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_janhavi.jpg"),
  },
  {
    name: "Atharva Deshmukh",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_atharva.jpg"),
  },
  {
    name: "Alpesh Bhavar",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_alpesh.jpg"),
  },
  {
    name: "Ayush Deshmukh",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_ayush.jpg"),
  },
  {
    name: "Anish Kherdikar",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_anish.jpg"),
  },
  {
    name: "Anushka Kanade",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_anushka.jpg"),
  },
   {
    name: "Sukrut Angal",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_sukrut.jpg"),
  },
   {
    name: "Fanaa Jain",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/Lno_fana.jpg"),
  },
   {
    name: "Krishna Gandhi",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_krishna.jpg"),
  },

];

const Logistics = () => {
  return (
    <div className="curation-page team-page">
        <div className="title-hero">
      <h1 className="demo">LOGISTIC AND OPERATION</h1>
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
export default Logistics;
