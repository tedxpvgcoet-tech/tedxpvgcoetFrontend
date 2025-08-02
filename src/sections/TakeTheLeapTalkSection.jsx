import React from "react";
import "./AvantGardeTalkSection.css";
import { FaYoutube } from "react-icons/fa";

// Replace these paths and links with your actual speaker data
const speakers = [
  {
    name: "Greg Ellis",
    desc: " American drummer and percussionist",
    img: require("../assets/Event/Take The Leap/Greg-Elis.png"),
    link: "https://youtu.be/d7f4yrJ6RoQ?si=xLe4j4y5GGUxMF-O"
  },
  {
    name: "Gaurav Sangtani",
    desc: " Founder President of Jigyasa Foundation",
    img: require("../assets/Event/Take The Leap/Gaurav-Sangtani.png"),
    link: "https://youtu.be/N0sJ3rAAqvI?si=tuDxLb48ZHvg8uWV"
  },
  {
    name: "Rohan Albal",
    desc: "Co-Founder & Chief Executive Officer at PowerDrift",
    img: require("../assets/Event/Take The Leap/Rohan-Albal.png"),
    link: "https://youtu.be/FtZTlce5kmw?si=eY1dxz_mri6PJt7R"
  },
  {
    name: "Saransh Sharma",
    desc: "Accomplish writer",
    img: require("../assets/Event/Take The Leap/Saransh-Sharma.png"),
    link: "https://youtu.be/91euzYwihaE?si=TykaPCJiMfK3kWNn"
  },
  {
    name: "Abhiram Joshi",
    desc: "Creative Director",
    img: require("../assets/Event/Take The Leap/Abhiram-Joshi.png"),
    link: "https://youtu.be/yR_V4iyB3kQ?si=bgxbp3ppjgVMq925"
  },
  {
    name: "Achuyt Godbole",
    desc: "IITian & CEO",  
    img: require("../assets/Event/Take The Leap/Achuyt-Godbole.png"),
    link: "https://youtu.be/fb22W8dCvBY?si=GU5vK48Go-I910Cf"
  }
  // Add the remaining 4 speakers here
];

const TakeTheLeapTalksSection = () => {
  return (
    <section className="talks-section2">
      <h2>Talks</h2>
      <div className="talks-grid2">
        {speakers.map((speaker, index) => (
          <div className="speaker-card2" key={index}>
            <img src={speaker.img} alt={speaker.name} />
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

export default TakeTheLeapTalksSection;
