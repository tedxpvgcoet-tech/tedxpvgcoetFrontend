import { useEffect } from "react";
import { Helmet } from "react-helmet";

function TicketRedirect() {
  useEffect(() => {
    window.location.replace("https://konfhub.com/tedxpvgcoetm");
  }, []);

  return (
    <>
      <Helmet defer={false}>
        <title>Redirecting to Tickets... | TEDxPVGCOET</title>
      </Helmet>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050607",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <p>Redirecting to tickets...</p>
      </div>
    </>
  );
}

export default TicketRedirect;
