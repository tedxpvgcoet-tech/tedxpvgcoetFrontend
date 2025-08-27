// src/pages/Curation.jsx
import React from "react";
import "./CurationCard.css";
import "../pages/Team.css"


const curationTeam = [
  {
    name: "Jui Brahme",
    role: "Curation Lead",
    image: require("../assets/B-W Individual/Curation/cur_jui.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/jui-brahme-7a4a18215",
      instagram: "https://www.instagram.com/___.juiiiib.___?igsh=MXBpYXp4OTRkdmg4bQ==",
      
    },
  },
  {
    name: "Radha Hardikar",
    role: "Curation Lead",
    image: require("../assets/B-W Individual/Curation/Cur_radha.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/radha-hardikar-4054a323a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      instagram: "https://www.instagram.com/raradha.jpg?igsh=d2Flcm83NHRtN21q&utm_source=qr",
      
    },
  },
  {
    name: "Samiksha Jadhav",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/Cur_samiksha.png"),
        social: {
      linkedin: "https://www.linkedin.com/in/samiksha-jadhav-1b2998339?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BAm0t84V9Q3S7L2pURPGyLQ%3D%3D",
      instagram: "https://www.instagram.com/samikshaj._?igsh=NHVtN29oNXZndW9w",
      
    },
  },
  {
    name: "Amey Pardeshi",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/cur_amey.png"),
        social: {
      linkedin: "https://www.google.com/url?q=https://www.linkedin.com/in/amey-pardeshi-5169252b2?utm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app&sa=D&source=editors&ust=1756280079256181&usg=AOvVaw0ViUIV1uGbS2FO87QAkUQt",
      instagram: "https://www.instagram.com/binging._.bad",
      
    },
  },
  {
    name: "Rugved Dhole",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/cur_rugveda.png"),
        social: {
      linkedin: "https://www.google.com/url?q=https://www.linkedin.com/in/rugveda-dhole-7a7052324?utm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dios_app&sa=D&source=editors&ust=1756280079253649&usg=AOvVaw1v2PqZRPiBFpM-Pm2Dgi75",
      instagram: "https://www.google.com/url?q=https://www.instagram.com/rug_veda2020?igsh%3DMWVnZndwNXhpb2dqdw%253D%253D%26utm_source%3Dqr&sa=D&source=editors&ust=1756280079254157&usg=AOvVaw3G2IRkQ1GaqfUV7Cp7vqCw",
      
    },
  },
  {
    name: "Ritika Paradkar",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/Cur_Ritika.png"),
        social: {
      linkedin: "https://www.linkedin.com/in/ritika-paradkar-6aa9b1322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/ritikaaa.1111",
      
    },
  },
  {
    name: "Archit Sonawane",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/Cur_archit.png"),
        social: {
      linkedin: "#",
      instagram: "https://www.instagram.com/_archit._._?igsh=MXZ0eGNpMm1zNXNiYw%3D%3D&utm_source=qr",
      
    },
  },
  {
    name: "Narayani Jalgaonkar",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/cur_narayani.png"),
    social: {
      linkedin: "https://www.linkedin.com/in/narayani-j-b5081936a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/narayani_02?igsh=OGxtbmx4Y3lmdDF4",
      
    },
  },
  {
    name: "Ved Purohit",
    role: "Curation Team Member",
    image: require("../assets/B-W Individual/Curation/cur_ved.png"),
        social: {
      linkedin: "https://www.linkedin.com/in/ved-vivek-purohit-592802338?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/ved_vadak04?igsh=MWJjYXk5MTRoY3B2bQ==",
      
    },
  },

];

const Curation = () => {
  return (
    <div className="curation-page team-page">
            <div id="page-top"/>
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
