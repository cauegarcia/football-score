import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CompetitionMatches = ({ competitionId }) => {
  const [rounds, setRounds] = useState(null);
  const [loading, setLoading] = useState(true);
  const getRounds = async () => {
    try {
      const response = await fetch(
        `https://api.football-data.org/v2/competitions/${competitionId}/matches`,
        {
          headers: { "X-Auth-Token": "7f152a313b784b0eac60f4d7d6f81e57" },
        }
      );
      const data = await response.json();
      if (data) {
        setLoading(false, setRounds(data));
      } else {
        setRounds(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setLoading(true);
    getRounds();
  }, [competitionId]);
  if (loading) {
    return <div>Loading</div>;
  } else if (competitionId === "2001") {
    const { matches } = rounds;
    const allRounds = {
      today: [],
      final: [],
      semiFinals: [],
      quarterFinals: [],
      eigthFinals: [],
    };
    const today = new Date().toISOString().split("T")[0];
    matches.forEach((match) => {
      const { utcDate, stage } = match;
      const matchDate = utcDate.split("T")[0];
      if (today === matchDate) {
        allRounds.today.push(match);
      } else {
        switch (stage) {
          case "ROUND_OF_16":
            allRounds.eigthFinals.push(match);
            break;
          case "QUARTER_FINALS":
            allRounds.quarterFinals.push(match);
            break;
          case "SEMI_FINALS":
            allRounds.semiFinals.push(match);
            break;
          case "FINALS":
            allRounds.final.push(match);
            break;
          default:
            return;
        }
      }
    });
    return (
      <div className="container-fluid p-0">
        <h4
          className="text-center lblue-font my-2"
          style={{ background: "background: rgba(202, 228, 225, 0.1)" }}
        >
          Fixtures
        </h4>
        {Object.keys(allRounds).map((round, index) => {
          if (allRounds[round].length > 0) {
            return (
              <div className="container-fluid p-0" key={index}>
                <h5
                  className="text-center grey-font m-0 mt-5"
                  style={{
                    background: "background: rgba(202, 228, 225, 0.1)",
                  }}
                >
                  {round === "today"
                    ? `Today's Matches`
                    : round === "final"
                    ? "Final"
                    : round === "semiFinals"
                    ? "Semi-finals"
                    : round === "quarterFinals"
                    ? "Quarter-finals"
                    : "Round of 16"}
                </h5>
                {allRounds[round].map((match) => {
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
                  let matchHour = utcDate
                    .split("T")[1]
                    .split("Z")[0]
                    .split(":");
                  matchHour = `${matchHour[0]}:${matchHour[1]}`;
                  let matchDate = utcDate.split("T")[0].split("-");
                  matchDate = matchDate[2] + "/" + matchDate[1];
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
                                : status === "IN_PLAY" || status === "PAUSED"
                                ? "neon-effect4 col-3 col-md-2 my-auto p-0 me-2"
                                : "grey-font col-3 col-md-2 my-auto p-0 me-2"
                            }`}
                          >
                            <h6 className="m-0 grey-font">{matchDate}</h6>
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
                              <div className="col-10 col-md p-0 px-md-1 graduate-font text-light text-md-end">
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
                              <div className="col-10 col-md p-0 px-md-1 graduate-font text-light pe-md-2 text-md-start">
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
            );
          } else {
            return;
          }
        })}
      </div>
    );
  } else {
    const { matches } = rounds;
    const {
      season: { currentMatchday: currentRound },
    } = matches[0];
    const allRounds = {
      0: [],
      "-1": [],
      1: [],
      2: [],
    };
    const today = new Date().toISOString().split("T")[0];

    matches.forEach((match) => {
      const {
        utcDate,
        matchday,
        season: { currentMatchday },
      } = match;
      const matchDate = utcDate.split("T")[0];
      if (today === matchDate) {
        allRounds["0"].push(match);
      } else {
        switch (currentMatchday) {
          case matchday:
            allRounds["1"].push(match);
            break;
          case matchday + 1:
            allRounds["-1"].push(match);
            break;
          case matchday - 1:
            allRounds["2"].push(match);
            break;
          default:
            return;
        }
      }
    });
    return (
      <div className="container-fluid p-0">
        <h4
          className="text-center lblue-font my-2"
          style={{ background: "background: rgba(202, 228, 225, 0.1)" }}
        >
          Fixtures
        </h4>
        {Object.keys(allRounds).map((round, index) => {
          if (allRounds[round].length > 0) {
            return (
              <div className="container-fluid p-0" key={index}>
                <h5
                  className="text-center grey-font m-0 mt-5"
                  style={{
                    background: "background: rgba(202, 228, 225, 0.1)",
                  }}
                >
                  {round === "0"
                    ? "Today's matches"
                    : round === "1"
                    ? "Current Round (Round " + currentRound + ")"
                    : round === "2"
                    ? "Next Round (Round " + (currentRound + 1) + ")"
                    : "Last Round (Round " + (currentRound - 1) + ")"}
                </h5>
                {allRounds[round].map((match) => {
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
                  const offset = new Date().getTimezoneOffset() * 60 * 1000;
                  const offsetDif = new Date(utcDate).getTime() - offset;
                  const timeAdjusted = new Date(offsetDif).toISOString();
                  let matchHour = timeAdjusted
                    .split("T")[1]
                    .split("Z")[0]
                    .split(":");
                  matchHour = `${matchHour[0]}:${matchHour[1]}`;
                  let matchDate = utcDate.split("T")[0].split("-");
                  matchDate = matchDate[2] + "/" + matchDate[1];
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
                                : status === "IN_PLAY" || status === "PAUSED"
                                ? "neon-effect4 col-3 col-md-2 my-auto p-0 me-2"
                                : "grey-font col-3 col-md-2 my-auto p-0 me-2"
                            }`}
                          >
                            <h6 className="m-0 grey-font">{matchDate}</h6>
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
                              <div className="col-10 col-md p-0 px-md-1 graduate-font text-light text-md-end">
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
                              <div className="col-10 col-md p-0 px-md-1 graduate-font text-light pe-md-2 text-md-start">
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
            );
          } else {
            return;
          }
        })}
      </div>
    );
  }
};

export default CompetitionMatches;
