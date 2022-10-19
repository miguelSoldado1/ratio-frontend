import React, { useState, useEffect } from "react";
import { useUserDataStore } from "../../stores";
import { getMyAlbumRating, getAverageAlbumRating } from "../../api/albumDetails";
import { SubmitRatingV2, CommunityRatings, NoRatingsContainer, RatingCircleV2 } from "../";
import { RatingsContainerPL } from "../../preloaders";
import "./RatingsContainer.css";

export const RatingsContainer = ({ albumId }) => {
  const id = useUserDataStore((state) => state.userData.id);
  const [communityRating, setCommunityRating] = useState(-1);
  const [personalRating, setPersonalRating] = useState(-1);
  const [numOfRatings, setNumOfRatings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { rating, sum } = await getAverageAlbumRating(albumId);
      setCommunityRating(rating);
      setNumOfRatings(sum);
      setPersonalRating(await getMyAlbumRating(albumId, id));
    };
    fetchData().then(() => setLoading(false));
    return () => {
      setCommunityRating(-1);
      setPersonalRating(-1);
      setNumOfRatings(0);
      setLoading(true);
    };
  }, []);

  if (!loading) {
    return (
      <div className="ratings-container">
        <div className="ratings-circles">
          <RatingCircleV2 value={personalRating} description={"Personal"} />
          <RatingCircleV2 value={communityRating} description={"Community"} />
        </div>
        {personalRating < 0 && <SubmitRatingV2 albumId={albumId} />}
        {communityRating > 0 ? <CommunityRatings albumId={albumId} numOfRatings={numOfRatings} /> : <NoRatingsContainer />}
      </div>
    );
  }
  return <RatingsContainerPL />;
};
