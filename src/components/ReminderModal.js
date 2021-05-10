import React, { useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ReminderModal = ({ setModalOpen, match }) => {
  const {
    awayTeam: { name: awayName },
    homeTeam: { name: homeName },
    utcDate,
  } = match;

  const [message, setMessage] = React.useState(null);
  const userEmailRef = useRef("cauegmoyano@gmail.com");
  const minutesRef = useRef("0");
  const rawDate = new Date(utcDate);

  const date = rawDate.toDateString();
  const hour = rawDate.toTimeString().slice(0, 5);

  const handleSubmit = (e) => {
    e.preventDefault();
    let minutesBefore = "";
    if (minutesRef.current.value === "At the kickoff") {
      minutesBefore = "0";
    } else {
      minutesBefore = minutesRef.current.value;
    }
    let hourToRemind = "";
    if (minutesBefore === "0") hourToRemind = utcDate.split("T")[1];
    const hourAndMinutes = utcDate.split("T")[1].slice(0, 5);
    const minutes = hourAndMinutes.slice(3);
    const hours = hourAndMinutes.slice(0, 2);
    console.log(minutesBefore);
    if (minutesBefore === "15") {
      if (parseInt(minutes) === 0) {
        hourToRemind = `${parseInt(hours) - 1}:45:00Z`;
      } else {
        hourToRemind = `${hours}:${parseInt(minutes) - 15 || "00"}:00Z`;
      }
    }
    if (minutesBefore === "30") {
      if (parseInt(minutes) === 0) {
        hourToRemind = `${parseInt(hours) - 1}:30:00Z`;
      } else {
        if (parseInt(minutes) === 15) {
          hourToRemind = `${parseInt(hours) - 1}:45:00Z`;
        } else {
          hourToRemind = `${hours}:${parseInt(minutes) - 30 || "00"}:00Z`;
        }
      }
    }
    const API_URL = `${process.env.REACT_APP_API_GATEWAY}`;
    const body = {
      date: `${utcDate.split("T")[0]}`,
      hour: `${hourToRemind}`,
      userEmail: `${userEmailRef.current.value}`,
      match: `${homeName} vs ${awayName}`,
      dateString: `${date}`,
      emailBody: `Hey there, the match ${homeName} vs ${awayName} is going to start in ${minutesBefore} minutes.`,
    };

    const params = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const sendRequest = async () => {
      try {
        const response = await fetch(API_URL, params);
        console.log(response);
        setMessage("success");
      } catch (err) {
        console.log(err);
        setMessage("fail");
      }
    };
    setTimeout(() => {
      setModalOpen(false);
    }, 2500);
    console.log(params);
    return sendRequest();
  };
  return (
    <div className="reminder-modal" id="reminder-modal">
      <span className="close-modal">
        <AiOutlineCloseCircle onClick={() => setModalOpen(false)} />
      </span>
      <h4>Remind me of this game!</h4>
      <p>
        {homeName} vs {awayName}
      </p>
      <p>
        {date} at {hour}
      </p>

      <form onSubmit={(e) => handleSubmit(e)}>
        <p>When do you want to be remembered?</p>
        <select
          className="form-select bg-dark text-light mb-3"
          aria-label="Default select example"
          ref={minutesRef}
        >
          <option defaultValue="0">At the kickoff</option>
          <option value="15">15 minutes before the kickoff</option>
          <option value="30">30 minutes before the kickoff</option>
        </select>
        <input
          type="email"
          className="form-control bg-dark text-light mb-3"
          placeholder="Email to remind"
          aria-label="Email to remind"
          aria-describedby="basic-addon2"
          ref={userEmailRef}
        />
        <input
          type="submit"
          className="form-control text-light"
          value="Remind me!"
          style={{ background: "#6600FF" }}
        />
      </form>
      {message === "success" && (
        <div class="alert alert-primary p-1 mt-2" role="alert">
          Success! Your reminder has been created.
        </div>
      )}
      {message === "fail" && (
        <div class="alert alert-danger mt-2" role="alert">
          Sorry! An error occured. Try again later.
        </div>
      )}
    </div>
  );
};

export default ReminderModal;
