import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';

function Navigation() {
  return (
    <nav className="nav" id="navbar">
      <NavLink end to="/" className="link">
        Home
      </NavLink>
      <NavLink to="/uncontrollable" className="link">
        Uncontrollable Form
      </NavLink>
      <NavLink to="/сontrolled" className="link">
        Controlled Form
      </NavLink>
    </nav>
  );
}

export default Navigation;
