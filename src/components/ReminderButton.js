import React from "react";
import { BsFillBellFill } from "react-icons/bs";

const ReminderButton = ({
  match,
  modalOpen,
  setModalOpen,
  setModalDetails,
}) => {
  return (
    <div
      className="p-1 d-flex align-items-center justify-content-center"
      style={{ background: "#6600FF", cursor: "pointer" }}
      onClick={() => {
        setModalOpen(!modalOpen, setModalDetails(match));
      }}
    >
      <p className="d-none d-md-block m-0 text-light">Remind</p>

      <BsFillBellFill className="text-light fs-5 d-md-none" />
    </div>
  );
};

export default ReminderButton;
