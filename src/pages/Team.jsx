import React from "react";
import { Helmet } from "react-helmet";
import TeamHeroSection from "../sections/Team/TeamHeroSection";
import TeamDepartmentSection from "../sections/Team/TeamDepartmentSection";
import FooterSection from "../sections/Common/FooterSection";
import "./Team.css";

// Department Images
import coreImg from "../assets/team/core.webp";
import curationImg from "../assets/team/curation.webp";
import lnoImg from "../assets/team/lno.webp";
import ediImg from "../assets/team/edi.webp";
import mnmImg from "../assets/misc/MnM.webp";
import dnpImg from "../assets/team/dnp.webp";
import techImg from "../assets/team/tech.webp";
import finImg from "../assets/team/fin.webp";

const departments = [
  {
    id: "core",
    title: "Core",
    description:
      "They form the central pillar of TEDxPVGCOETM. They oversee the vision, ensure inter-team coordination, and maintain alignment with the TEDx philosophy. Their role is both strategic and supportive- guiding planning, enabling collaboration, and upholding the event's standards. With clarity of purpose and a commitment to excellence, they build the foundation upon which every team functions and every idea thrives.",
    image: coreImg,
    link: "/organizers-team",
  },
  {
    id: "curation",
    title: "Curation",
    description:
      "The Curation Team finds and refines the voices that define TEDx. Through research, outreach, and collaboration, they shape powerful talks that align with the TEDx mission and leave a lasting impact.",
    image: curationImg,
    link: "/curation-team",
  },
  {
    id: "lno",
    title: "Logistics & Operations",
    description:
      "This team handles all behind-the-scenes planning and execution. From scheduling and vendor coordination to real-time problem-solving, they make sure the event runs seamlessly from start to finish.",
    image: lnoImg,
    link: "/logistics-team",
  },
  {
    id: "editorial",
    title: "Editorial",
    description:
      "The Editorial Team crafts the written voice of TEDxPVGCOETM-from theme documents to speaker communications. They refine every word to ensure clarity, consistency, and alignment with the event's vision.",
    image: ediImg,
    link: "/editorial-team",
  },
  {
    id: "mnm",
    title: "Media & Marketing",
    description:
      "The Media and Marketing Team manages TEDxPVGCOETM’s public presence. They drive communication strategies, social media campaigns, and visual storytelling to ensure the event reaches and resonates with its audience.",
    image: mnmImg,
    link: "/media-team",
  },
  {
    id: "dnp",
    title: "Design & Production",
    description:
      "Responsible for the event's physical and visual experience, the DNP Team turns themes into immersive spaces. Through set design, spatial planning, and creative execution, they build the TEDx atmosphere.",
    image: dnpImg,
    link: "/design-team",
  },
  {
    id: "technical",
    title: "Technical",
    description:
      "The Technical Team powers the digital infrastructure of TEDxPVGCOETM. They manage the website, AV systems, livestreams, and real-time troubleshooting to ensure a smooth and glitch-free experience.",
    image: techImg,
    link: "/technical-team",
  },
  {
    id: "finance",
    title: "Finance & Sponsorship",
    description:
      "From sponsorships to budgeting, the Finance Team ensures the event is financially sound. They manage resources with transparency and foresight, supporting both creativity and sustainability.",
    image: finImg,
    link: "/finance-team",
  },
];

const Team = () => {
  return (
    <div className="team-page" id="page-top">
      <Helmet defer={false}>
        <title>Team | TEDxPVGCOET</title>
      </Helmet>
      <TeamHeroSection />
      {departments.map((dept) => (
        <TeamDepartmentSection key={dept.id} {...dept} />
      ))}
      <FooterSection />
    </div>
  );
};

export default Team;
