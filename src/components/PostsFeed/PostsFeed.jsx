import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowingRatings } from "../../api/homeScreen";
import { PostRating, Loading } from "../../components";
import { PostRatingPL } from "../../preloaders";
import "./PostsFeed.css";

export const PostsFeed = ({ userId }) => {
  const {
    data: posts,
    isInitialLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["followingRatings", userId],
    queryFn: ({ pageParam = undefined }) => getFollowingRatings({ cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
    enabled: !!userId,
  });

  return (
    <div className="posts-feed-container">
      {!posts || isInitialLoading
        ? [...Array(4)].map((_, index) => <PostRatingPL key={index} />)
        : posts.pages.map((page) => page.data.map((post) => <PostRating {...post} key={post._id} />))}
      {hasNextPage && <Loading fetchNextPage={fetchNextPage} />}
    </div>
  );
};
