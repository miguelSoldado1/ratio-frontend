import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./RatingCircleV2.css";

export const RatingCircleV2 = ({ value, description }) => {
  return (
    <div className="rating-circle-container">
      <CircularProgressbarWithChildren value={value} maxValue={10} strokeWidth={11} styles={styles}>
        <div className="rating-circle-tag">
          <h1>{value >= 0 ? value : "-"}</h1>
          {description ? <p>{description}</p> : null}
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
