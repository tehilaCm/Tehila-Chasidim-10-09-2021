import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

import "./navbar.css"

const Navbar = () => {
  const closeNav = () => {
    let display = $(".collapse").css("display");
    if (display === "block") $("#navbarNav").hide("slow");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand nav-brand" to="/" onClick={() => closeNav()}>
            <i>
              <b>Weather</b>
            </i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => $("#navbarNav").toggle("slow")}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  onClick={() => closeNav()}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/favorites"
                  onClick={() => closeNav()}
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
