import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as RightArrow } from "../../../icons/right-arrow.svg";
import { ReactComponent as LeftArrow } from "../../../icons/left-arrow.svg";
import "./NavigationButtons.css";

export const NavigationButtons = () => {
  return (
    <div className="nav-buttons">
      <Link to={-1}>
        <LeftArrow className="nav-arrow back" />
      </Link>
      <Link to={-1}>
        <RightArrow className="nav-arrow forward" />
      </Link>
    </div>
  );
};
