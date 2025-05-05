import React from 'react';
import { Link } from 'react-router-dom';
import { FaLungs } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <FaLungs className="nav-lung-icon" />
        <span className="navbar-title">Lungevity</span>
      </Link>
    </nav>
  );
}

export default Navbar;