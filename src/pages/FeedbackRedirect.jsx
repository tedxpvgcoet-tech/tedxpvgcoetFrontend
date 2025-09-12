import { useEffect } from "react";

function CamRedirect() {
  useEffect(() => {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSeUC3vS8AfM1NmXKI3WSQZPl2hliIGMq9tuOAhxpUutPUzdvA/viewform?usp=dialog";
  }, []);

  return <p></p>;
}

export default CamRedirect;
