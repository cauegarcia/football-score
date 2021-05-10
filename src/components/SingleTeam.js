import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import loadingLogo from "../assets/loading.gif";
import IndividualGame from "./IndividualGame";
import IndividualPlayer from "./IndividualPlayer";

const SingleTeam = ({ modalOpen, setModalOpen, setModalDetails }) => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(true);
  const getTeam = async () => {
    try {
      const response = await fetch(
        `https://api.football-data.org/v2/teams/${id}`,
        {
          headers: {
            "X-Auth-Token": `${process.env.REACT_APP_FOOTBALL_API_KEY}`,
          },
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
          headers: {
            "X-Auth-Token": `${process.env.REACT_APP_FOOTBALL_API_KEY}`,
          },
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
            className="h4 py-3 d-block text-decoration-none text-hover-effect"
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
            <h5 className="blue-font">{country}</h5>
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
                className="nav-link active bg-red-detail"
                id="matches-tab"
                data-bs-toggle="tab"
                data-bs-target="#matches"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                style={{
                  color: "#D17C6E",
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
                  color: "#D17C6E",
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
                        let matchDate = match.utcDate.split("T")[0].split("-");
                        matchDate = matchDate[2] + "/" + matchDate[1];
                        return (
                          <IndividualGame
                            key={match.id}
                            match={match}
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            setModalDetails={setModalDetails}
                          >
                            {<h6 className="m-0 grey-font">{matchDate}</h6>}
                          </IndividualGame>
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
                    return <IndividualPlayer key={player.id} player={player} />;
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
