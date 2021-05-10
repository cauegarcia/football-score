import React from "react";
import loadingLogo from "../assets/loading.gif";
import IndividualTeam from "./IndividualTeam";
import { BiRightArrow } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Teams = ({
  loading,
  teams,
  handleTeams,
  displayAllTeams,
  teamsRef,
  showTeams,
}) => {
  if (loading) {
    return (
      <div className="col-xl-3 d-none p-0 m-1 mx-2 mx-md-2 main-col-color d-xl-flex justify-content-center">
        <img
          style={{ width: "50px", height: "50px" }}
          src={loadingLogo}
          alt="loadingLogo"
          className="mt-5"
        />
      </div>
    );
  } else {
    const mapTeams = () => {
      return teams.map((team) => {
        return (
          <IndividualTeam key={team.id} team={team} showTeams={showTeams} />
        );
      });
    };
    return (
      <div
        className="p-0 m-1 mx-2 mx-md-2 hidden"
        style={{ right: "-200%" }}
        ref={teamsRef}
      >
        <article className="container p-0 m-0 main-col-color">
          <div className="py-2" style={{ background: "#6600FF" }}>
            <h4 className="text-center py-2 m-0 graduate-font text-light">
              Teams
            </h4>
          </div>
          <div
            className="p-3 "
            style={{ background: "rgba(202, 228, 225, 0.1)" }}
          >
            <h6 className="m-0 text-light ">Main Teams</h6>
          </div>
          <article>{teams ? mapTeams() : "No teams to display"}</article>
          {window.innerWidth < 768 ? (
            ""
          ) : (
            <button
              className="btn container text-light m-0 mt-2 py-2 bg-red-detail"
              onClick={() => {
                handleTeams(!displayAllTeams);
              }}
            >
              <h5 className="m-0">
                {displayAllTeams ? "Less Teams" : "More teams"}
              </h5>{" "}
            </button>
          )}
        </article>
        <div className="team-close-toggler" onClick={() => showTeams()}>
          {window.innerWidth < 768 ? (
            <AiOutlineCloseCircle
              className="closer-icon"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "36px",
              }}
            />
          ) : (
            <BiRightArrow
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "36px",
              }}
            />
          )}
        </div>
      </div>
    );
  }
};

export default Teams;
