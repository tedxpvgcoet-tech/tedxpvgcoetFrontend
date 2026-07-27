import React, { useState } from "react";
import "../../PunarutthanTeamLogisticsandOperationSection.css";

// Replace with actual team data and images
const teamMembers = [
   {
    name: "Dhrushti Chilveri",
    role: "Media and Communication Lead",
    img: require("../../../assets/team/M&C_Dhrushti_Chilveri.webp")
  },
  {
    name: "Komal Pathare",
    role: "Media and Communication Lead",
    img: require("../../../assets/team/M&C_Komal_Pathare.webp")
  },
  {
    name: "Tanmay Mare",
    role: "Member",
    img: require("../../../assets/team/M&C_Tanmay_Mare.webp")
  },
  {
    name: "Yash Garve",
    role: "Member",
    img: require("../../../assets/team/M&C_Yash_Garve.webp")
  },
  {
    name: "Afaan Shaikh",
    role: "Member",
    img: require("../../../assets/team/M&C_Afaan_Shaikh.webp")
  },
  {
    name: "Ishika Dhorajkar",
    role: "Member",
    img: require("../../../assets/team/M&C_Ishika_Dhorajkar.webp")
  },
  {
    name: "Varun Tammewar",
    role: "Member",
    img: require("../../../assets/team/M&C_Varun_Tammewar.webp")
  },
 
 
  
    // Add more members as needed
];

const PunarutthanTeamMediaandCommunicationSection = () => {
  // State to manage visibility: initially false (show limited members)
      const [showAllMembers, setShowAllMembers] = useState(false);
  
      // Number of members to show initially (e.g., 2 rows of 3 = 6 members)
      const initialMembersToShow = 3;
  
      // Determine which members to render based on the 'showAllMembers' state
      const membersToRender = showAllMembers
          ? teamMembers
          : teamMembers.slice(0, initialMembersToShow);
  
      // Check if there are more members than the initial display count
      const hasMoreMembers = teamMembers.length > initialMembersToShow;
  
      return (
          <section className="team-section">
              <div className="team-section-dum">
                  <h2>Team Media and Communication</h2>
                  <div className="team-grid">
                      {membersToRender.map((member, index) => (
                          <div className="team-card" key={index}>
                              <img src={member.img} alt={member.name}  loading="lazy" />
                              <div className="team-info">
                                  <h3>{member.name}</h3>
                                  <p>{member.role}</p>
                              </div>
                          </div>
                      ))}
                  </div>
  
                  {/* Render the "See More/Less" button only if there are more members */}
                  {hasMoreMembers && (
                      <button
                          className="see-more-btn" // Add this class to your CSS
                          onClick={() => setShowAllMembers(!showAllMembers)}
                      >
                          {showAllMembers ? "See Less" : "See More"}
                      </button>
                  )}
              </div>
              {/* You had FooterSection here previously, I've kept it as it was if you want it here */}
              {/* <FooterSection /> */}
          </section>
      );
};

export default PunarutthanTeamMediaandCommunicationSection;
