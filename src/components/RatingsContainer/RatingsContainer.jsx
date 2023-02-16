import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SubmitRating } from "..";
import { RatingsContainerPL } from "../../preloaders";
import { useUserDataStore } from "../../stores";
import { RatingCircle } from "../RatingCircle/RatingCircle";
import { CommunityRatings } from "./CommunityRatings/CommunityRatings";
import { NoRatingsContainer } from "./NoRatingsContainer/NoRatingsContainer";
import { getAverageAlbumRating, getPersonalRating } from "../../api/albumDetails";
import "./RatingsContainer.css";

export const RatingsContainer = ({ albumId }) => {
  const id = useUserDataStore((state) => state.userData.id);
  const { data: averageData, isLoading: averageLoading } = useQuery({
    queryKey: ["averageRating", albumId],
    queryFn: () => getAverageAlbumRating(albumId),
  });

  const { data: personalRating, isLoading: personalLoading } = useQuery({
    queryKey: ["personalRating", albumId, id],
    queryFn: () => getPersonalRating(albumId, id),
  });

  if (averageLoading || personalLoading) {
    return <RatingsContainerPL />;
  }

  const { averageRating, numRatings } = averageData;
  return (
    <div className="ratings-container">
      <div className="ratings-circles">
        <RatingCircle value={personalRating} description={"Personal"} />
        <RatingCircle value={averageRating} description={"Community"} />
      </div>
      {personalRating === null && <SubmitRating albumId={albumId} />}
      {averageRating !== null ? <CommunityRatings albumId={albumId} numOfRatings={numRatings} /> : <NoRatingsContainer />}
    </div>
  );
};
