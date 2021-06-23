import React, { useEffect, useState } from "react";
import IndividualGame from "./IndividualGame";
import { Link } from "react-router-dom";

const CompetitionMatches = ({ competitionId }) => {
  const [rounds, setRounds] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getRounds = async () => {
      try {
        const response = await fetch(
          `https://api.football-data.org/v2/competitions/${competitionId}/matches`,
          {
            headers: {
              "X-Auth-Token": `${process.env.REACT_APP_FOOTBALL_API_KEY}`,
            },
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
    getRounds();
  }, [competitionId]);
  if (loading) {
    return <div>Loading</div>;
  }
  if (rounds.count === 0) {
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
  if (competitionId === "2001") {
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
          return allRounds[round].length > 0 ? (
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
                let matchDate = match.utcDate.split("T")[0].split("-");
                matchDate = matchDate[2] + "/" + matchDate[1];
                return (
                  <IndividualGame key={match.id} match={match}>
                    {<h6 className="m-0 grey-font">{matchDate}</h6>}
                  </IndividualGame>
                );
              })}
            </div>
          ) : (
            ""
          );
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
          return allRounds[round].length > 0 ? (
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
                let matchDate = match.utcDate.split("T")[0].split("-");
                matchDate = matchDate[2] + "/" + matchDate[1];
                return (
                  <IndividualGame key={match.id} match={match}>
                    {<h6 className="m-0 grey-font">{matchDate}</h6>}
                  </IndividualGame>
                );
              })}
            </div>
          ) : (
            ""
          );
        })}
      </div>
    );
  }
};

export default CompetitionMatches;
