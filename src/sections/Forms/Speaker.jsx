import React, { useState } from "react";
import "./Speaker.css";
import speakerImage from "../../assets/Drishti/Hruitvik.png";
import speakerImage3 from "../../assets/Drishti/Kedar.png";
import speakerImage4 from "../../assets/Drishti/Aditya.png";
import speakerImage2 from "../../assets/Drishti/Bhooshan.png";
import speakerImage5 from "../../assets/Drishti/Surabhi.png";
import speakerImage6 from "../../assets/Drishti/LSChaudhary.png";
import speakerImage7 from "../../assets/Drishti/Archit.png";
import speakerImage8 from "../../assets/Drishti/Manveer.png";
import "../Common/SectionHeader.css";

// 1. IMPORT ALL REQUIRED ICONS
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";

// Helper functions to extract IDs
const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  return match ? match[1] : null;
};

const getInstagramReelId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:instagram\.com.*\/reel\/)([\w-]+)/);
  return match ? match[1] : null;
};

// --- SpeakerCard Component ---
const SpeakerCard = ({
  image,
  description,
  instagramUrl,
  linkedinUrl,
  scholarUrl,
  youtubeUrl,
  reelUrl,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const ytId = getYouTubeId(youtubeUrl);
  const reelId = getInstagramReelId(reelUrl);
  const hasVideo = !!ytId || !!reelId;

  return (
    <>
      <div className="speaker-carde">
        {!showInfo ? (
          <div className="speaker-photo">
            <img
              src={image}
              alt="Speaker"
              className="speaker-image"
              loading="lazy"
            />
            <div className="speaker-front-actions">
              {hasVideo && (
                <button
                  className="speaker-watch-btn"
                  onClick={() => setShowVideo(true)}
                >
                  {ytId ? (
                    <><FaYoutube className="watch-icon" /> Watch Talk</>
                  ) : (
                    <><FaInstagram className="watch-icon" /> Watch Reel</>
                  )}
                </button>
              )}
              <button
                className="speaker-learn-btn"
                onClick={() => setShowInfo(true)}
              >
                Learn More →
              </button>
            </div>
          </div>
        ) : (
          <div className="speaker-infoe">
            <p className="speaker-description">{description}</p>

            <div className="speaker-socials">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Instagram profile"
                >
                  <FaInstagram />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="LinkedIn profile"
                >
                  <FaLinkedin />
                </a>
              )}
              {scholarUrl && (
                <a
                  href={scholarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Google Scholar profile"
                >
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

      {showVideo && (
        <div className="speaker-video-modal" onClick={() => setShowVideo(false)}>
          <div className="speaker-video-content" onClick={(e) => e.stopPropagation()}>
            <button className="speaker-video-close" onClick={() => setShowVideo(false)}>
              ×
            </button>
            {ytId ? (
              <iframe
                className="speaker-iframe"
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : reelId ? (
              <iframe
                className="speaker-iframe-reel"
                src={`https://www.instagram.com/reel/${reelId}/embed`}
                title="Instagram Reel"
                frameBorder="0"
                allow="encrypted-media"
                scrolling="no"
              ></iframe>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

// --- Main Speaker Section Component ---
const Speaker = () => {
  // 3. UPDATE DATA with new linkedinUrl and scholarUrl fields
  const speakers = [
    {
      id: 1,
      image: speakerImage,
      description:
        "Once a badminton player with a career-high global ranking of 140, Hruitvik Ambekar now transforms stories of sport, struggle, and self-discovery into life lessons. From athlete to professional and four-time TEDx speaker, he redefines vision beyond victory.",
      instagramUrl: "https://www.instagram.com/hruitvikambekar/",
      linkedinUrl: "https://www.linkedin.com/in/hruitvik-ambekar-87a8631b1/",
      youtubeUrl: "https://youtu.be/iLB67EgWHqQ?si=eIqnw9-E772Hz1mf",
    },
    {
      id: 2,
      image: speakerImage2,
      description:
        "Dr. Bhooshan Kelkar is a prism of ideas where technology, education, and imagination converge to create meaningful change. With 23 US patents and 17 books, he transforms complexity into clarity. An AI visionary and mentor, he inspires audiences to look beyond marksheets toward the future.",
      linkedinUrl: "https://www.linkedin.com/in/bhooshan-kelkar/",
      youtubeUrl: "https://youtu.be/l4UtmTWZqsA",
    },
    {
      id: 3,
      image: speakerImage3,
      description:
        "Kedar Patankar blends technology, storytelling, and environmental action. He has led semiconductor breakthroughs, created acclaimed works like Scam 2003, and, as TEDx speaker and SI-GPT CTO, merges technical mastery with entrepreneurial vision. Founder of The Trash Talk, he turns sustainability into a movement.",
      instagramUrl: "https://www.instagram.com/kedarpatankar_official/",
      youtubeUrl: "https://youtu.be/nV15ceT4LD0",
    },
    {
      id: 4,
      image: speakerImage4,
      description:
        "Dr. Aditya Abhyankar, Dean at SPPU, is a scientist, innovator, and thought leader. With 8 U.S. patents and 14 Indian patents, he bridges technology, philosophy, and entrepreneurship to redefine changemaking. He brings his journey of deep tech innovation to the TEDx stage.",
      scholarUrl:
        "https://scholar.google.com/citations?user=VnjgF5sAAAAJ&hl=en",
      youtubeUrl: "https://youtu.be/z2rUAc4LXAI",
    },
    {
      id: 5,
      image: speakerImage5,
      description:
        "Surabhi Handay , a celebrated actress in Marathi cinema admired for her portrayal of Mhalsa Devi in Jai Malhar, is an artist who seamlessly blends culture, theatre, and performance. An accomplished singer and storyteller, she goes beyond entertainment to explore the deeper essence of art and expression. From the cinematic stage to TEDxPVGCOET 2025, she arrives to share her artistic journey, unravel stories of culture and creativity, and offer a fresh perspective on the power of performance.",
      instagramUrl: "https://www.instagram.com/surbhihandayofficial/",
      youtubeUrl: "https://youtu.be/HVJ_mhU3W5s",
    },
    {
      id: 6,
      image: speakerImage6,
      description:
        "Major L. S. Chaudhary , a former Indian Army officer and Rashtriya Rifles veteran, has led high-stakes counter-terror operations in Kashmir, surviving near-death situations and neutralizing heavily armed insurgent groups under his command. His journey from battlefield grit and combat injuries to mentoring future leaders and training defence aspirants is one of resilience, clarity, and purpose. Through his talks and YouTube channel, he shares battlefield-tested lessons that transcend the military. At TEDxPVGCOET 2025, he brings a soldier’s perspective that can transform how we see leadership, resilience, and life itself.",
      instagramUrl: "https://www.instagram.com/major_lsc/",
      reelUrl: "https://www.instagram.com/reel/DN_NcTHk2QK/",
    },
    {
      id: 7,
      image: speakerImage7,
      description:
        "Archit Chandak , IPS officer of the 2018 batch and SP Akola, is redefining modern policing in Maharashtra with innovation, empathy, and vision. From introducing the Garud Drishti tool as DCP Nagpur—reshaping crime prevention with data and insight—to building citizen trust through direct dialogue on Instagram, he proves that policing today is as much about connection as it is about enforcement. At TEDxPVGCOET 2025, he brings his journey where technology meets leadership, action meets empathy, and public service becomes a force for lasting change.",
      instagramUrl: "https://www.instagram.com/archit.59/",
      reelUrl: "https://www.instagram.com/reel/DOEc0XGCM6f/",
    },
    {
      id: 8,
      image: speakerImage8,
      description:
        "Manveer Singh , Finance Educator and Pragmatic Investor, is transforming the way people understand money and markets. Through Stocks with Manveer, he simplifies stock market concepts for thousands of followers on Instagram and YouTube, empowering beginners to gain confidence and financial awareness. Believing that clarity and patience matter more than chasing quick profits, he inspires people to build sustainable wealth. At TEDxPVGCOET 2025, he reveals how a small shift in financial perspective can open doors to a transformed future.",
      instagramUrl: "https://www.instagram.com/stockswithmanveer/",
      youtubeUrl: "https://youtu.be/cigVHtEZrhY",
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
