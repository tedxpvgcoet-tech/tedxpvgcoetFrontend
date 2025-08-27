
// src/pages/Curation.jsx
import React from "react";
import "./LogisticsCard.css"
import "../pages/Team.css"
import ScrollToTop from "../components/ScrollToTop";


const curationTeam = [
  {
    name: "Rudraunsh Joshi",
    role: "Logistics & Operations Lead",
    image: require("../assets/B-W Individual/lno_rudraunsh.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/rudraunsh-joshi",
      instagram: "https://www.instagram.com/rudraunsh._?igsh=aWpkaTFwd2NxYmoz",
      
    },
  },
   {
    name: "Tanishka Ahirekar",
    role: "Logistics & Operations Lead",
    image: require("../assets/B-W Individual/Lno_tanishka.jpg"),
    social: {
      linkedin: "http://linkedin.com/in/tanishkaahirekar",
      instagram: "https://www.instagram.com/tanisshkkaa_?igsh=dm16M3c2Y25qODZ3",
      
    },
  },
  {
    name: "Niyati Jadhav",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_niyati.jpg"),
    social: {
      
      instagram: "https://www.instagram.com/niyati._9?igsh=Ym5jd3JqcWQ1YXgy",
      
    },
  },
  {
    name: "Roanak Rajurkar",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_roanak.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/roanak-rajurkar-150937341?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/roanak.572?igsh=Zzdjd2piczQ2Y2N2",
      
    },
  },
  {
    name: "Atharva Deshmukh",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_atharva.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/atharva-deshmukh-b4812a290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/atharvad_06?igsh=NDlxOTY1MHptMW13",
      
    },
  },
  {
    name: "Alpesh Bhavar",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_alpesh.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/alpesh-bhavar-11355428b",
      instagram: "https://www.instagram.com/alpesh_bhavar_patil?igsh=aTI1dnRqY3FmZWk4",
      
    },
  },
  {
    name: "Ayush Deshmukh",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_ayush.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/aayush-deshmukh1248",
      instagram: "https://www.instagram.com/aayush.3am/",
      
    },
  },
  {
    name: "Anish Kherdikar",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_anish.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/anish-kherdikar-326085294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      instagram: "https://www.instagram.com/anish_kherdikar?igsh=c3B5MGFoaXNvMGN3&utm_source=qr",
    
    },
  },
  {
    name: "Anushka Kanade",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_anushka.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/anushka-kanade-415614378?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BhC9NlCEmTdCSCSa4mh0yVw%3D%3D",
      instagram: "https://www.instagram.com/iwantcheesecakeee?igsh=Y2xhc3Fsa3Z2NTZ5",
      
    },
  },
   {
    name: "Sukrut Angal",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_sukrut.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/sukrut-angal-a40b10290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/sukrut__07/profilecard/?igsh=MXQzMDIxODlhYmhyaQ==",
      
    },
  },
   {
    name: "Fanaa Jain",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/Lno_fana.jpg"),
    social: {
      
      instagram: "https://www.google.com/url?q=https://www.instagram.com/fanaajain?igsh%3DMTBsc3M5YTlhaTc1aA%3D%3D&sa=D&source=editors&ust=1756280079234643&usg=AOvVaw3cx82wUGXfzbNQ_JgnQC-K",
      
    },
  },
   {
    name: "Krishna Gandhi",
    role: "Logistics & Operations Team Member",
    image: require("../assets/B-W Individual/lno_krishna.jpg"),
    social: {
      
      instagram: "https://www.instagram.com/krishnagandhi_26?igsh=bG9qZmJjaWxqNHFj",
      
    },
  },

];

const Logistics = () => {
  return (
    <>
        <div id="page-top"/>
    <div className="curation-page team-page">
        <div className="title-hero">
      <h1 className="demo demo2">LOGISTIC AND OPERATION</h1>
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
    </>
  );
};
export default Logistics;
