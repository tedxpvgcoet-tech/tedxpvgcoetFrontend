// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Run after the render and after browser native scroll restoration
    setTimeout(() => {
      // Temporarily overwrite global smooth scrolling
      document.documentElement.style.scrollBehavior = "auto";

      if (
        pathname === "/team" &&
        sessionStorage.getItem("restoreTeamScroll") === "true"
      ) {
        sessionStorage.removeItem("restoreTeamScroll");
        const scrollY = parseInt(
          sessionStorage.getItem("teamPageScrollY") || "0",
          10,
        );
        window.scrollTo(0, scrollY);
        document.body.scrollTop = scrollY;
      } else {
        window.scrollTo(0, 0);
        // For older browsers/Safari
        document.body.scrollTop = 0;
      }

      // Restore CSS-defined smooth scrolling
      document.documentElement.style.scrollBehavior = "";
    }, 10);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
