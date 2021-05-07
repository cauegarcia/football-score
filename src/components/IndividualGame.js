import React from "react";
import { Link } from "react-router-dom";

const IndividualGame = ({ match, children }) => {
  const {
    status,
    utcDate,
    id,
    score,
    homeTeam: { name: home },
    awayTeam: { name: away },
  } = match;
  const {
    halfTime: { awayTeam: scoreAwayHalf, homeTeam: scoreHomeHalf },
    fullTime: { awayTeam: scoreAwayFull, homeTeam: scoreHomeFull },
  } = score;
  const offset = new Date().getTimezoneOffset() * 60 * 1000;
  const offsetDif = new Date(utcDate).getTime() - offset;
  const timeAdjusted = new Date(offsetDif).toISOString();

  let matchHour = timeAdjusted.split("T")[1].split("Z")[0].split(":");
  matchHour = `${matchHour[0]}:${matchHour[1]}`;

  return (
    <Link
      to={`/match/${id}`}
      key={id}
      style={{ borderBottom: "1px solid #6600FF" }}
      className="d-block text-reset text-decoration-none ind-game px-2"
    >
      <article className="py-2">
        <div className="row p-0 ps-md-1 ps-md-2 container-fluid m-0">
          <div
            className={`${
              status === "FINISHED"
                ? "grey-font col-3 col-md-2 my-auto p-0 me-2"
                : status === "IN_PLAY" || status === "PAUSED"
                ? "fw-bold font-red-detail col-3 col-md-2 my-auto p-0 me-2"
                : "grey-font col-3 col-md-2 my-auto p-0 me-2"
            }`}
          >
            {children}
            {status === "FINISHED"
              ? "Finished"
              : status === "IN_PLAY"
              ? scoreAwayHalf === null && scoreHomeHalf === null
                ? "First Half"
                : "Second Half"
              : status === "PAUSED"
              ? "Interval"
              : matchHour}
          </div>
          <div className="col d-md-flex p-1 ">
            <div className="row container-fluid p-0 justify-content-between align-items-center">
              <div className="col-10 col-md p-0 py-1 px-md-1 graduate-font text-light text-md-end">
                {home}
              </div>
              <div
                className={`${
                  status !== "FINISHED"
                    ? "col-1 col-md-2 fs-5 text-light text-end"
                    : "col-1 col-md-2 fs-5 text-secondary text-end"
                }`}
              >
                {scoreHomeFull}
              </div>
            </div>
            <div
              className="h5 m-0 container px-1 text-center d-none d-md-flex justify-content-center align-items-center"
              style={{ width: "50px", color: "#6600FF" }}
            >
              X
            </div>
            <div className="row container-fluid p-0 d-md-flex flex-md-row-reverse justify-content-between align-items-center">
              <div className="col-10 col-md py-1 p-0 px-md-1 graduate-font text-light pe-md-2 text-md-start">
                {away}
              </div>
              <div
                className={`${
                  status !== "FINISHED"
                    ? "col-1 col-md-2 text-light fs-5"
                    : "col-1 col-md-2 text-secondary fs-5"
                }`}
              >
                {scoreAwayFull}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default IndividualGame;
