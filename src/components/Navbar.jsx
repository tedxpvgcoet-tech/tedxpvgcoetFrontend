
import React, { useState } from "react";
import { FaInstagram, FaLinkedin, FaBars } from "react-icons/fa";
import logo from "../assets/tedx-logo.png";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isEventPage = location.pathname === "/Event";

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isEventPage ? "transparent-navbar" : ""}`}>
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
        <div
          className="nav-menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </div>
      </div>

      {menuOpen && (
        <div className="nav-dropdown">
          <Link
            to="/"
            className="nav-dropdown-item"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <p
            className="nav-dropdown-item"
            onClick={() => handleScroll("about")}
          >
            About
          </p>
          <Link
            to="/Event"
            className="nav-dropdown-item"
            onClick={() => setMenuOpen(false)}
          >
            Events
          </Link>
          <br/>
          <br/>
          <Link to="/speaker" className="nav-dropdown-item" onClick={() => setMenuOpen(false)}>
            Speaker Nomination
          </Link>
          <br/>
          <br/>
          <Link to="/sponsor" className="nav-dropdown-item" onClick={() => setMenuOpen(false)}>
             Partner With Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
