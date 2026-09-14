import React, { useEffect } from "react";
import "./SpeakerBioModal.css";

const SpeakerBioModal = ({ speaker, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!speaker) return null;

  return (
    <div className="speaker-modal-overlay" onClick={onClose}>
      <div
        className="speaker-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="speaker-modal-close"
          onClick={onClose}
          aria-label="Close bio"
        >
          ×
        </button>
        <div className="speaker-modal-header">
          <img src={speaker.img} alt={speaker.name} />
          <div>
            <h3>{speaker.name}</h3>
            <h4>{speaker.desc}</h4>
          </div>
        </div>

        {speaker.quote && (
          <div className="speaker-modal-quote">"{speaker.quote}"</div>
        )}

        <div className="speaker-modal-bio">
          <p>{speaker.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default SpeakerBioModal;
