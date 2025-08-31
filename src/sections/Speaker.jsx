import React, { useState } from "react";
import "./Speaker.css";
import speakerImage from "../assets/Drishti/Hruitvik.png";
import speakerImage3 from "../assets/Drishti/Kedar.png";
import speakerImage4 from "../assets/Drishti/Aditya.png";
import speakerImage2 from "../assets/Drishti/Bhooshan.png";
import speakerImage5 from "../assets/Drishti/Surabhi.png";
import speakerImage6 from "../assets/Drishti/LSChaudhary.png";
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
     {
      id: 5,
      image: speakerImage5,
      description: "Surabhi Handay , a celebrated actress in Marathi cinema admired for her portrayal of Mhalsa Devi in Jai Malhar, is an artist who seamlessly blends culture, theatre, and performance. An accomplished singer and storyteller, she goes beyond entertainment to explore the deeper essence of art and expression. From the cinematic stage to TEDxPVGCOET 2025, she arrives to share her artistic journey, unravel stories of culture and creativity, and offer a fresh perspective on the power of performance.",
      instagramUrl: "https://www.instagram.com/surbhihandayofficial/", 
    },
     {
      id: 6,
      image: speakerImage6,
      description: "Major L. S. Chaudhary , a former Indian Army officer and Rashtriya Rifles veteran, has led high-stakes counter-terror operations in Kashmir, surviving near-death situations and neutralizing heavily armed insurgent groups under his command. His journey from battlefield grit and combat injuries to mentoring future leaders and training defence aspirants is one of resilience, clarity, and purpose. Through his talks and YouTube channel, he shares battlefield-tested lessons that transcend the military. At TEDxPVGCOET 2025, he brings a soldier’s perspective that can transform how we see leadership, resilience, and life itself.",
      instagramUrl: "https://www.instagram.com/major_lsc/", 
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