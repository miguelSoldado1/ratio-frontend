import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getFollowingRatings } from "../../api/homeScreen";
import HomeRating from "../HomeRating/HomeRating";
import "./PostsFeed.css";

const PostsFeed = ({ userId }) => {
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["getFollowingRatings", userId],
    queryFn: getFollowingRatings,
    enabled: !!userId,
  });

  if (postsLoading || !posts) {
    return null;
  }

  return (
    <div className="posts-feed-container">
      {posts.map((post) => (
        <HomeRating {...post} key={post._id} />
      ))}
    </div>
  );
};

export default PostsFeed;
