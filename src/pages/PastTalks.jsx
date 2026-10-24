import React, { useState } from "react";
import { TALK_EVENTS, PAST_TALKS } from "../data/pastTalksData";
import { FaPlay, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import bgVideo from "../assets/backgrounds/background.mp4";
import "./PastTalks.css";

const PastTalks = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTalk, setSelectedTalk] = useState(null);

  const filteredTalks =
    activeFilter === "All"
      ? PAST_TALKS
      : PAST_TALKS.filter((talk) => talk.event === activeFilter);

  return (
    <div className="past-talks-page">
      <video autoPlay loop muted playsInline className="past-talks-bg-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="past-talks-container">
        <h1 className="past-talks-heading">Past Talks</h1>

        {/* Filter Bar */}
        <div className="talks-filter-bar">
          {TALK_EVENTS.map((eventTag) => (
            <button
              key={eventTag}
              className={`filter-pill ${activeFilter === eventTag ? "active" : ""}`}
              onClick={() => setActiveFilter(eventTag)}
            >
              {eventTag}
            </button>
          ))}
        </div>

        <div className="talks-grid">
          {filteredTalks.map((talk) => {
            const thumbnailUrl =
              talk.thumbnail ||
              (talk.youtubeId
                ? `https://img.youtube.com/vi/${talk.youtubeId}/hqdefault.jpg`
                : "");

            return (
              <div
                key={talk.id}
                className="talk-card"
                onClick={() => setSelectedTalk(talk)}
                role="button"
                tabIndex={0}
              >
                <div className="talk-thumbnail-wrapper">
                  <img
                    src={thumbnailUrl}
                    alt={talk.title}
                    className="talk-thumbnail"
                    loading="lazy"
                  />
                  <div className="play-overlay">
                    <div className="play-btn-circle">
                      <FaPlay className="play-icon" />
                    </div>
                  </div>
                </div>

                <div className="talk-info">
                  <div className="talk-meta">
                    <span className="talk-event">
                      {talk.event.toUpperCase()}
                    </span>
                    {talk.date && (
                      <span className="talk-date"> • {talk.date}</span>
                    )}
                  </div>
                  <h3 className="talk-title">{talk.title}</h3>
                  <p className="talk-speaker">{talk.speaker}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedTalk && (
        <div
          className="video-modal-backdrop"
          onClick={() => setSelectedTalk(null)}
        >
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal-btn"
              onClick={() => setSelectedTalk(null)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <div className="iframe-responsive-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${selectedTalk.youtubeId}?autoplay=1`}
                title={selectedTalk.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Modal Info Footer */}
            <div className="modal-info-footer">
              <div className="modal-text">
                <h3 className="modal-talk-title">{selectedTalk.title}</h3>
                <p className="modal-talk-speaker">
                  {selectedTalk.speaker} • {selectedTalk.event}
                </p>
              </div>
              {selectedTalk.youtubeUrl && (
                <a
                  href={selectedTalk.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="modal-youtube-btn"
                >
                  Watch on YouTube <FaExternalLinkAlt />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastTalks;
