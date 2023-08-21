import React from "react";
import useOverflow from "../../../../hooks/useOverflow";
import { handleDate } from "../../../../scripts/scripts";
import { RatingCircle } from "../../..";
import { RatingPostsLikes } from "./RatingPostsLikes/RatingPostsLikes";
import { RatingPostsAvatar } from "./RatingPostsAvatar/RatingPostsAvatar";
import "./RatingsPosts.css";

export const RatingsPosts = ({ post, children }) => {
  const { comment, rating, createdAt, _id, likes, liked_by_user } = post;
  const { ref, overflow, expanded, handleToggleExpanded } = useOverflow();

  return (
    <li className="rating-posts-container">
      <div className="rating-posts-header">
        <RatingPostsAvatar profile={post.profile} />
        <span>{handleDate(createdAt)}</span>
      </div>
      <div className="rating-posts-body">
        <div className={`rating-posts-content${expanded ? " expanded" : ""}`} ref={ref} onClick={handleToggleExpanded}>
          {comment}
        </div>
        <RatingCircle value={rating} />
      </div>
      <div className="rating-posts-footer">
        <div>
          <RatingPostsLikes likes={likes} ratingId={_id} likedByUser={liked_by_user} />
          {children}
        </div>
        {overflow && <div className={`arrow ${expanded ? "arrow-up" : "arrow-down"}`} onClick={handleToggleExpanded} />}
      </div>
    </li>
  );
};
