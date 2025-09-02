import React, { useState } from "react";
import "./Speaker.css";

const SpeakerCard = ({ speaker }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="speaker-card">
      {/* Mobile + Desktop shared logic */}
      {!showInfo ? (
        <div className="speaker-photo">
          <img src={speaker.image} alt={speaker.name} className="speaker-image" />
          <button
            className="speaker-learn-btn"
            onClick={() => setShowInfo(true)}
          >
            Learn More →
          </button>
        </div>
      ) : (
        <div className="speaker-info">
          <p className="speaker-description">{speaker.description}</p>
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

export default SpeakerCard;
