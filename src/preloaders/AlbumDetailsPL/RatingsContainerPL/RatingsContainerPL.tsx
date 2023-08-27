import { RatingCircle } from "@/components/RatingCircle/RatingCircle";
import "./RatingsContainerPL.css";

export const RatingsContainerPL = () => {
  return (
    <div className="ratings-container">
      <div className="ratings-circles">
        <RatingCircle value={-1} description={"Personal"} />
        <RatingCircle value={-1} description={"Community"} />
      </div>
      <div className="ratings-loader" />
    </div>
  );
};
