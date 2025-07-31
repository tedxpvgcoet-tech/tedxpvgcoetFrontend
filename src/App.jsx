import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { inject } from "@vercel/analytics";

import Home from "./pages/Home";
import SpeakerForm from "./pages/SpeakerForm";
import SponsorForm from "./pages/SponsorForm";
import Event from "./pages/Event";
import Punarutthan from "./pages/Punarutthan";
import AvantGarde from "./pages/AvantGarde";
import { Helmet } from "react-helmet"; 

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
      </Routes>
    </>
  );
}

export default App;
