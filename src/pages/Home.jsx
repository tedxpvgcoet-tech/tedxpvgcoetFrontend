import React from "react";
import HeroSection from "../sections/Common/HeroSection";
import AboutTED from "../sections/Common/AboutTED";
import AboutTEDx from "../sections/Common/AboutTEDx";
import WhatWeStandFor from "../sections/Common/WhatWeStandFor";
import SubscribeSection from "../sections/Forms/SubscribeSection";
import GallerySection from "../sections/Common/GallerySection";

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
