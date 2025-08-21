import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaBars } from "react-icons/fa";
import logo from "../assets/tedx-logo.png";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const path = location.pathname;
  const isEventPage = path === "/events" || path === "/events/TakeTheLeap" || path === "/events/AvantGarde" || path === "/events/Punarutthan";
  const isTeamPage = path === "/team";
  const isThemePage = path === "/";

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!isTeamPage) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTeamPage]);

  return (
    <>
      <nav
        className={`navbar 
        ${isEventPage ? "transparent-navbar" : ""}
        ${isTeamPage ? "team-navbar" : ""}
        ${isThemePage ? "team-navbar" : ""}
        ${isTeamPage && scrolled ? "team-navbar-scrolled" : ""}
      `}
      >
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} alt="TEDxPVGCOET Logo" className="navbar-logo" />
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
