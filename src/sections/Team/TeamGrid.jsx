import React from "react";
import "./TeamGrid.css";
import "../../pages/Team.css";

const TeamGrid = ({ title, members = [], isTwoColumn = false }) => {
  return (
    <div className="team-grid-page team-page">
      <div id="page-top" />
      <div className="title-hero">
        <h1 className="team-grid-title">{title}</h1>
      </div>
      <div className={`team-chessboard-grid ${isTwoColumn ? "two-col" : ""}`}>
        {members.map((member, index) => {
          const isEvenRow = Math.floor(index / 2) % 2 === 0;

          const renderImage = (
            <div className="team-img-tile" key={`${index}-img`}>
              <img
                src={member.image}
                alt={member.name}
                className="chessboard-img"
                loading="lazy"
              />
            </div>
          );

          const renderInfo = (
            <div className="team-info-tile" key={`${index}-info`}>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              {member.social && (
                <div className="social-icons">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                  )}
                  {member.social.instagram && (
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} Instagram`}
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                  {member.social.website && (
                    <a
                      href={member.social.website}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} Website`}
                    >
                      <i className="fas fa-user"></i>
                    </a>
                  )}
                </div>
              )}
            </div>
          );

          return isEvenRow
            ? [renderImage, renderInfo]
            : [renderInfo, renderImage];
        })}
      </div>
    </div>
  );
};

export default TeamGrid;
