import React, { useState } from "react";
import "./PunarutthanTalksSection.css";
import { FaYoutube } from "react-icons/fa";
import SpeakerBioModal from "../Common/SpeakerBioModal";

const speakers = [
  {
    name: "Muneet Dhiman",
    desc: "Founder & Kulapati",
    img: require("../../../assets/speakers/Muneet-Dhiman.webp"),
    link: "https://youtu.be/8eFw6hmkVE0?si=cnl4cnnb_KGlTBio",
    bio: "Muneet Dhiman is an educationist and a speaker on the subject matter of education, parenting, sustainability and system design. He is the founder and Kulapati of Vidyakshetra Gurukulam in Bangalore, a non-residential panchkosha based Gurukulam for the current times. It was built over the last 13 years and his vision is to replicate the Vidyakshetra model across 108 centres in Bharat and subsequently across the globe.",
  },
  {
    name: "Lt Col Dr. Santosh Khadsare (Retd)",
    desc: "Cybersecurity Expert",
    img: require("../../../assets/speakers/santosh-khadsare.webp"),
    link: "https://youtu.be/q-EL7zeW9Wc?si=eYKRq8VJV0qhvGuQ",
    bio: "Lt Col (Dr) Santosh Khadsare, an Indian Army veteran, serves as the Vice President of Digital Forensics & Incident Response (DFIR) at eSec Forte Technologies. With 25 years of experience in Cyber Security, DFIR, and related fields, he holds numerous qualifications including CHFI, MCFE, CEH, and more. He led a Digital Forensic Lab at CERT-In and received the Digital Forensic Analyst Excellence Award in 2021.",
  },
  {
    name: "Shri. Shakhir Khan",
    desc: "Indian Classical Musician",
    img: require("../../../assets/speakers/Shri-Shakhir-Khan.webp"),
    link: "https://youtu.be/NAPCZvHKTeM?si=vc9oquwfVQMhMdGW",
    bio: "Shri Shakir Khan stands as a luminary in the realm of Hindustani instrumental music, inheriting the rich legacy of the legendary Etawah Gharana. Trained under the illustrious Ustad Shahid Parvez Khan for 25 years, Shakir epitomizes the eighth generational link in an unbroken lineage of musical brilliance, rooted in the sitar and surbahar.",
  },
  {
    name: "Siddharth Mayur",
    desc: "Founder & CEO",
    img: require("../../../assets/speakers/Siddharth-Mayur.webp"),
    link: "https://youtu.be/naTQYghjvTU?si=wGUjqsJpo9d31n5Z",
    bio: "Founder and CEO at h2epower, MPowerInside and homi_hydrogen, a Working President at MahaChess. A first generation social entrepreneur with a mission to bring about energy security and energy independence to the masses using renewable and clean energy power.",
  },
  {
    name: "Sonal Ved",
    desc: "Culinary Journalist",
    img: require("../../../assets/speakers/Sonal-Ved.webp"),
    link: "https://youtu.be/bd8LQK8AHdA?si=i9shywqHPR2xZobK",
    bio: "Sonal Ved, the accomplished food writer and Vogue India's food editor, shapes the magazine's gastronomic content with her culinary expertise. She has made a lasting impact on India's culinary scene through captivating features in publications like Times of India, TimeOut (Mumbai), Uppercrust magazine, Verve magazine, and Hindustan Times.",
  },
  {
    name: "Dr. Swati Daithankar",
    desc: "Indian Classical Dance Artist",
    img: require("../../../assets/Swati-Dhaitankar.webp"),
    link: "https://youtu.be/gjApRL3Pk_o?si=EOZrGo8PkTpZ69_g",
    bio: "Dr. Swati Daithankar, a distinguished Bharatanatyam artist, emerged as a beacon in the realm of dance. Graduating with top honors from Bombay University in English Literature, she delved into the world of Bharatanatyam at Nalanda Dance Research Centre.",
  },
  {
    name: "Prof. Dr. Vasant Shinde",
    desc: "Archaeology Researcher",
    img: require("../../../assets/speakers/Vasant-Shinde.webp"),
    link: "https://youtu.be/B6__B96pYsI?si=6xkt63xDCo5lQdg4",
    bio: "Adjunct professor at National Institute of Advanced Studies, IIC campus, Bangalore. Former professor and vice-chancellor at Deccan College. Renowned for his research in South Asian Archaeology and brings expertise to archaeological studies and academic administration.",
  },
];

const PunarutthanTalksSection = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  return (
    <section className="talks-section punarutthan-talks">
      <h2>Talks</h2>
      <div className="talks-grid">
        {speakers.map((speaker, index) => (
          <div className="speaker-card" key={index}>
            <img src={speaker.img} alt={speaker.name} loading="lazy" />
            <div className="speaker-info">
              <div className="speaker-text">
                <h3>{speaker.name}</h3>
                <p>{speaker.desc}</p>
              </div>
              <div className="speaker-action-buttons">
                <a
                  href={speaker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-btn"
                >
                  Watch <FaYoutube className="yt-icon" />
                </a>
                <button
                  type="button"
                  className="learn-more-btn"
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

export default PunarutthanTalksSection;
