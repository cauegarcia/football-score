import React from "react";
import { Link } from "react-router-dom";
import loadingLogo from "../assets/loading.gif";

const Teams = ({ loading, teams, handleTeams, displayAllTeams }) => {
  if (loading) {
    return (
      <div className="col-xl-3 d-none p-0 m-1 mx-2 mx-md-2 main-col-color d-xl-flex justify-content-center">
        <img
          style={{ width: "50px", height: "50px" }}
          src={loadingLogo}
          alt="loadingLogo"
          className="mt-5"
        />
      </div>
    );
  } else {
    const mapTeams = () => {
      return teams.map((team) => {
        const {
          id,
          name,
          area: { name: country },
        } = team;
        return (
          <div key={id}>
            <Link
              to={`/team/${id}`}
              className="container-fluid p-0 text-decoration-none"
            >
              <article className="p-0 px-2 pt-2 d-flex justify-content-between">
                <h6 className="m-0 text-light text-hover-effect">{name}</h6>
                <span className="grey-font">{country}</span>{" "}
              </article>
            </Link>
          </div>
        );
      });
    };
    return (
      <div className="col-xl-3 d-none d-xl-block p-0 m-1 mx-2 mx-md-2">
        <article className="table border-secondary m-0 main-col-color">
          <div>
            <h4
              style={{ background: "#5c5c5c" }}
              className="text-center p-2 pb-3 m-0 graduate-font neon-effect"
            >
              Teams
            </h4>
          </div>
          <div
            className="p-2 "
            style={{ background: "rgba(202, 228, 225, 0.1)" }}
          >
            <h5 className="m-0 neon-effect2">Main Teams</h5>
          </div>
          <article>{teams ? mapTeams() : "No teams to display"}</article>
          <button
            className="btn container m-0 mt-2 py-2"
            style={{ background: "rgba(202, 228, 225, 0.1)", color: "#c6e2ff" }}
            onClick={() => {
              handleTeams(!displayAllTeams);
            }}
          >
            <h5 className="m-0">
              {displayAllTeams ? "Less Teams" : "More teams"}
            </h5>{" "}
          </button>
        </article>
      </div>
    );
  }
};

export default Teams;
