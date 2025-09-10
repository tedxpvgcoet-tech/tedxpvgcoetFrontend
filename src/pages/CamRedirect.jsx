import { useEffect } from "react";

function CamRedirect() {
  useEffect(() => {
    window.location.href = "https://www.cam.tedxpvgcoet.in";
  }, []);

  return <p>Redirecting to /cam...</p>;
}

export default CamRedirect;
