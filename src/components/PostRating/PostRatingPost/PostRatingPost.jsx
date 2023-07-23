import React from "react";
import useOverflow from "../../../hooks/useOverflow";
import { RatingCircle } from "../../RatingCircle/RatingCircle";
import { PostRatingLikes } from "../PostRatingLikes/PostRatingLikes";
import "./PostRatingPost.css";

export const PostRatingPost = ({ post }) => {
  const { ref, overflow, expanded, handleToggleExpanded } = useOverflow();

  return (
    <>
      <div className="post-container">
        <span className={`post-container-content${expanded ? " expanded" : ""}`} ref={ref} onClick={handleToggleExpanded}>
          {post.comment}
        </span>
        <RatingCircle value={post.rating} />
      </div>
      <PostRatingLikes likes={post.likes} ratingId={post._id} likedByUser={post.liked_by_user}>
        {overflow && <div className={`arrow ${expanded ? "arrow-up" : "arrow-down"}`} onClick={handleToggleExpanded} />}
      </PostRatingLikes>
    </>
  );
};
