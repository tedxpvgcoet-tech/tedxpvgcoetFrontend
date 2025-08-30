import React, { useState } from "react";
import "./Speaker.css";
import speakerImage from "../assets/Hruitvik.png";
import speakerImage3 from "../assets/KEDAR.png";
import speakerImage4 from "../assets/Group 30.png";
import speakerImage2 from "../assets/Bhooshan (1) (1).png";
import "./SectionHeader.css";

// 1. IMPORT ALL REQUIRED ICONS
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";

// --- SpeakerCard Component ---
// Now accepts all potential social URLs as props
const SpeakerCard = ({ image, description, instagramUrl, linkedinUrl, scholarUrl }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="speaker-carde">
      {!showInfo ? (
        <div className="speaker-photo">
          <img src={image} alt="Speaker" className="speaker-image" />
          <button
            className="speaker-learn-btn"
            onClick={() => setShowInfo(true)}
          >
            Learn More →
          </button>
        </div>
      ) : (
        <div className="speaker-infoe">
          <p className="speaker-description">{description}</p>
          
          {/* 2. ADD A WRAPPER FOR SOCIAL ICONS */}
          <div className="speaker-socials">
            {/* Conditionally render each icon only if the URL exists */}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram profile">
                <FaInstagram />
              </a>
            )}
            {linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn profile">
                <FaLinkedin />
              </a>
            )}
            {scholarUrl && (
              <a href={scholarUrl} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Google Scholar profile">
                <SiGooglescholar />
              </a>
            )}
          </div>

          <button
            className="speaker-back-btn"
            onClick={() => setShowInfo(false)}
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main Speaker Section Component ---
const Speaker = () => {
  // 3. UPDATE DATA with new linkedinUrl and scholarUrl fields
  const speakers = [
    {
      id: 1,
      image: speakerImage,
      description: "Once a badminton player with a career-high global ranking of 140, Hruitvik Ambekar now transforms stories of sport, struggle, and self-discovery into life lessons. From athlete to professional and four-time TEDx speaker, he redefines vision beyond victory.",
      instagramUrl: "https://www.instagram.com/hruitvikambekar/",
      linkedinUrl: "https://www.linkedin.com/in/hruitvik-ambekar-87a8631b1/",
    },
    {
      id: 2,
      image: speakerImage2,
      description: "Dr. Bhooshan Kelkar is a prism of ideas where technology, education, and imagination converge to create meaningful change. With 23 US patents and 17 books, he transforms complexity into clarity. An AI visionary and mentor, he inspires audiences to look beyond marksheets toward the future.",
      linkedinUrl: "https://www.linkedin.com/in/bhooshan-kelkar/",
    },
    {
      id: 3,
      image: speakerImage3,
      description: "Kedar Patankar blends technology, storytelling, and environmental action. He has led semiconductor breakthroughs, created acclaimed works like Scam 2003, and, as TEDx speaker and SI-GPT CTO, merges technical mastery with entrepreneurial vision. Founder of The Trash Talk, he turns sustainability into a movement.",
      instagramUrl: "https://www.instagram.com/kedarpatankar_official/",
    },
    {
      id: 4,
      image: speakerImage4,
      description: "Dr. Aditya Abhyankar, Dean at SPPU, is a scientist, innovator, and thought leader. With 8 U.S. patents and 14 Indian patents, he bridges technology, philosophy, and entrepreneurship to redefine changemaking. He brings his journey of deep tech innovation to the TEDx stage.",
      scholarUrl: "https://scholar.google.com/citations?user=VnjgF5sAAAAJ&hl=en", 
    },
  ];

  return (
    <section className="speaker-section">
      <div className="section-header">
        <h2 className="section-header__title">
          <span className="section-header__pre">MEET THE</span>
          <span className="section-header__main">SPEAKERS</span>
        </h2>
      </div>

      {/* Pass all speaker data down to the card */}
      <div className="speaker-mobile">
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.id} {...speaker} />
        ))}
      </div>

      <div className="speaker-desktop">
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.id} {...speaker} />
        ))}
      </div>
    </section>
  );
};

export default Speaker;