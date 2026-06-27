import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../images/ddsplm-logo.png';

const SITE = 'https://www.ddsplm.com';

// Slim header matching the main DDSPLM site (replaces the old mega-menu).
const Header = () => (
  <>
    <div className="dpl-topbar">
      <div className="dpl-wrap dpl-topbar-row">
        <span>Siemens <strong>Gold Partner</strong> &amp; Smart Expert Partner</span>
        <span className="dpl-topbar-sub">Simcenter · Teamcenter · NX · Solid Edge &amp; Altair</span>
      </div>
    </div>
    <header className="dpl-header">
      <div className="dpl-wrap dpl-header-row">
        <a className="dpl-logo" href={SITE} aria-label="DDSPLM home">
          <img src={logo} alt="DDSPLM" />
        </a>
        <nav className="dpl-nav">
          <a href={SITE}>Home</a>
          <a href={`${SITE}/solutions/Digital/nx/`}>Solutions</a>
          <a href={`${SITE}/events/`}>Events</a>
          <Link className="dpl-nav-active" to="/">Store</Link>
          <a className="dpl-cta" href={`${SITE}/contact/`}>Contact</a>
        </nav>
      </div>
    </header>
  </>
);

export default Header;
