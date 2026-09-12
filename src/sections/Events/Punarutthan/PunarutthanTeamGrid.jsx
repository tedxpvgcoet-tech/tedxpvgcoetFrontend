import React, { useState } from "react";
import "./PunarutthanTeamSection.css";

const PunarutthanTeamGrid = ({ title, teamMembers }) => {
  const [showAllMembers, setShowAllMembers] = useState(false);

  const initialMembersToShow = 3;

  const membersToRender = showAllMembers
    ? teamMembers
    : teamMembers.slice(0, initialMembersToShow);

  const hasMoreMembers = teamMembers.length > initialMembersToShow;

  return (
    <section className="team-section">
      <div className="team-section-dum">
        <h2>{title}</h2>

        <div className="team-grid">
          {membersToRender.map((member) => (
            <div className="team-card" key={member.name}>
              <img src={member.img} alt={member.name} loading="lazy" />

              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {hasMoreMembers && (
          <button
            className="see-more-btn"
            onClick={() => setShowAllMembers((prev) => !prev)}
          >
            {showAllMembers ? "See Less" : "See More"}
          </button>
        )}
      </div>
    </section>
  );
};

export default PunarutthanTeamGrid;
