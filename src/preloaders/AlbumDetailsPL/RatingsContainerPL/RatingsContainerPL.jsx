import { RatingCircleV2 } from "../../../components/RatingCircleV2/RatingCircleV2";
import "./RatingsContainerPL.css";

export const RatingsContainerPL = () => {
  return (
    <div className="ratings-container">
      <div className="ratings-circles">
        <RatingCircleV2 value={-1} description={"Personal"} />
        <RatingCircleV2 value={-1} description={"Community"} />
      </div>
      <div className="ratings-loader" />
    </div>
  );
};
