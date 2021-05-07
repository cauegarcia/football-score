import React from "react";
import { competitions } from "../competitions";
import { Link } from "react-router-dom";

const DisplayCompetitionsLinks = ({ showCompetitions }) => {
  return (
    <React.Fragment>
      {competitions.map((competition) => {
        return (
          <Link
            to={`/competition/${competition.id}`}
            className="text-decoration-none container-fluid p-0 d-flex justify-content-between"
            key={competition.id}
            onClick={() => showCompetitions()}
          >
            <div
              className="p-0 container-fluid"
              style={{ borderColor: "#929eacf3" }}
            >
              <div className="container-fluid d-flex p-2 px-3 py-1 justify-content-between align-items-center container-fluid">
                <p className="m-0 h6 text-hover-effect">{competition.name}</p>{" "}
                <span
                  className="text-end d-inline-block"
                  style={{ height: "25px", color: "#6600FF" }}
                >
                  {competition.country}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </React.Fragment>
  );
};

export default DisplayCompetitionsLinks;
