import React from "react";
import { Link } from "react-router-dom";
import AutoSuggest from "./AutoSuggest";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md ">
      <div className="container-xl d-flex flex-column align-items-center flex-md-row aligm-items-md-between">
        <Link
          to="/"
          className="navbar-brand fs-1 fw-bold text-uppercase text-light graduate-font"
        >
          Football<span style={{ color: "#6600FF" }}>Score</span>
        </Link>
        <AutoSuggest />
      </div>
    </nav>
  );
};

export default Navbar;
