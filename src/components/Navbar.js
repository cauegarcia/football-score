import React from "react";
import { Link } from "react-router-dom";
import DisplayCompetitionsLinks from "./DisplayCompetitionsLinks";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md ">
      <div className="container-xl">
        <Link to="/" className="navbar-brand fs-2 text-light graduate-font">
          Football<span className="text-danger">Score</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="d-md-none collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="d-md-none navbar-nav text-light me-auto mb-2">
            <h5 className="graduate-font neon-effect text-center py-1">
              Competitions
            </h5>
            <DisplayCompetitionsLinks />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
