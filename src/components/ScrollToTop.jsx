/*import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Scroll to top smoothly on route change
    window.scrollTo(0,0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
*/

// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Find the element with the ID "page-top"
    const topElement = document.getElementById("page-top");
    if (topElement) {
      // Use scrollIntoView to scroll to this element
      topElement.scrollIntoView({ behavior: "instant" });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;