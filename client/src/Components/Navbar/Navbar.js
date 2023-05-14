import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import "../../index.css";

const Navbar = () => {
  return (
    <div className="header">
      <Link to="/" className="logo">
        <span>C</span>ODE <span>M</span>ON
      </Link>
      <ul className="navbar">
        <li className="nav-item">
          <Link to="/">List</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
