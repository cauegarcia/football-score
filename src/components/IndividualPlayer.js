import React from "react";

const IndividualPlayer = ({ player }) => {
  const { name, nationality, dateOfBirth, position, id } = player;
  const today = new Date();
  const birth = new Date(dateOfBirth);
  const difference = (today.getTime() - birth.getTime()) / 1000 / 86400 / 365;

  return (
    <tr key={id}>
      <td className="px-0 grey-font">{position}</td>
      <td>{name}</td>
      <td className="blue-font">{nationality}</td>
      <td className="grey-font">{Math.floor(difference)}</td>
    </tr>
  );
};

export default IndividualPlayer;
