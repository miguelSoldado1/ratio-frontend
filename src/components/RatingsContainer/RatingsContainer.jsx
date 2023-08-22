import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SubmitRating } from "..";
import { RatingsContainerPL } from "../../preloaders";
import { RatingCircle } from "../RatingCircle/RatingCircle";
import { CommunityRatings } from "./CommunityRatings/CommunityRatings";
import { NoRatingsContainer } from "./NoRatingsContainer/NoRatingsContainer";
import { getAverageAlbumRating, getPersonalRating } from "../../api/albumDetails";
import useUserInfo from "../../hooks/useUserInfo";
import "./RatingsContainer.css";

export const RatingsContainer = ({ albumId }) => {
  const { data: userData } = useUserInfo();
  const userId = userData?.id;

  const { data: averageData, isLoading: averageLoading } = useQuery({
    queryKey: ["averageRating", albumId],
    queryFn: () => getAverageAlbumRating({ album_id: albumId }),
  });

  const { data: personalRating, isLoading: personalLoading } = useQuery({
    queryKey: ["personalRating", albumId, userId],
    queryFn: () => getPersonalRating({ album_id: albumId, user_id: userId }),
  });

  if (averageLoading || personalLoading) {
    return <RatingsContainerPL />;
  }

  const averageRating = averageData?.averageRating;

  return (
    <div className="ratings-container">
      <div className="ratings-circles">
        <RatingCircle value={personalRating} description={"Personal"} />
        <RatingCircle value={averageRating} description={"Community"} />
      </div>
      {personalRating === null && <SubmitRating albumId={albumId} />}
      {averageRating !== null ? <CommunityRatings albumId={albumId} /> : <NoRatingsContainer />}
    </div>
  );
};
