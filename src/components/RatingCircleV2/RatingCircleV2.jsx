import { useState, useEffect } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./RatingCircleV2.css";

export const RatingCircleV2 = ({ value, description }) => {
  const [renderValue, setRenderValue] = useState(-1);

  useEffect(() => {
    setTimeout(() => setRenderValue(value), 250);
    return () => setRenderValue(-1);
  }, [value]);

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
    transform: "rotate(0.25turn)",
    transformOrigin: "center center",
    stroke: "white",
    transition: "stroke-dashoffset 0.75s ease 0s",
  },
  trail: {
    stroke: "transparent",
  },
};
