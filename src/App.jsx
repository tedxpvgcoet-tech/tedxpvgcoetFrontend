import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import { inject } from "@vercel/analytics";
import { Helmet } from "react-helmet";

const Home = lazy(() => import("./pages/Home"));
const SpeakerForm = lazy(() => import("./pages/SpeakerForm"));
const SponsorForm = lazy(() => import("./pages/SponsorForm"));
const CamRedirect = lazy(() => import("./pages/CamRedirect"));
const FeedbackRedirect = lazy(() => import("./pages/FeedbackRedirect"));
const Event = lazy(() => import("./pages/Event"));
const Punarutthan = lazy(() => import("./pages/Punarutthan"));
const AvantGarde = lazy(() => import("./pages/AvantGarde"));
const Team = lazy(() => import("./pages/Team"));
const TeamGrid = lazy(() => import("./sections/Team/TeamGrid"));
const TakeTheLeap = lazy(() => import("./pages/TakeTheLeap"));
const ThemePage = lazy(() => import("./pages/ThemePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const InternalBillsPage = lazy(() => import("./pages/InternalBillsPage"));

inject();

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem("tedxIntroShown") !== "true";
  });

  useEffect(() => {
    if (!showIntro) {
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("tedxIntroShown", "true");
      setShowIntro(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [showIntro]);

  return (
    <>
      <Helmet>
        <meta
          name="google-site-verification"
          content="efky2cFQbihVK_S-KaXPPK9S0J1-iJF7TMgFrAR8NXU"
        />
      </Helmet>

      <ScrollToTop />

      {showIntro ? (
        <Loader forceFullIntro />
      ) : (
        <>
          <Navbar />

          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<ThemePage />} />
              <Route path="/speaker" element={<SpeakerForm />} />
              <Route path="/sponsor" element={<SponsorForm />} />

              <Route path="/events" element={<Event />} />
              <Route path="/events/Punarutthan" element={<Punarutthan />} />
              <Route path="/events/AvantGarde" element={<AvantGarde />} />
              <Route path="/events/TakeTheLeap" element={<TakeTheLeap />} />

              <Route path="/team" element={<Team />} />
              <Route
                path="/curation-team"
                element={<TeamGrid teamKey="curation-team" />}
              />
              <Route
                path="/logistics-team"
                element={<TeamGrid teamKey="logistics-team" />}
              />
              <Route
                path="/media-team"
                element={<TeamGrid teamKey="media-team" />}
              />
              <Route
                path="/editorial-team"
                element={<TeamGrid teamKey="editorial-team" />}
              />
              <Route
                path="/finance-team"
                element={<TeamGrid teamKey="finance-team" />}
              />
              <Route
                path="/design-team"
                element={<TeamGrid teamKey="design-team" />}
              />
              <Route
                path="/technical-team"
                element={<TeamGrid teamKey="technical-team" />}
              />
              <Route
                path="/organizers-team"
                element={<TeamGrid teamKey="organizers-team" />}
              />

              <Route path="/bills" element={<InternalBillsPage />} />

              <Route path="/about" element={<Home />} />
              <Route path="/feedback" element={<FeedbackRedirect />} />
              <Route path="/cam" element={<CamRedirect />} />

              {/* 404 - catch all unknown routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </>
      )}
    </>
  );
}

export default App;
