import React, {useState} from "react";
import "./PunarutthanTeamFinanceandSponsorshipSection.css";

// Replace with actual team data and images
const teamMembers = [
 {
    name: "Ved Dalvi",
    role: "Finance & Sponsorship Lead",
    img: require("../../../assets/team/F&S_Ved_Dalvi.webp")
  },
  {
    name: "Aarya Gandhe",
    role: "Member",
    img: require("../../../assets/team/F&S_Aarya_Gandhe.webp")
  },
  {
    name: "Arav Petkar",
    role: "Member",
    img: require("../../../assets/team/F&S_Arav_Petkar.webp")
  },
  {
    name: "Nishikant Toshiwal",
    role: "Member",
    img: require("../../../assets/team/F&S_Nishikant_Toshniwal.webp")
  },
  {
    name: "Rugved Bopardikar",
    role: "Member",
    img: require("../../../assets/team/F&S_Rugved_Bopardikar.webp")
  },
  {
    name: "Hemil Shah",
    role: "Member",
    img: require("../../../assets/team/F&S_Hemil_Shah.webp")
  },
  {
    name: "Nachiket Kulkarni",
    role: "Member",
    img: require("../../../assets/team/F&S_Nachiket_Kulkarni.webp")
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

export default PunarutthanTeamFinanceandSponsorshipSection;
