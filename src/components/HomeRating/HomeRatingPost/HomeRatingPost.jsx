import React from "react";
import { RatingCircle } from "../../RatingCircle/RatingCircle";
import "./HomeRatingPost.css";

export const HomeRatingPost = ({ post }) => {
  return (
    <div className="post-container">
      <span>{post.comment}</span>
      <RatingCircle value={post.rating} />
    </div>
  );
};
