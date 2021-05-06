import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import loadingLogo from "../assets/loading.gif";

const SingleTeam = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(true);
  const getTeam = async () => {
    try {
      const response = await fetch(
        `https://api.football-data.org/v2/teams/${id}`,
        {
          headers: { "X-Auth-Token": "7f152a313b784b0eac60f4d7d6f81e57" },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data) {
        setTeam(data);
      } else {
        setTeam(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getMatches = async () => {
    try {
      const response = await fetch(
        `https://api.football-data.org/v2/teams/${id}/matches/`,
        {
          headers: { "X-Auth-Token": "7f152a313b784b0eac60f4d7d6f81e57" },
        }
      );
      const data = await response.json();
      const { matches } = data;
      if (data) {
        setLoading(false, setMatches(matches));
      } else {
        setMatches(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setLoading(true);
    getTeam();
    getMatches();
  }, [id]);
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
    const {
      area: { name: country },
      crestUrl: teamLogo,
      website,
      venue,
      founded,
      squad,
      name,
    } = team;
    const coach = squad.filter((member) => {
      return member.role === "COACH";
    });
    const fixtures = {
      today: [],
      nextGames: [],
      lastGames: [],
    };
    const nextMatches = [];
    matches.forEach((match, index) => {
      if (match.status === "SCHEDULED") {
        nextMatches.push(index);
      }
    });
    const today = new Date().toISOString().split("T")[0];
    matches.forEach((match, index) => {
      const { utcDate } = match;
      const matchDate = utcDate.split("T")[0];
      if (today === matchDate) {
        fixtures.today.push(match);
      } else {
        switch (index) {
          case nextMatches[0]:
            fixtures.nextGames.push(match);
            break;
          case nextMatches[1]:
            fixtures.nextGames.push(match);
            break;
          case nextMatches[2]:
            fixtures.nextGames.push(match);
            break;
          case nextMatches[0] - 1:
            fixtures.lastGames.push(match);
            break;
          case nextMatches[0] - 2:
            fixtures.lastGames.push(match);
            break;
          case nextMatches[0] - 3:
            fixtures.lastGames.push(match);
            break;
          default:
            return;
        }
      }
    });
    const positionParams = {
      Goalkeeper: 1,
      Defender: 2,
      Midfielder: 3,
      Attacker: 4,
    };
    let playersSquad = squad.filter((player) => {
      return player.position;
    });
    playersSquad.sort((a, b) => {
      return positionParams[a.position] - positionParams[b.position];
    });
    return (
      <div className="col-md-8 col-xl-6 p-0 m-1 main-col-color">
        <div className="container-fluid">
          <Link
            to="/"
            className="h4 py-3 d-block text-decoration-none text-light"
          >
            Back to Home
          </Link>
        </div>
        <div className="row p-0 d-flex flex-column align-items-center flex-md-row justify-content-center py-2 py-md-5">
          <img
            src={teamLogo}
            alt={name}
            style={{ width: "170px" }}
            className="my-2 my-md-0"
          />
          <div className="col col-md-5 d-flex flex-column justify-content-center align-items-center align-items-md-start">
            <h3 className="text-light graduate-font text-center text-md-start">
              {name}
            </h3>
            <h5 className="text-light">{country}</h5>
            <h6 className="grey-font">
              Foundation: <span>{founded}</span>
            </h6>
            <h6 className="grey-font">
              Stadium: <span>{venue}</span>
            </h6>
            <h6 className="grey-font">
              Website:{" "}
              <a
                href={website}
                target="_blank"
                className="text-decoration-none lblue-font"
                rel="noreferrer noopener"
              >
                {website}
              </a>
            </h6>
            <h6 className="grey-font">
              Coach: <span>{coach.length > 0 ? coach[0].name : ""}</span>
            </h6>
          </div>
        </div>
        <div className="container-fluid">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="matches-tab"
                data-bs-toggle="tab"
                data-bs-target="#matches"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                style={{
                  color: "#929eacf3",
                }}
              >
                Matches
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="squad-tab"
                data-bs-toggle="tab"
                data-bs-target="#squad"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                style={{
                  color: "#929eacf3",
                }}
              >
                Squad
              </button>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane active"
              id="matches"
              role="tabpanel"
              aria-labelledby="matches-tab"
            >
              {Object.keys(fixtures).map((round, index) => {
                if (fixtures[round].length > 0) {
                  return (
                    <div className="container-fluid p-0" key={index}>
                      <h5
                        className="text-center grey-font m-0 mt-2"
                        style={{
                          background: "background: rgba(202, 228, 225, 0.1)",
                        }}
                      >
                        {round === "today"
                          ? "Today's matches"
                          : round === "nextGames"
                          ? "Next Games"
                          : "Last Games"}
                      </h5>
                      {fixtures[round].map((match) => {
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
                                      : status === "IN_PLAY" ||
                                        status === "PAUSED"
                                      ? "neon-effect4 col-3 col-md-2 my-auto p-0 me-2"
                                      : "grey-font col-3 col-md-2 my-auto p-0 me-2"
                                  }`}
                                >
                                  <h6 className="m-0 grey-font">{matchDate}</h6>
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
                                    style={{
                                      width: "50px",
                                      color: "#c6e2ff",
                                    }}
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
                }
              })}
            </div>
            <div
              className="tab-pane table-responsive"
              id="squad"
              role="tabpanel"
              aria-labelledby="squad-tab"
            >
              <table className="table text-light mt-3">
                <thead>
                  <tr>
                    <th className="scope">Position</th>
                    <th className="scope">Name</th>
                    <th className="scope">Country</th>
                    <th className="scope">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {playersSquad.map((player) => {
                    const {
                      name,
                      nationality,
                      dateOfBirth,
                      position,
                      id,
                    } = player;
                    const today = new Date();
                    const birth = new Date(dateOfBirth);
                    const difference =
                      (today.getTime() - birth.getTime()) / 1000 / 86400 / 365;

                    return (
                      <tr key={id}>
                        <td className="px-0 grey-font">{position}</td>
                        <td>{name}</td>
                        <td className="lblue-font">{nationality}</td>
                        <td className="grey-font">{Math.floor(difference)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleTeam;
