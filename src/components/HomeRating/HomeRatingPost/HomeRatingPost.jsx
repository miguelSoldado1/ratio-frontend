import React from "react";
import useOverflow from "../../../hooks/useOverflow";
import { RatingCircle } from "../../RatingCircle/RatingCircle";
import { HomeRatingLikes } from "../HomeRatingLikes/HomeRatingLikes";
import "./HomeRatingPost.css";

export const HomeRatingPost = ({ post }) => {
  const { ref, overflow, expanded, handleToggleExpanded } = useOverflow();

  return (
    <>
      <div className="post-container">
        <span className={`post-container-content${expanded ? " expanded" : ""}`} ref={ref} onClick={handleToggleExpanded}>
          {post.comment}
        </span>
        <RatingCircle value={post.rating} />
      </div>
      <HomeRatingLikes likes={post.likes} ratingId={post._id} likedByUser={post.liked_by_user}>
        {overflow && <div className={`arrow ${expanded ? "arrow-up" : "arrow-down"}`} onClick={handleToggleExpanded} />}
      </HomeRatingLikes>
    </>
  );
};
