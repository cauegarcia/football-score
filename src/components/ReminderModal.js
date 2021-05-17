import React, { useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
/* import AWS from "aws-sdk"; */
/* const sgMail = require("@sendgrid/mail"); */

const ReminderModal = ({ setModalOpen, match }) => {
  const {
    awayTeam: { name: awayName },
    homeTeam: { name: homeName },
    utcDate,
  } = match;

  /* const [message, setMessage] = React.useState(null); */
  const userEmailRef = useRef("cauegmoyano@gmail.com");
  const minutesRef = useRef("0");
  const rawDate = new Date(utcDate);

  const date = rawDate.toDateString();
  const hour = rawDate.toTimeString().slice(0, 5);

  const handleSubmit = (e) => {
    e.preventDefault();
    /*  let minutesBefore = ""; */
    /* if (minutesRef.current.value === "At the kickoff") { */
    /* minutesBefore = "0"; */
    /*  } else { */
    /*  minutesBefore = minutesRef.current.value; */
    /*  } */
    /* let hourToRemind = ""; */
    /* if (minutesBefore === "0") hourToRemind = utcDate.split("T")[1]; */
    /* const hourAndMinutes = utcDate.split("T")[1].slice(0, 5);
    const minutes = hourAndMinutes.slice(3);
    const hours = hourAndMinutes.slice(0, 2); */
    /*  if (minutesBefore === "15") {
      if (parseInt(minutes) === 0) { */
    /*   hourToRemind = `${parseInt(hours) - 1}:45:00Z`; */
    /*  } else { */
    /*   hourToRemind = `${hours}:${parseInt(minutes) - 15 || "00"}:00Z`; */
    /*     }
    } */
    /*  if (minutesBefore === "30") { */
    /*   if (parseInt(minutes) === 0) { */
    /*  hourToRemind = `${parseInt(hours) - 1}:30:00Z`; */
    /*  } else {
        if (parseInt(minutes) === 15) { */
    /* hourToRemind = `${parseInt(hours) - 1}:45:00Z`; */
    /*   } else { */
    /* hourToRemind = `${hours}:${parseInt(minutes) - 30 || "00"}:00Z`; */
    /*     }
      } */
    /*  } */
    /* const createId = (length) => {
      const result = [];
      const characters = "0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        );
      }
      return result.join("");
    }; */
    /*  AWS.config.update({
      region: "sa-east-1",
      endpoint: "https://dynamodb.sa-east-1.amazonaws.com",
      accessKeyId: "AKIAXOOTFKMWLTN5HRK6",
      secretAccessKey: "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",
    });
    const docClient = new AWS.DynamoDB.DocumentClient();
 */
    /* const createItem = () => {
      var params = {
        TableName: "Reminder",
        Item: {
          id: parseInt(createId(10)),
          email: `${userEmailRef.current.value}`,
          info: {
            date: `${utcDate.split("T")[0]}`,
            input: `${hourToRemind}`,
            userEmail: `${userEmailRef.current.value}`,
            match: `${homeName} vs ${awayName}`,
            dateString: `${date}`,
            emailBody: `Hey there, the match: ${homeName} vs ${awayName} is going to start in ${minutesBefore} minutes.`,
          },
        },
      };
      docClient.put(params, function (err, data) {
        if (err) {
          console.log(err);
          setMessage("fail");
        } else {
          console.log("success");
          setMessage("success");
        }
      });
    }; */
    /* const API_URL = `${process.env.REACT_APP_API_GATEWAY}`;
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
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Origin: "https://footballscore-reminder.netlify.app/",
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
    }; */
    /* sgMail.setApiKey(
      "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"
    ); */
    const sendEmail = async () => {
      /*  const msg = {
        to: "cauegmoyano@gmail.com", // user's email here
        from: "football-score@gmail.com", // your company's email here
        subject: `Match reminder `,
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      }; */
      /* sgMail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode);
          console.log(response[0].headers);
        })
        .catch((error) => {
          console.error(error);
        }); */
      /*  return {
        statusCode: 200,
        body: "OK",
      }; */
    };
    setTimeout(() => {
      setModalOpen(false);
    }, 2500);
    return sendEmail();
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
      {/* {message === "success" && (
        <div className="alert alert-primary p-1 mt-2" role="alert">
          Success! Your reminder has been created.
        </div>
      )} */}
      {/*  {message === "fail" && (
        <div className="alert alert-danger mt-2" role="alert">
          Sorry! An error occured. Try again later.
        </div>
      )} */}
    </div>
  );
};

export default ReminderModal;
