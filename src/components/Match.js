import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Standings from "../components/Standings";
import loadingLogo from "../assets/loading.gif";

const Match = () => {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clubHome, setClubHome] = useState(null);
  const [clubAway, setClubAway] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const getMatch = async () => {
      try {
        const response = await fetch(
          `https://api.football-data.org/v2/matches/${id}`,
          {
            headers: {
              "X-Auth-Token": `${process.env.REACT_APP_FOOTBALL_API_KEY}`,
            },
          }
        );
        const matchDetails = await response.json();
        if (matchDetails) {
          setMatch(matchDetails);
        } else {
          setMatch(null);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMatch();
  }, [id]);
  const getClub = async (teamId, team) => {
    try {
      const response = await fetch(
        `https://api.football-data.org/v2/teams/${teamId}`,
        {
          headers: {
            "X-Auth-Token": `${process.env.REACT_APP_FOOTBALL_API_KEY}`,
          },
        }
      );
      const matchDetails = await response.json();
      if (team === "home") {
        if (matchDetails) {
          setClubHome(matchDetails);
        } else {
          setClubHome(null);
        }
      } else {
        if (matchDetails) {
          setClubAway(matchDetails);
        } else {
          setClubAway(null);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (match) {
      const {
        match: {
          homeTeam: { id: teamId },
        },
      } = match;
      getClub(teamId, "home");
    }
  }, [match]);
  useEffect(() => {
    if (clubHome) {
      const {
        match: {
          awayTeam: { id: teamId },
        },
      } = match;
      getClub(teamId, "away");
    }
  }, [clubHome, match]);
  useEffect(() => {
    if (clubAway) {
      setLoading(false);
    }
  }, [clubAway]);
  const toggleLoader = useCallback(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading]);
  useEffect(() => {
    let timer = setTimeout(() => {
      toggleLoader();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [loading, toggleLoader]);
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
  } else if (match) {
    const {
      match: {
        competition: {
          id: competitionId,
          name: competitionName,
          area: { ensignUrl: competitionLogo },
        },
        matchday,
        utcDate,
        homeTeam: { name: homeNameAlt, id: teamHomeId },
        awayTeam: { name: awayNameAlt, id: teamAwayId },
        score: {
          fullTime: { homeTeam: fullHomeScore, awayTeam: fullAwayScore },
          halfTime: { homeTeam: halfHomeScore, awayTeam: halfAwayScore },
        },
        venue,
        referees: { 0: { name: referee = "" } = {} } = {},
        status,
      },
    } = match;

    const { crestUrl: homeUrl = "", shortName: homeShortName = "" } =
      clubHome || {};
    const { crestUrl: awayUrl = "", shortName: awayShortName = "" } =
      clubAway || {};
    const offset = new Date().getTimezoneOffset() * 60 * 1000;
    const offsetDif = new Date(utcDate).getTime() - offset;
    const timeAdjusted = new Date(offsetDif).toISOString();
    const date = timeAdjusted.split("T")[0];
    let time = timeAdjusted.split("T")[1].split("Z")[0].split(":");
    time = time[0] + ":" + time[1];
    return (
      <div className="col-md-8 col-xl-6 p-0 m-1 main-col-color">
        <div className="container-fluid">
          <Link
            to="/"
            className="h4 py-3 d-block text-decoration-none text-hover-effect"
          >
            Back to Home
          </Link>
        </div>
        <div className="mt-2 mb-3 container-fluid d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex mb-2 justify-content-center">
            <img
              className="img-fluid me-3"
              src={competitionLogo}
              alt={competitionName}
              style={{ width: "50px" }}
            />
            <Link
              to={`/competition/${competitionId}`}
              className="d-block text-decoration-none p-0"
            >
              <h3 className="text-light m-0">{competitionName}</h3>
            </Link>
          </div>
          <div className="blue-font mb-2">Round {matchday}</div>
          <div className="d-flex grey-font">
            <h5 className="m-0 me-5">{date}</h5>
            <h5 className="m-0">{time}</h5>
          </div>
        </div>
        <div className="row p-2">
          <div className="col d-none d-md-block">
            <img
              className="img-fluid"
              src={homeUrl || ""}
              alt={homeShortName || homeNameAlt}
            />
          </div>
          <div className="col col-md-7 d-flex flex-column p-0">
            <div className="d-flex flex-column flex-md-row row-md justify-content-between p-0 py-md-4 align-items-md-center">
              <div className="col p-md-0 d-flex justify-content-between justify-content-md-end align-items-center p-2">
                <img
                  className="img-fluid d-block d-md-none"
                  style={{ width: "70px" }}
                  src={homeUrl || ""}
                  alt={homeShortName || homeNameAlt}
                />
                <Link
                  to={`/team/${teamHomeId}`}
                  className="d-block text-decoration-none p-0"
                >
                  <h5 className="graduate-font text-light text-end">
                    {homeShortName || homeNameAlt}
                  </h5>
                </Link>

                <span className="fs-3 text-light h4 mx-2 d-md-none">
                  {halfHomeScore || fullHomeScore}
                </span>
              </div>
              <div className="col-3 justify-content-around p-0 d-none d-md-flex">
                <span className="fs-3 text-light h4 mx-2">
                  {halfHomeScore || fullHomeScore}
                </span>
                <h4 className="blue-font m-0">X</h4>
                <span className="fs-3  text-light h4 mx-2">
                  {halfAwayScore || fullAwayScore}
                </span>
              </div>
              <div className="col p-2 d-flex justify-content-between align-items-center p-md-0">
                <img
                  className="img-fluid d-block d-md-none"
                  style={{ width: "70px" }}
                  src={awayUrl || ""}
                  alt={awayShortName || awayNameAlt}
                />
                <Link
                  to={`/team/${teamAwayId}`}
                  className="d-block text-decoration-none p-0"
                >
                  <h5 className="graduate-font text-light text-start">
                    {awayShortName || awayNameAlt}
                  </h5>
                </Link>

                <span className="fs-3  text-light h4 mx-2 d-md-none">
                  {halfAwayScore || fullAwayScore}
                </span>
              </div>
            </div>
            <div className="text-center grey-font">
              {status !== "IN_PLAY" || "PAUSED"
                ? status
                : status === "PAUSED"
                ? "INTERVAL"
                : halfHomeScore
                ? "SECOND HALF"
                : "FIRST HALF"}
            </div>
          </div>
          <div className="col d-none d-md-block">
            <img
              className="img-fluid"
              src={awayUrl || ""}
              alt={awayShortName || awayNameAlt}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column flex-md-row mt-3 grey-font">
          <h6 className="me-md-5">
            Referee: <span>{referee}</span>
          </h6>
          <h6>
            Venue: <span>{venue}</span>
          </h6>
        </div>
        <Standings competitionId={competitionId} />
      </div>
    );
  } else {
    return (
      <div className="col-md-8 col-xl-6 p-0 m-1 main-col-color mx-auto">
        <div>
          <h4 className="my-5 text-light text-center">
            Sorry, an error ocurred.
          </h4>
        </div>
        <Link
          to="/"
          className="h4 py-3 d-block text-decoration-none text-light text-center border border-light"
        >
          Back to Home
        </Link>
      </div>
    );
  }
};

export default Match;
