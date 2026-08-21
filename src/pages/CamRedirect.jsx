import { useEffect } from "react";
import { Helmet } from "react-helmet";

function CamRedirect() {
  useEffect(() => {
    window.location.href = "https://www.cam.tedxpvgcoet.in";
  }, []);

  return (
    <>
      <Helmet defer={false}>
        <title>Redirecting... | TEDxPVGCOET</title>
      </Helmet>
      <p>Redirecting...</p>
    </>
  );
}

export default CamRedirect;
