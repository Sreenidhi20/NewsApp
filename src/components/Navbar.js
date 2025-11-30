import React from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ theme, onToggleTheme }) => {
  const navClass = theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light";

  return (
    <nav className={`navbar navbar-expand-lg ${navClass} shadow-sm`}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          NewsMonkey
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink end className="nav-link" to="/">
                General
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/business">
                Business
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/entertainment">
                Entertainment
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/health">
                Health
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/science">
                Science
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sports">
                Sports
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technology">
                Technology
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={onToggleTheme}
              aria-pressed={theme === "dark"}
              title="Toggle dark / light theme"
            >
              {theme === "dark" ? "Light" : "Dark"} Mode
            </button>
            {/* Placeholder for search or other controls */}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]),
  onToggleTheme: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  theme: "light",
};

export default Navbar;
