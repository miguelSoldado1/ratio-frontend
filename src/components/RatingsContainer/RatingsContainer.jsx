import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { SubmitRating } from "..";
import { RatingsContainerPL } from "../../preloaders";
import { RatingCircle } from "../RatingCircle/RatingCircle";
import { CommunityRatings } from "./CommunityRatings/CommunityRatings";
import { NoRatingsContainer } from "./NoRatingsContainer/NoRatingsContainer";
import { getAverageAlbumRating, getPersonalRating } from "../../api/albumDetails";
import "./RatingsContainer.css";

export const RatingsContainer = ({ albumId }) => {
  const [{ access_token }] = useCookies();
  const { data: userData } = useQuery({ queryKey: ["userInfo", access_token], staleTime: 60 * 6000 });
  const { id } = userData;

  const { data: averageData, isLoading: averageLoading } = useQuery({
    queryKey: ["averageRating", albumId],
    queryFn: () => getAverageAlbumRating({ album_id: albumId }),
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
