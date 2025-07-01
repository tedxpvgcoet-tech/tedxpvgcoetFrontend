import React, { useState } from "react";
import { FaInstagram, FaLinkedin, FaBars } from "react-icons/fa";
import logo from "../assets/tedx-logo.png"; // Ensure this path is correct
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="TEDxPVGCOET Logo" className="navbar-logo" />
      </div>

      <div className="navbar-right">
        <span className="nav-item">Events</span>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="nav-icon">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="nav-icon">
          <FaLinkedin />
        </a>
        
        <div className="nav-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>
      </div>

      {menuOpen && (
        <div className="nav-dropdown">
          <p className="nav-dropdown-item" onClick={() => handleScroll("about")}>About</p>
          <p className="nav-dropdown-item" onClick={() => handleScroll("contact")}>Contact Us</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
