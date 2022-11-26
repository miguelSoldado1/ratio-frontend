import { useState, useEffect } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./RatingCircle.css";

export const RatingCircle = ({ value, description }) => {
  const [renderValue, setRenderValue] = useState(-1);

  useEffect(() => {
    if (value) renderValue <= 0 ? setTimeout(() => setRenderValue(value), 250) : setRenderValue(value);
    return () => setRenderValue(-1);
  }, [value, renderValue]);

  return (
    <div className="rating-circle-container">
      <CircularProgressbarWithChildren value={renderValue} maxValue={10} strokeWidth={11} styles={styles}>
        <div className="rating-circle-tag">
          <h1>{renderValue >= 0 ? renderValue : "-"}</h1>
          {description && <p>{description}</p>}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

const styles = {
  path: {
    strokeLinecap: "butt",
    transformOrigin: "center center",
    stroke: "white",
    transition: "stroke-dashoffset 0.75s ease 0s",
  },
  trail: {
    stroke: "transparent",
  },
};
