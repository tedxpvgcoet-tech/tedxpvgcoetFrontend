import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import { inject } from "@vercel/analytics";
import { Helmet } from "react-helmet";

const Home = lazy(() => import("./pages/Home"));
const SpeakerForm = lazy(() => import("./pages/SpeakerForm"));
const SponsorForm = lazy(() => import("./pages/SponsorForm"));
const CamRedirect = lazy(() => import("./pages/CamRedirect"));
const TicketRedirect = lazy(() => import("./pages/TicketRedirect"));
const FeedbackRedirect = lazy(() => import("./pages/FeedbackRedirect"));
const Event = lazy(() => import("./pages/Event"));
const Punarutthan = lazy(() => import("./pages/Punarutthan"));
const AvantGarde = lazy(() => import("./pages/AvantGarde"));
const Team = lazy(() => import("./pages/Team"));
const TeamGrid = lazy(() => import("./sections/Team/TeamGrid"));
const TakeTheLeap = lazy(() => import("./pages/TakeTheLeap"));
const Drishti = lazy(() => import("./pages/Drishti"));
const NotFound = lazy(() => import("./pages/NotFound"));
const InternalBillsPage = lazy(() => import("./pages/InternalBillsPage"));
const ShipExperience = lazy(() => import("./pages/ShipExperience"));
const ShipOfTheseusEvent = lazy(() => import("./pages/ShipOfTheseusEvent"));

const NewTeam = lazy(() => import("./pages/NewTeam"));
const PastTalks = lazy(() => import("./pages/PastTalks"));
const Blogs = lazy(() => import("./pages/Blogs"));

inject();

function App() {
  const location = useLocation();
  const isShipRoute = location.pathname === "/ship";
  const isTicketRoute =
    location.pathname === "/ticket" || location.pathname === "/tickets";
  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem("tedxIntroShown") !== "true";
  });

  useEffect(() => {
    if (!showIntro || isShipRoute) {
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("tedxIntroShown", "true");
      setShowIntro(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [showIntro, isShipRoute]);

  return (
    <>
      <Helmet>
        <meta
          name="google-site-verification"
          content="efky2cFQbihVK_S-KaXPPK9S0J1-iJF7TMgFrAR8NXU"
        />
      </Helmet>

      <ScrollToTop />

      {showIntro && !isShipRoute && !isTicketRoute ? (
        <Loader forceFullIntro />
      ) : (
        <>
          <Navbar />

          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<ShipOfTheseusEvent />} />
              <Route path="/speaker" element={<SpeakerForm />} />
              <Route path="/sponsor" element={<SponsorForm />} />

              <Route path="/events" element={<Event />} />
              <Route path="/events/drishti" element={<Drishti />} />
              <Route path="/events/punarutthan" element={<Punarutthan />} />
              <Route path="/events/avant-garde" element={<AvantGarde />} />
              <Route path="/events/take-the-leap" element={<TakeTheLeap />} />

              <Route path="/team" element={<NewTeam />} />
              <Route path="/team-2025" element={<Team />} />
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
              <Route path="/bridgekeeper" element={<InternalBillsPage />} />
              <Route path="/qr" element={<InternalBillsPage />} />
              <Route path="/app" element={<InternalBillsPage />} />

              <Route path="/about" element={<Home />} />
              <Route path="/ship" element={<ShipExperience />} />
              <Route path="/ship-of-theseus" element={<ShipOfTheseusEvent />} />
              <Route path="/theme" element={<Drishti />} />
              <Route path="/feedback" element={<FeedbackRedirect />} />
              <Route path="/cam" element={<CamRedirect />} />
              <Route path="/ticket" element={<TicketRedirect />} />
              <Route path="/tickets" element={<TicketRedirect />} />

              <Route path="/past-talks" element={<PastTalks />} />
              <Route path="/blogs" element={<Blogs />} />

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
