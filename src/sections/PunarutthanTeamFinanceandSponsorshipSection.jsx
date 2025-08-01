import React, {useState} from "react";
import "./PunarutthanTeamFinanceandSponsorshipSection.css";
import FooterSection from "./FooterSection";

// Replace with actual team data and images
const teamMembers = [
 {
    name: "Ved Dalvi",
    role: "Finance & Sponsorship Lead",
    img: require("../assets/F&S_Ved_Dalvi.png")
  },
  {
    name: "Aarya Gandhe",
    role: "Member",
    img: require("../assets/F&S_Aarya_Gandhe.png")
  },
  {
    name: "Arav Petkar",
    role: "Member",
    img: require("../assets/F&S_Arav_Petkar.png")
  },
  {
    name: "Nishikant Toshiwal",
    role: "Member",
    img: require("../assets/F&S_Nishikant_Toshniwal.png")
  },
  {
    name: "Rugved Bopardikar",
    role: "Member",
    img: require("../assets/F&S_Rugved_Bopardikar.png")
  },
  {
    name: "Hemil Shah",
    role: "Member",
    img: require("../assets/F&S_Hemil_Shah.png")
  },
  {
    name: "Nachiket Kulkarni",
    role: "Member",
    img: require("../assets/F&S_Nachiket_Kulkarni.png")
  },
    // Add more members as needed
];

const PunarutthanTeamFinanceandSponsorshipSection = () => {
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
                <h2>Team Finance & Sponsorship</h2>
                <div className="team-grid">
                    {membersToRender.map((member, index) => (
                        <div className="team-card" key={index}>
                            <img src={member.img} alt={member.name} />
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

export default PunarutthanTeamFinanceandSponsorshipSection;
