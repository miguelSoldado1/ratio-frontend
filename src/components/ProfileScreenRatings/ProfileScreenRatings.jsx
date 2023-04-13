import React, { useEffect } from "react";
import { ProfileRatingPL } from "../../preloaders";
import { useInView } from "react-intersection-observer";
import { Loading, ProfileRatingV2 } from "../../components";

import "./ProfileScreenRatings.css";

export const ProfileScreenRatings = ({ userPosts, fetchNextPage, hasNextPage }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <>
      {userPosts.length > 0 ? (
        <>
          <div className="profile-ratings-container">
            {userPosts.map((rating) => (
              <ProfileRatingV2 profileRating={rating} key={rating?._id} />
            ))}
          </div>
          {hasNextPage && <Loading loadingRef={ref} />}
        </>
      ) : (
        <NoRatingsYet />
      )}
    </>
  );
};

const NoRatingsYet = () => {
  return (
    <>
      <h3 className="profile-screen-no-ratings">No personal ratings yet...</h3>
      <ProfileRatingPL />
      <ProfileRatingPL />
      <ProfileRatingPL />
    </>
  );
};
