import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import loadingLogo from "../assets/loading.gif";
import IndividualCompetition from "./IndividualCompetition";

const Games = ({
  games,
  loading,
  page,
  setPage,
  modalOpen,
  setModalOpen,
  setModalDetails,
}) => {
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

    const gamesScheduled = Object.keys(games).reduce((total, key) => {
      Object.values(games[key]).forEach((league) => {
        total += league.length;
      });
      return total;
    }, 0);

    return (
      <div
        className="main-div p-0  m-1 me-md-2 m-xl-1"
        style={{ transition: "all 0.7s linear" }}
      >
        <div className="container-fluid blue-bg d-flex justify-content-center align-items-center p-2">
          <button
            className="btn text-light py-0"
            onClick={() => {
              setPage(page - 1 > -4 ? page - 1 : -4);
            }}
          >
            {page === -4 ? "" : <BiLeftArrow />}
          </button>{" "}
          <h4 className="m-0 graduate-font text-light py-2">{getCalendar()}</h4>
          <button
            className="btn text-light py-0"
            onClick={() => {
              setPage(page + 1 < 5 ? page + 1 : 5);
            }}
          >
            {page === 5 ? "" : <BiRightArrow />}
          </button>
        </div>
        <div className="container-fluid main-col-color p-0">
          <div className="container p-0">
            {gamesScheduled === 0 && (
              <div className="container p-0 text-light fs-3 text-center">
                No matches scheduled
              </div>
            )}
            {Object.keys(games[page]).map((competition, index) => {
              if (games[page][competition].length === 0) {
                return <React.Fragment key={index}></React.Fragment>;
              } else {
                return (
                  <IndividualCompetition
                    key={index}
                    competition={competition}
                    games={games}
                    page={page}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    setModalDetails={setModalDetails}
                  ></IndividualCompetition>
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
