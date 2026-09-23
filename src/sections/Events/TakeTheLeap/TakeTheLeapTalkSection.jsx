import React, { useState } from "react";
import "../AvantGarde/AvantGardeTalkSection.css";
import { FaYoutube } from "react-icons/fa";
import SpeakerBioModal from "../Common/SpeakerBioModal";

// Replace these paths and links with your actual speaker data
const speakers = [
  {
    name: "Greg Ellis",
    desc: " American drummer and percussionist",
    quote: "",
    bio: "",
    img: require("../../../assets/Event/Take The Leap/Greg-Elis.webp"),
    link: "https://youtu.be/d7f4yrJ6RoQ?si=xLe4j4y5GGUxMF-O",
  },
  {
    name: "Gaurav Sangtani",
    desc: " Founder President of Jigyasa Foundation",
    quote: "",
    bio: "",
    img: require("../../../assets/Event/Take The Leap/Gaurav-Sangtani.webp"),
    link: "https://youtu.be/N0sJ3rAAqvI?si=tuDxLb48ZHvg8uWV",
  },
  {
    name: "Rohan Albal",
    desc: "Co-Founder & Chief Executive Officer at PowerDrift",
    quote: "",
    bio: "",
    img: require("../../../assets/Event/Take The Leap/Rohan-Albal.webp"),
    link: "https://youtu.be/FtZTlce5kmw?si=eY1dxz_mri6PJt7R",
  },
  {
    name: "Saransh Sharma",
    desc: "Accomplish writer",
    quote: "",
    bio: "",
    img: require("../../../assets/Event/Take The Leap/Saransh-Sharma.webp"),
    link: "https://youtu.be/91euzYwihaE?si=TykaPCJiMfK3kWNn",
  },
  {
    name: "Abhiram Joshi",
    desc: "Creative Director",
    quote: "",
    bio: "",
    img: require("../../../assets/Event/Take The Leap/Abhiram-Joshi.webp"),
    link: "https://youtu.be/yR_V4iyB3kQ?si=bgxbp3ppjgVMq925",
  },
  {
    name: "Achuyt Godbole",
    desc: "IITian & CEO",
    quote: "",
    bio: "",
    img: require("../../../assets/Event/Take The Leap/Achuyt-Godbole.webp"),
    link: "https://youtu.be/fb22W8dCvBY?si=GU5vK48Go-I910Cf",
  }
];

const TakeTheLeapTalksSection = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  return (
    <section className="talks-section2">
      <h2>Talks</h2>
      <div className="talks-grid2">
        {speakers.map((speaker, index) => (
          <div className="speaker-card2" key={index}>
            <img src={speaker.img} alt={speaker.name} loading="lazy" />
            <div className="speaker-info2">
              <div className="speaker-text2">
                <h3>{speaker.name}</h3>
                <p>{speaker.desc}</p>
              </div>
              <div className="speaker-action-buttons">
                <a
                  href={speaker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-btn2"
                >
                  Watch <FaYoutube className="yt-icon2" />
                </a>
                <button
                  type="button"
                  className="learn-more-btn2"
                  onClick={() => setSelectedSpeaker(speaker)}
                >
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SpeakerBioModal
        speaker={selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
      />
    </section>
  );
};

export default TakeTheLeapTalksSection;
