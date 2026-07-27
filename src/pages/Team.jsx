import React from "react";
import TeamHeroSection from "../sections/Team/TeamHeroSection";
import Curation from "../sections/Team/Curation";
import Lno from "../sections/Team/Lno";
import Editorial from "../sections/Team/Editorial";
import Mnm from "../sections/Team/Mnm";
import Dnp from "../sections/Team/Dnp";
import Technical from "../sections/Team/Technical";
import Finance from "../sections/Team/Finance";
import FooterSection from "../sections/Common/FooterSection";
import Core from "../sections/Team/Core";
import "./Team.css"


const Team = () => {
    return (
        <div className="team-page"id="page-top">
          <TeamHeroSection />
          <Core />
          <Curation />
          <Lno />
          <Editorial />
          <Mnm />
          <Dnp />
          <Technical />
          <Finance />
          <FooterSection />
     
      {/* Other content/sections go here */}
    </div>
    );
};

export default Team;


