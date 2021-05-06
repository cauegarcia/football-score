import React from "react";
import { useParams } from "react-router-dom";
import Standings from "./Standings";
import CompetitionMatches from "./CompetitionMatches";

const SingleCompetition = () => {
  const { id } = useParams();
  return (
    <div className="col-md-8 col-xl-6 p-0 m-1 main-col-color">
      <Standings competitionId={id} />
      <CompetitionMatches competitionId={id} />
    </div>
  );
};

export default SingleCompetition;
