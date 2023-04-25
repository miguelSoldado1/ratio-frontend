import React from "react";
import CircularProgressBar from "./CircularProgressBar";
import "./RatingCircle.css";

export const RatingCircle = ({ value, description, variant }) => {
  return (
    <div className="rating-circle-container">
      <CircularProgressBar value={value ?? 0} variant={variant}>
        <div className="rating-circle-wrapper">
          <h1>{value !== null && value >= 0 ? value : "-"}</h1>
          {description && <p>{description}</p>}
        </div>
      </CircularProgressBar>
    </div>
  );
};
