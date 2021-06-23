import React from "react";
import DisplayCompetitionsLinks from "../components/DisplayCompetitionsLinks";
import { BiLeftArrow } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Competitions = ({ competitionRef, showCompetitions }) => {
  return (
    <div
      className="p-0 m-1 mx-2 hidden"
      style={{ left: "-200%" }}
      ref={competitionRef}
    >
      <div className="table main-col-color" style={{ position: "relative" }}>
        <div
          className="py-2"
          style={{ background: "#6600FF", color: "#FFF", position: "relative" }}
        >
          <div className="text-center">
            <div
              className="competition-close-toggler"
              onClick={() => showCompetitions()}
            >
              {window.innerWidth < 768 ? (
                <AiOutlineCloseCircle
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
                <BiLeftArrow
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
            <h4 className="graduate-font teaxt-light m-0">Competitions</h4>
          </div>
        </div>
        <div className="pb-3">
          <DisplayCompetitionsLinks showCompetitions={showCompetitions} />
        </div>
      </div>
    </div>
  );
};

export default Competitions;
