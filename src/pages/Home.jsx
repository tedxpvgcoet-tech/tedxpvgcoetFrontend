import React from "react";
import HeroSection from "../sections/HeroSection";
import AboutTED from "../sections/AboutTED";
import AboutTEDx from '../sections/AboutTEDx';
import WhatWeStandFor from "../sections/WhatWeStandFor";
import SubscribeSection from "../sections/SubscribeSection";
import GallerySection from "../sections/GallerySection";

const Home = () => {
  return (
    <div id="page-top">
      <HeroSection />
      <AboutTED />
      <AboutTEDx />
      <WhatWeStandFor />
      <SubscribeSection />
      <GallerySection />
    </div>
  );
};

export default Home;
