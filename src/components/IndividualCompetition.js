import React from "react";
import IndividualGame from "./IndividualGame";

const IndividualCompetition = ({
  competition,
  page,
  games,
  modalOpen,
  setModalOpen,
  setModalDetails,
}) => {
  return (
    <>
      <div
        className="m-0"
        style={{
          background: "rgba(202, 228, 225, 0.1)",
          borderBottom: "1px solid #6600FF",
        }}
      >
        <p
          className="p-3 py-2 h6 text-light m-0"
          style={{
            letterSpacing: "1px",
          }}
        >
          {competition}
        </p>
      </div>
      <div>
        {games[page][competition].map((match) => {
          return (
            <IndividualGame
              key={match.id}
              match={match}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              setModalDetails={setModalDetails}
            />
          );
        })}
      </div>
    </>
  );
};

export default IndividualCompetition;
