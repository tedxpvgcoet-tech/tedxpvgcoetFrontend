import React,{useState} from "react";
import "./PunarutthanTeamDesignandProductionSection.css";
import FooterSection from "../../Common/FooterSection";

const teamMembers = [
{
    name: "Nirjara Mhaskar",
    role: "Design & Production Lead",
    img: require("../../../assets/team/D&P_Nirjara_Mhaskar.webp")
  },
  {
    name: "Ayush Koparde",
    role: "Design & Production Lead",
    img: require("../../../assets/team/D&P_Ayush_Koparde.webp")
  },
   {
    name: "Sahil Batgeri",
    role: "Member",
    img: require("../../../assets/team/D&P_Sahil_Batgeri.webp")
  },
  {
    name: "Avani Thakur",
    role: "Member",
    img: require("../../../assets/team/D&P_Avani_Thakur.webp")
  },
  {
    name: "Vishwajit Sherkar",
    role: "Member",
    img: require("../../../assets/team/D&P_Vishwajit_Sherkar.webp")
  },
  {
    name: "Shreenidhi Bedarkar",
    role: "Member",
    img: require("../../../assets/team/D&P_Shreenidhi_Bedarkar.webp")
  },
  {
    name: "Vedant Joshi",
    role: "Member",
    img: require("../../../assets/team/D&P_Vedant_Joshi.webp")
  },
  {
    name: "Shruti Natekar",
    role: "Member",
    img: require("../../../assets/team/D&P_Shruti_Natekar.webp")
  },
   {
    name: "Rutvij Deo",
    role: "Member",
    img: require("../../../assets/team/D&P_Rutvij_Deo.webp")
  },
];

const PunarutthanTeamDesignandProductionSection = () => {
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
                <h2>Team Design and production</h2>
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
            <FooterSection /> 
        </section>
    );
};

export default PunarutthanTeamDesignandProductionSection;
