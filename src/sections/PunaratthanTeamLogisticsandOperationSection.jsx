import React, { useState } from "react"; // Import useState hook
import "./PunarutthanTeamLogisticsandOperationSection.css";
import FooterSection from "../sections/FooterSection";

// Replace with actual team data and images
const teamMembers = [
    {
        name: "Ayushi Chougule",
        role: "Logistics and Operation Lead",
        img: require("../assets/L&O_Ayushi_Chougule.png")
    },
    {
        name: "Kasturi Bhandare",
        role: "Logistics and Operation Lead",
        img: require("../assets/L&O_Kasturi_Bhandare.png")
    },
    {
        name: "Omkar Kalburgi",
        role: "Member",
        img: require("../assets/L&O_Omkar_Kalburge.png")
    },
    {
        name: "Gaurav Dhande",
        role: "Member",
        img: require("../assets/L&O_Gaurav_Dhande.png")
    },
    {
        name: "Varad Ghumare",
        role: "Member",
        img: require("../assets/L&O_Varad_Ghumare.png")
    },
    {
        name: "Shruti Khumbar",
        role: "Member",
        img: require("../assets/L&O_Shruti_Kumbhar.png")
    },
    {
        name: "Akash Lohar",
        role: "Member",
        img: require("../assets/L&O_Akash_Lohar.png")
    },
    {
        name: "Apurv Kochar",
        role: "Member",
        img: require("../assets/L&O_Apurv_Kochar.png")
    },
    {
        name: "Janhavi Shinde",
        role: "Member",
        img: require("../assets/L&O_Janhavi_Shinde.png")
    },
    {
        name: "Jui Bramhe", // Corrected name, assuming it should be Jui Bramhe
        role: "Member",
        img: require("../assets/L&O_Jui_Bramhe.png")
    },
    {
        name: "Abhijeet Thore",
        role: "Member",
        img: require("../assets/L&O_Abhijeet_Thore.png")
    },
    {
        name: "Rudraunsh Joshi",
        role: "Member",
        img: require("../assets/L&O_Rudraunsh_Joshi.png")
    },
    // Add more members as needed
];

const PunarutthanTeamLogisticsandOperationSection = () => {
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
                <h2>Team Logistics and Operation</h2>
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

export default PunarutthanTeamLogisticsandOperationSection;