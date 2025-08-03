import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { inject } from "@vercel/analytics";
import { Helmet } from "react-helmet"; 

import Home from "./pages/Home";
import SpeakerForm from "./pages/SpeakerForm";
import SponsorForm from "./pages/SponsorForm";
import Event from "./pages/Event";
import Punarutthan from "./pages/Punarutthan";
import AvantGarde from "./pages/AvantGarde";
import Team from "./pages/Team";
import CurationCard from "./sections/CurationCard";
import LogisticsCard from "./sections/LogisticsCard";
import MediaCard from "./sections/MediaCard";
import EditorialCard from "./sections/EditorialCard";
import FinanceCard from"./sections/FinanceCard";
import DesignCard from "./sections/DesignCard";
import TechnicalCard from"./sections/TechnicalCard";
import OrganizersCard from "./sections/OrganizersCard";
inject();

function App() {
  return (
    <>

      <Helmet>
        <meta name="google-site-verification" content="efky2cFQbihVK_S-KaXPPK9S0J1-iJF7TMgFrAR8NXU" />
      </Helmet>

      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/speaker" element={<SpeakerForm />} />
        <Route path="/sponsor" element={<SponsorForm />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/events/Punarutthan" element={<Punarutthan />} />
        <Route path="/events/AvantGarde" element={<AvantGarde />} />
        <Route path="/Team" element={<Team />} />  
        <Route path="/curation-team" element={<CurationCard />} /> 
        <Route path="/logistics-team" element={<LogisticsCard />} />
        <Route path="/media-team" element={<MediaCard />} /> 
        <Route path="/editorial-team" element={<EditorialCard />} />
        <Route path="/finance-team" element={<FinanceCard />} /> 
        <Route path="/design-team" element={<DesignCard />} />  
        <Route path="/technical-team" element={<TechnicalCard />} />  
         <Route path="/organizers-team" element={<OrganizersCard />} /> 

        
         

      </Routes>
    </>
  );
}

export default App;
