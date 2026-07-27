import React,{useState} from "react";
import "./PunarutthanTeamCurationSection.css";

const teamMembers = [
 {
    name: "Aniket Gaudgaul",
    role: "Curation Lead",
    img: require("../assets/team/Curation_Aniket_Gaudgal.webp")
  },
  {
    name: "Ankita Renuse",
    role: "Curation Lead",
    img: require("../assets/team/Curation_Ankita_Renuse.webp")
  },
   {
    name: "Girija Awate",
    role: "Member",
    img: require("../assets/team/Curation_Girija_Awate.webp")
  },
   {
    name: "Pushkar Tipre",
    role: "Member",
    img: require("../assets/team/Curation_Pushkar_Tipre.webp")
  },
   {
    name: "Monisha Aurora",
    role: "Member",
    img: require("../assets/team/Curation_Monisha_Aurora.webp")
  },
   {
    name: "Aakash Joshi",
    role: "Member",
    img: require("../assets/team/Curation_Aakash_Joshi.webp")
  },
   {
    name: "Sanavi Sonwane",
    role: "Member",
    img: require("../assets/team/Curation_Sanavi_Sonwane.webp")
  },
   {
    name: "Yuvraj Yadav",
    role: "Member",
    img: require("../assets/team/Curation_Yuvraj_Yadav.webp")
  },
   {
    name: "Swanand Nalawade",
    role: "Member",
    img: require("../assets/team/Curation_Swanand_Nalawade.webp")
  },
  {
    name: "Pratik Damani",
    role: "Member",
    img: require("../assets/team/Curation_Pratik_Damani.webp")
  },
];

const PunarutthanCurationSection = () => {
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
                <h2>Team Curation</h2>
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

export default PunarutthanCurationSection;
