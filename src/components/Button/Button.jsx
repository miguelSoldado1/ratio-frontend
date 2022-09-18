import React from "react";
import "./Button.css";

export const Button = ({ title, onPress }) => {
  return (
    <button className="custom-button" onClick={onPress}>
      {title}
    </button>
  );
};
