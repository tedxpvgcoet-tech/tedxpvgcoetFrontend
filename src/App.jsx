import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop"; // ✅ import here

import Home from "./pages/Home";
import SpeakerForm from "./pages/SpeakerForm";
import SponsorForm from "./pages/SponsorForm";
import Event from "./pages/Event";
import Punarutthan from "./pages/Punarutthan";
import AvantGarde from "./pages/AvantGarde";

function App() {
  return (
    <>
      <ScrollToTop /> {/* ✅ include here */}
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
