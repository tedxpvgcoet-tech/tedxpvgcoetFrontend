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
      linkedin: "https://www.linkedin.com/in/afaanshaikh",
      instagram: "https://www.instagram.com/instashebang?igsh=NTc5NTV1ZmtvamZ4",
     
    },
  },
   {
    name: "Prathamesh Jadhav",
    role: "Media & Marketing Lead",
    image: require("../assets/B-W Individual/Mnm_prathamesh_.jpg"),
    social: {
      linkedin: "http://linkedin.com/in/prathamesh-jadhav-51ba0b346",
      instagram: "https://www.instagram.com/prathamj_13?igsh=MWo0Z2lseWg1eDg1Zw%3D%3D&utm_source=qr",
      
    },
  },
  {
    name: "Aryan Kanse",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_aryan.jpg"),
    social: {
      linkedin: "http://linkedin.com/in/aryan-kanse-684618256",
      instagram: "https://www.instagram.com/aryankanse_14?igsh=bTQ4ZjdjNzdoZWJj&utm_source=qr",
      
    },
  },
  {
    name: "Soham Kale",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_sohamk.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/sohamkale?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/limbu.paani.clicks?igsh=MXg3cXFoem9oNTJ6Ng==",
      website: "https://drive.google.com/file/d/1oREASEBx7OhCGXGA44ckbVIbpreJvFu_/view?usp=drivesdk",
    },
  },
  {
    name: "Soham Patwardhan",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_sohamp.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/soham-patwardhan-180b12270?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/soham_0804?igsh=bXp1bXdrNDljaGYx",
      
    },
  },
  {
    name: "Ishika Dhorajkar",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_ishika.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/ishika-dhorajkar-a47863303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/ishika_dhorajkar/profilecard/?igsh=a2JkMDJmZmY4a3h3",
      
    },
  },
  {
    name: "Janhavi Salunkhe",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/Mnm_janhvi.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/janhavi-s-49736536b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      instagram: "https://www.instagram.com/janhaviii_salunkhe?igsh=NzE5M3ZoYzBobzNj&utm_source=ig_contact_invite",
      
    },
  },
  {
    name: "Rohan Naik",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_rohan.jpg"),
   
  },
  {
    name: "Yash Garve",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_yash.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/yash-garve-b63492248?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      instagram: "https://www.instagram.com/fantasticyash",
     
    },
  },
  {
    name: "Atharva Joshi",
    role: "Media & Marketing Team Member",
    image: require("../assets/B-W Individual/mnm_atharva.jpg"),
   
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
