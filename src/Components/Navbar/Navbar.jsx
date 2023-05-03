import React from "react";
import "./Navbar.css";

function Navbar() {
    return (
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/shirts" className="nav-link">
              Shirts
            </a>
          </li>
          <li className="nav-item">
            <a href="/boots" className="nav-link">
              Boots
            </a>
          </li>
        </ul>
      </nav>
    );
  }
  
  export default Navbar;
  
  
  
  
  
  