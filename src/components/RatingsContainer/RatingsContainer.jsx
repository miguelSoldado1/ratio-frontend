import React from "react";
import { useEffect } from "react";
import { SubmitRatingV2 } from "..";
import { RatingsContainerPL } from "../../preloaders";
import { useRatingsStore, useUserDataStore } from "../../stores";
import { RatingCircleV2 } from "../RatingCircleV2/RatingCircleV2";
import { CommunityRatings } from "./CommunityRatings/CommunityRatings";
import { NoRatingsContainer } from "./NoRatingsContainer/NoRatingsContainer";
import "./RatingsContainer.css";

export const RatingsContainer = ({ albumId }) => {
  const id = useUserDataStore((state) => state.userData.id);
  const [ratings, clearAllRatings] = useRatingsStore((state) => [state.ratings, state.clearAllRatings]);
  const [getCircleRatings, personalRating, averageRating, numOfRatings] = useRatingsStore((state) => [
    state.getCircleRatings,
    state.personalRating,
    state.averageRating,
    state.numOfRatings,
  ]);

  useEffect(() => {
    if (albumId && id) getCircleRatings(albumId, id);
    return () => clearAllRatings();
  }, [getCircleRatings, clearAllRatings, albumId, id]);
  if (!ratings) {
    return <RatingsContainerPL />;
  }

  return (
    <div className="ratings-container">
      <div className="ratings-circles">
        <RatingCircleV2 value={personalRating} description={"Personal"} />
        <RatingCircleV2 value={averageRating} description={"Community"} />
      </div>
      {!personalRating && <SubmitRatingV2 albumId={albumId} />}
      {!!averageRating ? <CommunityRatings albumId={albumId} numOfRatings={numOfRatings} /> : <NoRatingsContainer />}
    </div>
  );
};
