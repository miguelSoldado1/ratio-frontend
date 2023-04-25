import React, { useEffect, useState } from "react";
import CircularProgressBar from "./CircularProgressBar";
import "./RatingCircle.css";

export const RatingCircle = ({ value, description, variant }) => {
  const [renderValue, setRenderValue] = useState(0);

  useEffect(() => {
    if (value) renderValue <= 0 ? setTimeout(() => setRenderValue(value), 250) : setRenderValue(value);
    return () => setRenderValue(0);
  }, [value, renderValue]);

  return (
    <div className="rating-circle-container">
      <CircularProgressBar value={renderValue ?? 0} variant={variant}>
        <div className="rating-circle-wrapper">
          <h1>{value !== null && value >= 0 ? value : "-"}</h1>
          {description && <p>{description}</p>}
        </div>
      </CircularProgressBar>
    </div>
  );
};
