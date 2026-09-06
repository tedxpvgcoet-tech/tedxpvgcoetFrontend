import React from "react";
import teamData from "./team.json";
import PunarutthanTeamGrid from "./PunarutthanTeamGrid";
import "./PunarutthanTeamSection.css";

const imageContext = require.context(
  "../../../assets/team",
  false,
  /\.(webp|png|jpe?g)$/,
);

const getTeamImage = (imageName) => {
  return imageContext(`./${imageName}`);
};

const PunarutthanTeamSection = () => {
  return (
    <>
      {Object.entries(teamData).map(([title, teamMembers]) => (
        <PunarutthanTeamGrid
          key={title}
          title={title}
          teamMembers={teamMembers.map((member) => ({
            ...member,
            img: getTeamImage(member.img),
          }))}
        />
      ))}
    </>
  );
};

export default PunarutthanTeamSection;
