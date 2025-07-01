// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SpeakerForm from "./pages/SpeakerForm";
import SponsorForm from "./pages/SponsorForm";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/speaker-nomination" element={<SpeakerForm />} />
        <Route path="/sponsor-nomination" element={<SponsorForm />} />
      </Routes>
    </div>
  );
}

export default App;
