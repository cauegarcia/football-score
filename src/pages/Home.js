import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Teams from "../components/Teams";
import Competitions from "../components/Competitions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Games from "../components/Games";
import Match from "../components/Match";
import SingleCompetition from "../components/SingleCompetition";
import SingleTeam from "../components/SingleTeam";
import { competitions } from "../competitions";

const Home = () => {
  const [games, setGames] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState(null);
  const [displayAllTeams, setdisplayAllTeams] = useState(false);

  const getGames = async () => {
    try {
      const today = new Date();
      const firstDif = today.getTime() - 4 * 86400 * 1000;
      const lastDif = today.getTime() + 5 * 86400 * 1000;
      const firstDay = new Date(firstDif).toISOString().split("T")[0];
      const lastDay = new Date(lastDif).toISOString().split("T")[0];

      const response = await fetch(
        `https://api.football-data.org/v2/matches?dateFrom=${firstDay}&dateTo=${lastDay}`,
        {
          headers: { "X-Auth-Token": "7f152a313b784b0eac60f4d7d6f81e57" },
        }
      );
      const games = await response.json();
      const { matches } = games;
      if (matches) {
        const arrangedMatches = {};
        for (let i = -4; i < 6; i++) {
          arrangedMatches[i] = {};
        }
        competitions.forEach((competition) => {
          for (let day in arrangedMatches) {
            arrangedMatches[day][competition.name] = [];
          }
        });
        const today = new Date(new Date().toISOString().split("T")[0]);
        matches.forEach((match) => {
          const dayOfMatch = new Date(match.utcDate.split("T")[0]);
          const difference =
            (dayOfMatch.getTime() - today.getTime()) / 1000 / 86400;
          if (difference >= -4 && difference <= 5) {
            arrangedMatches[difference][match.competition.name].push(match);
          }
        });
        setLoading(false, setGames(arrangedMatches));
      } else {
        setGames(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getTeams = async (url) => {
    try {
      const response = await fetch(url, {
        headers: { "X-Auth-Token": "7f152a313b784b0eac60f4d7d6f81e57" },
      });
      const clTeams = await response.json();
      const { teams } = clTeams;
      if (teams) {
        setTeams(teams);
      } else {
        setTeams(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getGames();
    getTeams("https://api.football-data.org/v2/competitions/CL/teams");
  }, []);
  let teamsToDisplay = [];
  if (teams) {
    if (displayAllTeams) {
      for (let i = 0; i < teams.length; i++) {
        teamsToDisplay.push(teams[i]);
      }
    } else {
      for (let i = 0; i < 18; i++) {
        teamsToDisplay.push(teams[i]);
      }
    }
  }

  return (
    <main>
      <Router>
        <Navbar />
        <div className="row container-xxl mx-auto d-flex justify-content-center p-1">
          <Competitions />
          <Route
            exact
            path="/"
            render={() => (
              <Games
                games={games}
                page={page}
                loading={loading}
                setPage={setPage}
              />
            )}
          />
          <Route exact path="/match/:id" render={() => <Match />} />
          <Route
            exact
            path="/competition/:id"
            render={() => <SingleCompetition />}
          />
          <Route exact path="/team/:id" render={() => <SingleTeam />} />
          <Teams
            teams={teamsToDisplay}
            loading={loading}
            handleTeams={setdisplayAllTeams}
            displayAllTeams={displayAllTeams}
          />
        </div>
      </Router>
    </main>
  );
};

export default Home;
