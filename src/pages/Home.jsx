import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../sections/HeroSection";
import AboutTED from "../sections/AboutTED";
import AboutTEDx from '../sections/AboutTEDx';
import WhatWeStandFor from "../sections/WhatWeStandFor";
import SubscribeSection from "../sections/SubscribeSection";
import GallerySection from "../sections/GallerySection";
import FooterSection from "../sections/FooterSection";
import { Routes, Route } from "react-router-dom";
import SpeakerForm from "../pages/SpeakerForm";
import SponsorForm from "../pages/SponsorForm";

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutTED />
      <AboutTEDx />
      <WhatWeStandFor />
      <SubscribeSection />
      <GallerySection />
    </>
  );
};

export default Home;
