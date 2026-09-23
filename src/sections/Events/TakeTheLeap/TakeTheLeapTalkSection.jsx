import React, { useState } from "react";
import "../AvantGarde/AvantGardeTalkSection.css";
import { FaYoutube } from "react-icons/fa";
import SpeakerBioModal from "../Common/SpeakerBioModal";

const speakers = [
  {
    name: "Greg Ellis",
    desc: "American drummer and percussionist",
    bio: "Greg Ellis is one of the most innovative and versatile drummers in the world, having performed and recorded with artists from over 30 countries including Mickey Hart, Zakir Hussain, KODO, and Billy Idol. His drumming appears on 150+ film, TV, and game scores including 300, Argo, The Matrix Reloaded, and Iron Man. A self-taught musician, Greg's performances are fully improvised, guided by feel rather than formal training.",
    img: require("../../../assets/Event/Take The Leap/Greg-Elis.webp"),
    link: "https://youtu.be/d7f4yrJ6RoQ?si=xLe4j4y5GGUxMF-O",
  },
  {
    name: "Gaurav Sangtani",
    desc: "Founder President of Jigyasa Foundation",
    bio: "Gaurav Sangtani is Founder President of Jigyasa Foundation, a non-profit dedicated to bringing curiosity back into education through innovative methods. He speaks on tech disruption's impact on education, business, and employability at institutes including IIMs and IITs, and also writes and speaks on leadership. A Fellow Member of the Institute of Chartered Accountants of India, he works as Vice President for a global financial services firm and has experience as a consultant and entrepreneur.",
    img: require("../../../assets/Event/Take The Leap/Gaurav-Sangtani.webp"),
    link: "https://youtu.be/N0sJ3rAAqvI?si=tuDxLb48ZHvg8uWV",
  },
  {
    name: "Rohan Albal",
    desc: "Co-Founder & Chief Executive Officer at PowerDrift",
    bio: "Rohan Albal is the founder of PowerDrift, one of India's biggest motor-vlogging YouTube channel. Known by the alias 'TenHut' from his gaming career, he's been passionate about cars and bikes his entire life and describes himself less as an influencer and more as a kid still in awe of his machines. His philosophy: 'Those who don't adapt fall behind...the key is to keep reinventing'. It took a journey halfway around the world and a decade of self-discovery for him to find where his happiness truly lies, a passion that grew into PowerDrift.",
    img: require("../../../assets/Event/Take The Leap/Rohan-Albal.webp"),
    link: "https://youtu.be/FtZTlce5kmw?si=eY1dxz_mri6PJt7R",
  },
  {
    name: "Saransh Sharma",
    desc: "Accomplish writer",
    bio: "Saransh Sharma is a writer, techie, and founder of Upscale, a technology firm established in 2013, having worked with the Ministry of Defence and Fortis Hospitals. He works on research spanning mathematics, computer science, and open-source coding and is currently writing a book on Blockchain & AI. He believes in producing work that is 'green and quiet' but carries broad, lasting impact on health and well-being, favoring distributed returns over instant gratification.",
    img: require("../../../assets/Event/Take The Leap/Saransh-Sharma.webp"),
    link: "https://youtu.be/91euzYwihaE?si=TykaPCJiMfK3kWNn",
  },
  {
    name: "Abhiram Joshi",
    desc: "Creative Director",
    bio: "Abhiram Joshi is a post-graduate in Film & Media from the International Film School, Sydney, Australia and leads the Creative Wing of the Aespaes Group. He has worked across concept development, screenplay development, visualization, and performance direction for Marathi, Hindi, and English feature films, TV commercials and corporate films, trained under filmmakers like Jonathan Wald, Miro Bilbrough, and Duncan Thompson. His thesis film Renoir was nominated at international festivals including Sundance and Busan. He brings 5+ years of experience in corporate filmmaking, TV commercials, and social media AV promotion.",
    img: require("../../../assets/Event/Take The Leap/Abhiram-Joshi.webp"),
    link: "https://youtu.be/yR_V4iyB3kQ?si=bgxbp3ppjgVMq925",
  },
  {
    name: "Achuyt Godbole",
    desc: "IITian & CEO",
    bio: "Achyut Godbole is an IIT Bombay graduate, engineer, and polymath who served as CEO of Patni Systems and held leadership positions across IT companies for over 23 years. Beyond tech, he has deep expertise in economics, music, literature, science, management, and psychology, authoring books like Boardroom (management), Nadvedh (music), and Arthak (economics) and writing newspaper columns spanning literature, technology, and medicine. He also works with Bhil Adivasi communities on development awareness and helped build Ashiana, a school for mentally challenged children in Mumbai.",
    img: require("../../../assets/Event/Take The Leap/Achuyt-Godbole.webp"),
    link: "https://youtu.be/fb22W8dCvBY?si=GU5vK48Go-I910Cf",
  },
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
