import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "..";
import "./ScrollDownButton.css";

export const ScrollDownButton = ({ textAreaRef }) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) setClicked(true);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 600) setClicked(false);
      });
    };
  }, []);

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
