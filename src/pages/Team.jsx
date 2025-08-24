import {React,useEffect} from "react";
import TeamHeroSection from "../sections/TeamHeroSection";
import Curation from "../sections/Curation";
import Lno from "../sections/Lno";
import Editorial from "../sections/Editorial";
import Mnm from "../sections/Mnm";
import Dnp from "../sections/Dnp";
import Technical from "../sections/Technical";
import Finance from "../sections/Finance";
import FooterSection from "../sections/FooterSection";
import Core from "../sections/Core";
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


