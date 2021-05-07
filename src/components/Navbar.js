import React from "react";
import { Link } from "react-router-dom";
import DisplayCompetitionsLinks from "./DisplayCompetitionsLinks";
import AutoSuggest from "./AutoSuggest";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md ">
      <div className="container-xl">
        <Link to="/" className="navbar-brand fs-2 text-light graduate-font">
          Football<span className="text-danger">Score</span>
        </Link>
        <AutoSuggest />
      </div>
    </nav>
  );
};

export default Navbar;
