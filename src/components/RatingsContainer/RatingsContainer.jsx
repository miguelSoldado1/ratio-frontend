import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SubmitRating } from "..";
import { RatingsContainerPL } from "../../preloaders";
import { RatingCircle } from "../RatingCircle/RatingCircle";
import { CommunityRatings } from "./CommunityRatings/CommunityRatings";
import { NoRatingsContainer } from "./NoRatingsContainer/NoRatingsContainer";
import { getAverageAlbumRating, getPersonalRating } from "../../api/albumDetails";
import { getMe } from "../../api/navigationBar";
import "./RatingsContainer.css";

export const RatingsContainer = ({ albumId }) => {
  const { data: userData } = useQuery({ queryKey: ["userInfo"], queryFn: getMe, staleTime: 60 * 6000, cacheTime: 60 * 6000 });
  const id = userData?.id;

  const { data: averageData, isLoading: averageLoading } = useQuery({
    queryKey: ["averageRating", albumId],
    queryFn: () => getAverageAlbumRating({ album_id: albumId }),
  });

  const { data: personalRating, isLoading: personalLoading } = useQuery({
    queryKey: ["personalRating", albumId, id],
    queryFn: () => getPersonalRating({ album_id: albumId, user_id: id }),
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
