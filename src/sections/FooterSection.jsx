import React from "react";
import "./FooterSection.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterSection = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-background-image" />

      <div className="footer-content">
        {/* Left Section: Logo, Description, Icons */}
        <div className="footer-left">
          <h2 className="footer-logo">
            TED<span className="highlight-red">x</span>PVGCOET
          </h2>
          <p className="footer-description">
            This independent TEDx event is operated under licence from TED.
          </p>
          <div className="footer-icons">
            <a href="https://www.instagram.com/tedxpvgcoet/?hl=en"><FaInstagram /></a>
            <a href="https://www.linkedin.com/company/tedxpvgcoet/?originalSubdomain=in"><FaLinkedin /></a>
          </div>
        </div>

        {/* Right Section: Link Columns */}
        <div className="footer-links">

          

          <div>
            <Link to="/speaker">Speaker Nomination</Link>
            <Link to="/Event">Events</Link>
            <Link to="/sponsor">Partner With Us</Link>
            
          </div>

          <div>
            <p onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
              About
            </p>
            <Link to="/">Home</Link>
            
          </div>

          <div className="contact-card">
             <p><strong>Contact Us:</strong><br /><strong>Abhijeet Thore</strong><br />(Licensee & Organizer)<br />
                +91 70581 82571<br />
                abhithore2704@gmail.com
            </p>
          </div>
            

         </div>
        </div>
    
    </footer>
  );
};

export default FooterSection;
