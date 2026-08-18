import React from "react";
import "./FooterSection.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const FooterSection = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-background-image" />

      <div className="footer-content">
        {/* Left Section: Logo, Description, Icons */}
        <div className="footer-left">
          <h2 className="footer-logo">
            TED<span className="highlight-red">x</span>PVGCOETM
          </h2>

          <p className="footer-description">
            This independent TEDx event is operated under licence from TED.
          </p>

          <div className="footer-icons">
            <a
              href="https://www.instagram.com/tedxpvgcoet/?hl=en"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/company/tedxpvgcoet/?originalSubdomain=in"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://x.com/TEDxPVGCOET"
              target="_blank"
              rel="noreferrer"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>

        {/* Right Section: Link Columns */}
        <div className="footer-links">
          <div>
            <Link to="/speaker">Speaker Nomination</Link>
            <Link to="/events">Events</Link>
            <Link to="/sponsor">Partner With Us</Link>
          </div>

          <div>
            <Link to="/about">About</Link>
            <Link to="/">Home</Link>
            <Link to="/team">Team</Link>
          </div>

          <div className="contact-card">
            <p>
              <strong>Contact Us:</strong>
              <br />
              <strong>Omkar Hokarne</strong>
              <br />
              (Licensee & Organizer)
              <br />
              +91 8600089167
              <br />
              omkarhokarne23@gmail.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;