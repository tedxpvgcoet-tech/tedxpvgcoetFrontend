import React,{useState} from "react";
import "./PunarutthanTeamEditorialSection.css";

const teamMembers = [
 {
    name: "Aditya Bhambe",
    role: "Editorial Lead",
    img: require("../assets/team/ED_Aditya_Bhambe.webp")
  },
 {
    name: "Saniya Deshpande",
    role: "Member",
    img: require("../assets/team/ED_Saniya_Deshpande.webp")
  },
   {
    name: "Pratik Limbekar",
    role: "Member",
    img: require("../assets/team/ED_Pratik_Limbekar.webp")
  },
   {
    name: "Vaidehi Deshpande",
    role: "Member",
    img: require("../assets/team/ED_Vaidehi_Deshpande.webp")
  },
   {
    name: "Prajakta Khaty",
    role: "Member",
    img: require("../assets/team/ED_Prajakta_Khaty.webp")
  },
   {
    name: "Aarya Joshi",
    role: "Member",
    img: require("../assets/team/ED_Aarya_Joshi.webp")
  },
   {
    name: "Vedaant Deshpande",
    role: "Member",
    img: require("../assets/team/ED_Vedaant_Deshpande.webp")
  },
   {
    name: "Maitrayee Bhave",
    role: "Member",
    img: require("../assets/team/ED_Maitrayee_Bhave.webp")
  },
   {
    name: "Sanidhya Adhau",
    role: "Member",
    img: require("../assets/team/F&S_Sanidhya_Adhau.webp")
  },
];

const PunarutthanTeamEditorialSection = () => {
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
                <h2>Team Editorial</h2>
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

export default PunarutthanTeamEditorialSection;
