import React from 'react';
import './Footer.css';
import logo from '../images/ddsplm-logo.png';

const SITE = 'https://www.ddsplm.com';

// Slim footer matching the main DDSPLM site.
const Footer = () => (
  <footer className="dpl-footer">
    <div className="dpl-wrap dpl-footer-grid">
      <div className="dpl-footer-about">
        <img className="dpl-footer-logo" src={logo} alt="DDSPLM" />
        <p>Siemens Smart Expert Partner in India — software, services and support across design, simulation, manufacturing and PLM.</p>
        <div className="dpl-social">
          <a href="https://www.linkedin.com/company/ddsplm" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          <a href="https://www.youtube.com/channel/UC_WbD3tWvknbb8FaATXNnoQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          <a href="https://www.facebook.com/DDSPLM" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/ddsplmindia" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="https://twitter.com/DDSPLM" target="_blank" rel="noopener noreferrer" aria-label="X"><i className="fab fa-x-twitter"></i></a>
        </div>
      </div>

      <div className="dpl-footer-col">
        <h4>Explore</h4>
        <ul>
          <li><a href={`${SITE}/solutions/Digital/nx/`}>Solutions</a></li>
          <li><a href={`${SITE}/industries/automotive-ev/`}>Industries</a></li>
          <li><a href={`${SITE}/events/`}>Events &amp; Webinars</a></li>
          <li><a href={`${SITE}/blog/`}>Blog</a></li>
          <li><a href={`${SITE}/contact/`}>Contact</a></li>
        </ul>
      </div>

      <div className="dpl-footer-col">
        <h4>Store</h4>
        <ul>
          <li><a href="/">All products</a></li>
          <li><a href={`${SITE}/free-trial/`}>Free trial</a></li>
          <li><a href="mailto:sales@ddsplm.com">sales@ddsplm.com</a></li>
          <li><a href="tel:+919350633147">+91 93506 33147</a></li>
        </ul>
      </div>
    </div>

    <div className="dpl-footer-bottom">
      <div className="dpl-wrap">© {new Date().getFullYear()} DDSPLM Pvt. Ltd. · <a href={`${SITE}/privacy/`}>Privacy</a></div>
    </div>
  </footer>
);

export default Footer;
