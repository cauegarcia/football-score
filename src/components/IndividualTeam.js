import React from "react";
import { Link } from "react-router-dom";

const IndividualTeam = ({ team, showTeams }) => {
  const { id, name, country } = team;
  return (
    <div>
      <Link
        to={`/team/${id}`}
        className="container-fluid p-0 text-decoration-none"
        onClick={() => showTeams()}
      >
        <article className="p-0 px-2 pt-2 d-flex justify-content-between">
          <h6 className="m-0 text-hover-effect">{name}</h6>
          <span className="blue-font">{country}</span>{" "}
        </article>
      </Link>
    </div>
  );
};

export default IndividualTeam;
