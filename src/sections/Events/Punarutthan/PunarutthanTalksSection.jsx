import React from "react";
import "./PunarutthanTalksSection.css";
import { FaYoutube } from "react-icons/fa";

// Replace these paths and links with your actual speaker data
const speakers = [
  {
    name: "Muneet Dhiman",
    desc: "Founder & Kulapati",
    img: require("../../../assets/speakers/Muneet-Dhiman.webp"),
    link: "https://youtu.be/8eFw6hmkVE0?si=cnl4cnnb_KGlTBio"
  },
 
  {
    name: "Lt Col Dr. Santosh Khadsare (Retd)",
    desc: "Cybersecurity Expert",
    img: require("../../../assets/speakers/santosh-khadsare.webp"),
    link: "https://youtu.be/q-EL7zeW9Wc?si=eYKRq8VJV0qhvGuQ"
  },
  {
    name: "Shri. Shakhir Khan",
    desc: "Indian Classical Musician",
    img: require("../../../assets/speakers/Shri-Shakhir-Khan.webp"),
    link: "https://youtu.be/NAPCZvHKTeM?si=vc9oquwfVQMhMdGW"
  },
  {
    name: "Siddharth Mayur",
    desc: "Founder & CEO",
    img: require("../../../assets/speakers/Siddharth-Mayur.webp"),
    link: "https://youtu.be/naTQYghjvTU?si=wGUjqsJpo9d31n5Z"
  },
  {
    name: "Sonal Ved",
    desc: "Culinary Journalist",
    img: require("../../../assets/speakers/Sonal-Ved.webp"),
    link: "https://youtu.be/bd8LQK8AHdA?si=i9shywqHPR2xZobK"
  },
  {
    name: "Swati Dhaitankar",
    desc: "Indian Classical Dance Artist",
    img: require("../../../assets/Swati-Dhaitankar.webp"),
    link: "https://youtu.be/gjApRL3Pk_o?si=EOZrGo8PkTpZ69_g"
  },
  {
    name: "Vasant Shinde",
    desc: "Archaeology Researcher",
    img: require("../../../assets/speakers/Vasant-Shinde.webp"),
    link: "https://youtu.be/B6__B96pYsI?si=6xkt63xDCo5lQdg4"
  },
  
  // Add the remaining 4 speakers here
];

const PunarutthanTalksSection = () => {
  return (
    <section className="talks-section">
      <h2>Talks</h2>
      <div className="talks-grid">
        {speakers.map((speaker, index) => (
          <div className="speaker-card" key={index}>
            <img src={speaker.img} alt={speaker.name}  loading="lazy" />
            <div className="speaker-info">
              <h3>{speaker.name}</h3>
              <p>{speaker.desc}</p>
              <a
                href={speaker.link}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-btn"
              >
                Watch <FaYoutube className="yt-icon" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PunarutthanTalksSection;
