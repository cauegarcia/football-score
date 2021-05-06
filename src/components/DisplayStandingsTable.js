import React from "react";
import { Link } from "react-router-dom";

const DisplayStandingsTable = ({ table }) => {
  return (
    <>
      <table className="table text-light table-borderless table-hover table-responsive">
        <thead>
          <tr>
            <th className="scope">#</th>
            <th className="scope">Team</th>
            <th className="scope">MP</th>
            <th className="scope">W</th>
            <th className="scope">D</th>
            <th className="scope">L</th>
            <th className="scope">G</th>
            <th className="scope">Pts</th>
            <th className="scope">Form</th>
          </tr>
        </thead>
        <tbody>
          {table.map((item) => {
            const {
              position,
              team: { name: teamName, crestUrl, id },
              playedGames,
              won,
              draw,
              lost,
              goalsFor,
              goalsAgainst,
              points,
              form,
            } = item;
            return (
              <tr key={position}>
                <th scope="row">{position}</th>

                <td className="px-0">
                  <Link
                    to={`/team/${id}`}
                    style={{ minWidth: "150px" }}
                    className="text-decoration-none d-block px-0 text-light"
                  >
                    <img
                      style={{ height: "20px" }}
                      src={crestUrl}
                      alt={teamName}
                      className="img-fluid me-2"
                    />
                    {teamName.length > 20
                      ? `${teamName.slice(0, 20)}...`
                      : teamName}
                  </Link>
                </td>

                <td>{playedGames}</td>
                <td>{won}</td>
                <td>{draw}</td>
                <td>{lost}</td>
                <td>
                  {goalsFor}:{goalsAgainst}
                </td>
                <td>{points}</td>
                <td>{form}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DisplayStandingsTable;
