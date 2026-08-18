import React from "react";
import { Helmet } from "react-helmet";
import PerspectiveSection from "../sections/Common/PerspectiveSection";
import DrishtiSection from "../sections/Events/Drishti/DrishtiSection";
import Speaker from "../sections/Forms/Speaker";
import Booknow from "../sections/Booknow";
import DrishtiVideo from "../sections/Events/Drishti/DrishtiVideo";

const ThemePage = () => {
  return (
    <>
      <Helmet defer={false}>
        <title>Home | TEDxPVGCOET</title>
      </Helmet>
      <Booknow />
      <DrishtiVideo />
      <DrishtiSection />
      <Speaker />
      <PerspectiveSection />
    </>
  );
};

export default ThemePage;
