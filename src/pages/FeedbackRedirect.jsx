import { useEffect } from "react";
import { Helmet } from "react-helmet";

function CamRedirect() {
  useEffect(() => {
    window.location.href =
      "https://docs.google.com/forms/d/e/1FAIpQLSeUC3vS8AfM1NmXKI3WSQZPl2hliIGMq9tuOAhxpUutPUzdvA/viewform?usp=dialog";
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
