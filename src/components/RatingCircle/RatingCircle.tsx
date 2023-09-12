import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import type { CircularProgressbarStyles } from "react-circular-progressbar/dist/types";
import "react-circular-progressbar/dist/styles.css";
import "./RatingCircle.css";

interface RatingCircleProps {
  value: number;
  description?: string;
}

export const RatingCircle: React.FC<RatingCircleProps> = ({ value, description }) => {
  return (
    <div className="rating-circle-container">
      <CircularProgressbarWithChildren value={value} maxValue={10} strokeWidth={11} styles={styles}>
        <div className="rating-circle-tag">
          <h1>{value >= 0 ? value : "-"}</h1>
          {description && <p>{description}</p>}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

const styles: CircularProgressbarStyles = {
  path: {
    strokeLinecap: "butt",
    transformOrigin: "center center",
    stroke: "white",
    transition: "stroke-dashoffset 0.75s ease 0s",
  },
  trail: {
    stroke: "var(--background-item-color)",
  },
};
