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
import TakeTheLeap from "./pages/TakeTheLeap"

inject();

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/speaker" element={<SpeakerForm />} />
        <Route path="/sponsor" element={<SponsorForm />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/events/Punarutthan" element={<Punarutthan />} />
        <Route path="/events/AvantGarde" element={<AvantGarde />} />
        <Route path="/events/TakeTheLeap" element={<TakeTheLeap />} />
      </Routes>
    </>
  );
}

export default App;
