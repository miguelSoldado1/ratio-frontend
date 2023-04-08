import React, { useEffect } from "react";
import { ProfileRatingPL } from "../../preloaders";
import { useInView } from "react-intersection-observer";
import { ProfileRating } from "../ProfileRating/ProfileRating";
import { Loading } from "../Loading/Loading";
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
              <ProfileRating props={rating} key={rating?._id} />
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
