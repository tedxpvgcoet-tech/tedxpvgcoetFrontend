import React, { useState } from "react";
import "./Speaker.css";
import speakerImage from "../assets/Bhooshan.png";

const SpeakerCard = ({ image, description }) => {
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

const Speaker = () => {
  const description =
    "Dr. Bhoshan Kelkar, an eminent thought leader and educator in emerging technologies, will be gracing the TEDxPVGCOET stage to share his insights on Artificial Intelligence. With decades of experience at the intersection of technology, innovation, and leadership, Dr. Kelkar has played a pivotal role in shaping the AI ecosystem in India. His session will explore how AI is transforming industries, reshaping human capabilities, and redefining the future of work and society.";

  const speakers = [
    { image: speakerImage, description },
    { image: speakerImage, description },
  ];

  return (
    <section className="speaker-section">
      {/* Mobile */}
      <div className="speaker-mobile">
        {speakers.map((s, i) => (
          <SpeakerCard
            key={i}
            image={s.image}
            description={s.description}
          />
        ))}
      </div>

      {/* Desktop */}
      <div className="speaker-desktop">
        {speakers.map((s, i) => (
          <SpeakerCard
            key={i}
            image={s.image}
            description={s.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Speaker;
