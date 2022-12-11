import React from "react";
import { useState } from "react";
import { Button } from "..";
import "./ScrollDownButton.css";

export const ScrollDownButton = ({ textAreaRef }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    textAreaRef?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {!clicked && textAreaRef ? (
        <div className="scroll-down-button">
          <Button onClick={handleClick}>Give it a rating</Button>
        </div>
      ) : null}
    </>
  );
};
