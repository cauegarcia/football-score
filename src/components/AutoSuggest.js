import React, { useState, useEffect } from "react";
import { teams } from "../teamsData";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const escapeRegexCharacters = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
const getSuggestions = (value) => {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp(escapedValue, "i");

  return teams.filter((language) => regex.test(language.name));
};

const AutoSuggest = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const onSuggestionsFetchRequested = (value) => {
    setSuggestions(getSuggestions(value));
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const selectTeam = (e) => {
    setValue(e.target.innerText);
    onSuggestionsClearRequested();
  };
  const checkValue = () => {
    return teams.some((team) => team.name === value);
  };
  useEffect(() => {
    if (value.length === 0) return onSuggestionsClearRequested();
    if (value.trim().length > 0) {
      onSuggestionsFetchRequested(value);
    }
  }, [value]);
  return (
    <div className="searchWrapper">
      <input
        type="text"
        className="inputTeam"
        value={value}
        placeholder="Search a team"
        onChange={(e) => handleChange(e)}
      />
      {suggestions.length === 0 ? (
        ""
      ) : suggestions[0].name === value ? (
        ""
      ) : (
        <div className="teamSelectorWrapper">
          {suggestions.map((team) => {
            return (
              <div
                className="teamSelect"
                key={team.id}
                onClick={(e) => selectTeam(e)}
              >
                {team.name}
              </div>
            );
          })}
        </div>
      )}
      {value.length === 0 ? (
        ""
      ) : (
        <div className="clearButton" onClick={() => setValue("")}>
          <AiOutlineCloseCircle />
        </div>
      )}
      <div className="searchButton">
        <Link
          to={
            suggestions.length === 0
              ? ""
              : checkValue()
              ? `/team/${suggestions[0].id}`
              : ""
          }
        >
          <AiOutlineSearch
            style={{ padding: "5px", color: "white", fontSize: "3rem" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default AutoSuggest;
