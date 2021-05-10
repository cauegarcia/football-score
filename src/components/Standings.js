import React, { useEffect, useState } from "react";
import DisplayStandingsTable from "../components/DisplayStandingsTable";
import loadingLogo from "../assets/loading.gif";
import { Link } from "react-router-dom";

const Standings = ({ competitionId }) => {
  const [standing, setStanding] = useState(null);
  const [loading, setLoading] = useState(true);
  const getStanding = async () => {
    try {
      const response = await fetch(
        `https://api.football-data.org/v2/competitions/${competitionId}/standings`,
        {
          headers: {
            "X-Auth-Token": `${process.env.REACT_APP_FOOTBALL_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (data) {
        setLoading(false, setStanding(data));
      } else {
        setStanding(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setLoading(true);
    getStanding();
  }, [competitionId]);
  useEffect(() => {
    const toggleLoader = () => {
      if (loading) {
        setLoading(false);
      }
    };
    let timer = setTimeout(() => {
      toggleLoader();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  if (loading) {
    return (
      <div className="container-fluid d-flex justify-content-center">
        <img
          style={{ width: "50px", height: "50px" }}
          src={loadingLogo}
          alt="loadingLogo"
          className="mt-5"
        />
      </div>
    );
  } else {
    if (standing.error === 404) {
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
    } else {
      const {
        standings: {
          0: { table },
        },
        competition: { code, name: competitionName },
      } = standing;
      if (code === "CL") {
        const { standings } = standing;
        return (
          <div className="container table-responsive">
            <h4
              className="text-center blue-font my-5"
              style={{ background: "background: rgba(202, 228, 225, 0.1)" }}
            >
              {competitionName}
            </h4>
            {standings.map((item, index) => {
              const { group, type, table } = item;
              if (type !== "TOTAL") {
                return;
              } else {
                return (
                  <React.Fragment key={index}>
                    <h5
                      className="text-center grey-font m-0"
                      style={{
                        background: "background: rgba(202, 228, 225, 0.1)",
                      }}
                    >
                      {`Group ${group.charAt(6)}`}
                    </h5>
                    <DisplayStandingsTable table={table} />
                  </React.Fragment>
                );
              }
            })}
          </div>
        );
      } else {
        return (
          <div className="container table-responsive">
            <h4
              className="text-center blue-font mt-2 mt-md-5"
              style={{ background: "background: rgba(202, 228, 225, 0.1)" }}
            >
              {competitionName}
            </h4>
            <DisplayStandingsTable table={table} />
          </div>
        );
      }
    }
  }
};

export default Standings;
