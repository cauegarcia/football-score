import React from "react";
import DisplayCompetitionsLinks from "../components/DisplayCompetitionsLinks";

const Competitions = () => {
  return (
    <div className="col-md d-none d-md-block p-0 m-1 mx-2">
      <div className="table main-col-color">
        <div
          style={{ background: "#5c5c5c", opacity: 1, color: "#FFF" }}
          className="pb-1"
        >
          <div className="text-center">
            <h4 className="graduate-font neon-effect">Competitions</h4>
          </div>
        </div>
        <div>
          <DisplayCompetitionsLinks />
        </div>
      </div>
    </div>
  );
};

export default Competitions;
