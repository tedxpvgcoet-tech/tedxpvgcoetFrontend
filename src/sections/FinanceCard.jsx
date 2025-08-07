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
      linkedin: "https://www.linkedin.com/in/sargun-kaur-gurudatta-2a88931a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/sargun__gurudatta?igsh=MWcwODlyMzN2Y203YQ==",
      website: "#",
    },
  },
  {
    name: "Darshan Pakhale",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/Fin_darshan.jpg"),
    social: {
      linkedin: "www.linkedin.com/in/darshan-pakhale-a97b12329",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Kaustabh Nalawade",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/fin_kaustubh.jpg"),
    social: {
      linkedin: "#",
      instagram: "#",
      website: "#",
    },
  },
  {
    name: "Girija Awate",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/fin_girija.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/girija-awate-6894b5217?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/girija_awate1093?igsh=YnpwbzI3bzR3OGZu",
      website: "#",
    },
  },
  {
    name: "Devashree Deshpande",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/fin_devashree.jpg"),
    social: {
      linkedin: "http://www.linkedin.com/in/devashree-deshpande-729b30290",
      instagram: "https://www.instagram.com/devashree__23?igsh=MTl5NWhrZDl2ZDZjZg==",
      website: "#",
    },
  },
  {
    name: "Mahek Mishra",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/Fin_mahek.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/mahek-mishra-264130340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/mahek.1726?igsh=MWwzNjJtcXR3MGk3aw==",
      website: "#",
    },
  },
  {
    name: "Aditya Bhise",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/fin_aditya.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/aditya-bhise-899493291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/adityabhisepatil?igsh=bG9oc2IycHVsNDcw",
      website: "#",
    },
  },
  {
    name: "Sanidhi Gade",
    role: "Finance Team Member",
    image: require("../assets/B-W Individual/fin_saanidhi.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/saanidhi-gade-431344241?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/_.saanidhi._?igsh=NTV4MDgwdW1jb256",
      website: "#",
    },
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
