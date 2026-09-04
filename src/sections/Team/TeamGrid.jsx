import React from "react";
import { useLocation, useParams } from "react-router-dom";
import teamData from "./team.json";
import "./TeamGrid.css";
import "../../pages/Team.css";

const getImage = (imgPath) => {
  try {
    return require(`../../assets/B-W Individual/${imgPath}`);
  } catch (err) {
    console.error(`Image not found: ${imgPath}`, err);
    return "";
  }
};

const TeamGrid = ({ teamKey }) => {
  const location = useLocation();
  const params = useParams();

  const resolvedKey =
    teamKey || params.teamName || location.pathname.replace(/^\//, "");

  const currentTeam = teamData[resolvedKey];

  if (!currentTeam) {
    return null;
  }

  const { title, isTwoColumn, members = [] } = currentTeam;

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
                src={getImage(member.image)}
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
