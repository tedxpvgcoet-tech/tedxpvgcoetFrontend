import React from "react";
import "./AvantGardeTalkSection.css";
import { FaYoutube } from "react-icons/fa";

// Replace these paths and links with your actual speaker data
const speakers = [
  {
    name: "Taufiq Qureshi",
    desc: "World Music Pioneer",
    img: require("../../../assets/speakers/Taufiq-Qureshi.webp"),
    link: "https://m.youtube.com/watch?v=PjFmBXxTHjQ"
  },
  {
    name: "Ayesha Billimoria",
    desc: "National Sprint Champion              ",
    img: require("../../../assets/speakers/Ayesha-Billimoria.webp"),
    link: "https://m.youtube.com/watch?v=iRCqU9QkNiE"
  },
  {
    name: "Kuntal Joisher",
    desc: "Everest Climber",
    img: require("../../../assets/speakers/kuntal-joisher.webp"),
    link: "https://m.youtube.com/watch?v=NcyKkzeZoLs"
  },
  {
    name: "Priyanka Kasture",
    desc: "Influencer & Marketer",
    img: require("../../../assets/misc/priyanka-kasture.webp"),
    link: "https://m.youtube.com/watch?si=Y2_FQ2WdvarmtKXY&v=xv8aACt_OGo&feature=youtu.be"
  },
  {
    name: "Shreenand Bapat",
    desc: "Historian & Researcher",
    img: require("../../../assets/speakers/Shreenand-Bapat.webp"),
    link: "https://m.youtube.com/watch?v=5syhwQTgPbY"
  }
  // Add the remaining 4 speakers here
];

const AvantGardeTalksSection = () => {
  return (
    <section className="talks-section2">
      <h2>Talks</h2>
      <div className="talks-grid2">
        {speakers.map((speaker, index) => (
          <div className="speaker-card2" key={index}>
            <img src={speaker.img} alt={speaker.name}  loading="lazy" />
            <div className="speaker-info2">
              <h3>{speaker.name}</h3>
              <p>{speaker.desc}</p>
              <a
                href={speaker.link}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-btn2"
              >
                Watch <FaYoutube className="yt-icon2" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvantGardeTalksSection;
