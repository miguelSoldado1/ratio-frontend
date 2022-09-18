import React, { useState, useEffect } from "react";
import { useUserDataStore } from "../../stores";
import { getMyAlbumRating, getAverageAlbumRating } from "../../api/albumDetails";
import { SubmitRatingV2, CommunityRatings, NoRatingsContainer, RatingCircleV2 } from "../";
import "./RatingsContainer.css";

export const RatingsContainer = ({ albumId }) => {
  const id = useUserDataStore((state) => state.userData.id);
  const [communityRating, setCommunityRating] = useState(-1);
  const [personalRating, setPersonalRating] = useState(-1);
  const [numOfRatings, setNumOfRatings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setPersonalRating(await getMyAlbumRating(albumId, id));
      const { rating, sum } = await getAverageAlbumRating(albumId);
      setCommunityRating(rating);
      setNumOfRatings(sum);
    };
    fetchData();
  }, [albumId, id]);

  return (
    <div className="ratings-container">
      <div className="ratings-circles">
        <RatingCircleV2 value={personalRating} description={"Personal"} />
        <RatingCircleV2 value={communityRating} description={"Community"} />
      </div>
      {personalRating < 0 ? <SubmitRatingV2 albumId={albumId} /> : null}
      {communityRating > 0 ? <CommunityRatings albumId={albumId} numOfRatings={numOfRatings} /> : <NoRatingsContainer />}
    </div>
  );
};
