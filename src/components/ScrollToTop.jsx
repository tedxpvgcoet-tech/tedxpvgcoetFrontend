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
      window.scrollTo(0, 0);
      // For older browsers/Safari
      document.body.scrollTop = 0;

      // Restore CSS-defined smooth scrolling
      document.documentElement.style.scrollBehavior = "";
    }, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
