import React, { useEffect, useState, useRef } from "react";
import { handleDate } from "../../../../scripts/scripts";
import { RatingCircle } from "../../..";
import { RatingPostsLikes } from "./RatingPostsLikes/RatingPostsLikes";
import { RatingPostsAvatar } from "./RatingPostsAvatar/RatingPostsAvatar";
import "./RatingsPosts.css";

const isOverflown = (element) => {
  return element?.clientWidth < element?.scrollWidth || element?.clientHeight < element?.scrollHeight;
};

// TODO When .has() CSS selector is more widely supported replace the expanded state
export const RatingsPosts = ({ post, children }) => {
  const { user_id, comment, rating, createdAt, _id, likes, liked_by_user } = post;
  const [overflow, setOverflow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => setOverflow(isOverflown(ref.current)), []);

  return (
    <li className="rating-posts-container">
      <div className="rating-posts-header">
        <RatingPostsAvatar userId={user_id} />
        <span>{handleDate(createdAt)}</span>
      </div>
      <div className="rating-posts-body">
        <div
          className={`rating-posts-content${expanded ? " expanded" : ""}`}
          ref={ref}
          onClick={() => setExpanded(!expanded)}
        >
          {comment}
        </div>
        <RatingCircle value={rating} />
      </div>
      <div className="rating-posts-footer">
        <div>
          <RatingPostsLikes likes={likes} ratingId={_id} likedByUser={liked_by_user} />
          {children}
        </div>
        {overflow && (
          <div className={`arrow ${expanded ? "arrow-up" : "arrow-down"}`} onClick={() => setExpanded(!expanded)} />
        )}
      </div>
    </li>
  );
};
