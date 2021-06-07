import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Teams from "../components/Teams";
import Competitions from "../components/Competitions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Games from "../components/Games";
import Match from "../components/Match";
import SingleCompetition from "../components/SingleCompetition";
import SingleTeam from "../components/SingleTeam";
import ReminderModal from "../components/ReminderModal";
import { competitions } from "../competitions";
import { AiFillTrophy } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import ButtonSections from "../components/ButtonSections";

const Home = () => {
  const [games, setGames] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState(null);
  const [displayAllTeams, setdisplayAllTeams] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetail, setModalDetails] = useState(null);

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
          headers: {
            "X-Auth-Token": `${process.env.REACT_APP_FOOTBALL_API_KEY}`,
          },
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
        const coveredCompetitions = competitions.map(
          (competition) => competition.name
        );
        const today = new Date(new Date().toISOString().split("T")[0]);
        matches.forEach((match) => {
          if (!coveredCompetitions.includes(match.competition.name)) return;
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
        headers: {
          "X-Auth-Token": `${process.env.REACT_APP_FOOTBALL_API_KEY}`,
        },
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
  const competitionRef = React.useRef();
  const teamsRef = React.useRef();
  const competitionTriggerRef = React.useRef();
  const teamTriggerRef = React.useRef();
  const showCompetitions = () => {
    competitionRef.current.classList.toggle("show-left");
    competitionTriggerRef.current.classList.toggle("display-trigger");
    if (window.innerWidth < 1200)
      teamTriggerRef.current.classList.toggle("display-trigger");
  };
  const showTeams = () => {
    teamsRef.current.classList.toggle("show-right");
    if (window.innerWidth < 1200)
      competitionTriggerRef.current.classList.toggle("display-trigger");
    teamTriggerRef.current.classList.toggle("display-trigger");
  };

  return (
    <main>
      <div className="bg-fixed"></div>
      <Router>
        <Navbar />
        <div
          className="row container-xxl mx-auto d-flex justify-content-center p-1"
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "55vh",
          }}
        >
          <ButtonSections
            triggerRef={competitionTriggerRef}
            showDiv={showCompetitions}
            show={"show-comp"}
          >
            <p className="d-none d-md-block">COMPETITIONS</p>
            <AiFillTrophy className="trophy" />
          </ButtonSections>
          <Competitions
            competitionRef={competitionRef}
            showCompetitions={showCompetitions}
          />
          <Route
            exact
            path="/"
            render={() => (
              <Games
                games={games}
                page={page}
                loading={loading}
                setPage={setPage}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                setModalDetails={setModalDetails}
              />
            )}
          />
          <Route exact path="/match/:id" render={() => <Match />} />
          <Route
            exact
            path="/competition/:id"
            render={() => <SingleCompetition />}
          />
          <Route
            exact
            path="/team/:id"
            render={() => (
              <SingleTeam
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                setModalDetails={setModalDetails}
              />
            )}
          />
          <ButtonSections
            triggerRef={teamTriggerRef}
            show={"show-teams"}
            showDiv={showTeams}
          >
            <p className="d-none d-md-block">TEAMS</p>
            <RiTeamFill className="trophy" />
          </ButtonSections>
          <Teams
            teams={teamsToDisplay}
            loading={loading}
            handleTeams={setdisplayAllTeams}
            displayAllTeams={displayAllTeams}
            teamsRef={teamsRef}
            showTeams={showTeams}
          />
        </div>
      </Router>
      {modalOpen && (
        <ReminderModal setModalOpen={setModalOpen} match={modalDetail} />
      )}
    </main>
  );
};

export default Home;
