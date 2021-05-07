import React from "react";

const ButtonSections = ({ triggerRef, showDiv, children, show }) => {
  return (
    <div className={`${show} show`} ref={triggerRef}>
      <div className="inner-div" onClick={() => showDiv()}>
        {children}
      </div>
    </div>
  );
};

export default ButtonSections;
