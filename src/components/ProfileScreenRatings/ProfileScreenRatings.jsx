import React from "react";
import { ProfileRatingPL } from "../../preloaders";
import { ProfileRating } from "../ProfileRating/ProfileRating";
import { Loading } from "../../components";
import "./ProfileScreenRatings.css";

export const ProfileScreenRatings = ({ userPosts, fetchNextPage, hasNextPage }) => {
  if (userPosts.length <= 0) {
    return <NoRatingsYet />;
  }

  return (
    <>
      <div className="profile-ratings-container">
        {userPosts.map((rating) => (
          <ProfileRating userPost={rating} key={rating?._id} />
        ))}
      </div>
      {hasNextPage && <Loading fetchNextPage={fetchNextPage} />}
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
