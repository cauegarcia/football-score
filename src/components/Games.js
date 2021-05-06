import React from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import loadingLogo from "../assets/loading.gif";

const Games = ({ games, loading, page, setPage }) => {
  if (loading) {
    return (
      <div className="col-md-8 col-xl-6 p-0 m-1 main-col-color d-flex justify-content-center">
        <img
          style={{ width: "50px", height: "50px" }}
          src={loadingLogo}
          alt="loadingLogo"
          className="mt-5"
        />
      </div>
    );
  } else {
    const getCalendar = () => {
      if (page === 0) {
        return `Today`;
      } else {
        const daysArray = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const today = new Date();
        const dif = today.getTime() + page * 86400 * 1000;
        const day = new Date(dif).getUTCDate();
        const month = new Date(dif).getUTCMonth() + 1;
        const weekday = new Date(dif).getDay();
        return `${day}/${month} - ${daysArray[weekday]}`;
      }
    };

    return (
      <div className="col-md-8 col-xl-6 p-0 m-1 me-md-2 m-xl-1">
        <div
          className="container-fluid main-col-color d-flex justify-content-center align-items-center p-2"
          style={{ background: "#5c5c5c" }}
        >
          <button
            className="btn neon-effect"
            onClick={() => {
              setPage(page - 1 > -4 ? page - 1 : -4);
            }}
          >
            <AiFillCaretLeft />
          </button>{" "}
          <h4 className="m-0 graduate-font neon-effect">{getCalendar()}</h4>
          <button
            className="btn neon-effect"
            onClick={() => {
              setPage(page + 1 < 5 ? page + 1 : 5);
            }}
          >
            <AiFillCaretRight />
          </button>
        </div>
        <div className="container-fluid main-col-color p-0">
          <div className="table">
            {Object.keys(games[page]).map((competition, index) => {
              if (games[page][competition].length === 0) {
                return <React.Fragment key={index}></React.Fragment>;
              } else {
                return (
                  <React.Fragment key={index}>
                    <div
                      style={{ background: "rgba(202, 228, 225, 0.1)" }}
                      key={index}
                    >
                      <p className="p-1 px-3 h6 neon-effect2">{competition}</p>
                    </div>
                    <div>
                      {games[page][competition].map((match) => {
                        const {
                          status,
                          utcDate,
                          id,
                          score,
                          homeTeam: { name: home },
                          awayTeam: { name: away },
                        } = match;
                        const {
                          halfTime: {
                            awayTeam: scoreAwayHalf,
                            homeTeam: scoreHomeHalf,
                          },
                          fullTime: {
                            awayTeam: scoreAwayFull,
                            homeTeam: scoreHomeFull,
                          },
                        } = score;
                        const offset =
                          new Date().getTimezoneOffset() * 60 * 1000;
                        const offsetDif = new Date(utcDate).getTime() - offset;
                        const timeAdjusted = new Date(offsetDif).toISOString();

                        let matchHour = timeAdjusted
                          .split("T")[1]
                          .split("Z")[0]
                          .split(":");
                        matchHour = `${matchHour[0]}:${matchHour[1]}`;
                        return (
                          <Link
                            to={`/match/${id}`}
                            key={id}
                            className="d-block text-reset text-decoration-none"
                          >
                            <article className="border-bottom border-light">
                              <div className="row p-0 ps-md-1 ps-md-2 container-fluid m-0">
                                <div
                                  className={`${
                                    status === "FINISHED"
                                      ? "grey-font col-3 col-md-2 my-auto p-0 me-2"
                                      : status === "IN_PLAY" ||
                                        status === "PAUSED"
                                      ? "neon-effect4 col-3 col-md-2 my-auto p-0 me-2"
                                      : "grey-font col-3 col-md-2 my-auto p-0 me-2"
                                  }`}
                                >
                                  {status === "FINISHED"
                                    ? "Finished"
                                    : status === "IN_PLAY"
                                    ? scoreAwayHalf === null &&
                                      scoreHomeHalf === null
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
                                          ? "col-1 col-md-2 neon-effect4 text-end score-font"
                                          : "col-1 col-md-2 neon-effect3 text-end score-font"
                                      }`}
                                    >
                                      {scoreHomeFull}
                                    </div>
                                  </div>
                                  <div
                                    className="h5 m-0 container px-1 text-center d-none d-md-flex justify-content-center align-items-center"
                                    style={{ width: "50px", color: "#c6e2ff" }}
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
                                          ? "col-1 col-md-2 neon-effect4 score-font"
                                          : "col-1 col-md-2 neon-effect3 score-font"
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
                      })}
                    </div>
                  </React.Fragment>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Games;
