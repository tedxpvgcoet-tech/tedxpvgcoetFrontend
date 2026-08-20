import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaBars } from "react-icons/fa";
import logo from "../assets/logos/tedx-logo.webp";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const smoothScrollToTop = () => {
    const startY =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (startY === 0) return;

    const duration = 600; // ms
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      const newY = startY * (1 - eased);
      document.documentElement.scrollTop = newY;
      document.body.scrollTop = newY;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Smooth animated scroll to top if already on home page
      smoothScrollToTop();
    } else {
      // Navigate to "/" if we are on a different page
      navigate("/", { replace: true });
    }
  };

  const path = location.pathname;
  const isEventPage = path.startsWith("/events");

  // Global scroll listener for all pages
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`navbar 
        ${scrolled ? "scrolled" : ""}
        ${isEventPage && !scrolled ? "transparent-navbar" : ""}
      `}
      >
        <div className="navbar-left">
          <Link to="/" onClick={handleLogoClick}>
            <img
              src={logo}
              alt="TEDxPVGCOET Logo"
              className="navbar-logo"
              loading="lazy"
            />
          </Link>
        </div>

        <div className="navbar-right">
          <a
            href="https://www.instagram.com/tedxpvgcoet/?hl=en"
            target="_blank"
            rel="noreferrer"
            className="nav-icon"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/company/tedxpvgcoet/?originalSubdomain=in"
            target="_blank"
            rel="noreferrer"
            className="nav-icon"
          >
            <FaLinkedin />
          </a>
          <div className="nav-menu-icon" onClick={() => setMenuOpen(true)}>
            <FaBars />
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div className={`nav-fullscreen ${menuOpen ? "" : "closed"}`}>
        <div className="nav-close-icon" onClick={() => setMenuOpen(false)}>
          ✕
        </div>
        <Link
          to="/"
          className="nav-dropdown-item"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="nav-dropdown-item"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>

        <Link
          to="https://tedxpvgcoet.substack.com/"
          className="nav-dropdown-item"
          onClick={() => setMenuOpen(false)}
        >
          News letter
        </Link>

        <Link
          to="/events"
          className="nav-dropdown-item"
          onClick={() => setMenuOpen(false)}
        >
          Events
        </Link>
        <Link
          to="/speaker"
          className="nav-dropdown-item"
          onClick={() => setMenuOpen(false)}
        >
          Speaker Nomination
        </Link>
        <Link
          to="/sponsor"
          className="nav-dropdown-item"
          onClick={() => setMenuOpen(false)}
        >
          Partner With Us
        </Link>
        <Link
          to="/team"
          className="nav-dropdown-item"
          onClick={() => setMenuOpen(false)}
        >
          Team
        </Link>
      </div>
    </>
  );
};

export default Navbar;
