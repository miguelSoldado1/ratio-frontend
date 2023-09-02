import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowingRatings } from "@/api/homeScreen";
import { PostRating, Loading } from "..";
import { PostRatingPL } from "@/preloaders";
import type { FollowingRatings } from "@/types";
import "./PostsFeed.css";

interface PostsFeedProps {
  userId?: string;
}

export const PostsFeed: React.FC<PostsFeedProps> = ({ userId }) => {
  const { data, isInitialLoading, hasNextPage, fetchNextPage } = useInfiniteQuery<FollowingRatings>({
    queryKey: ["followingRatings", userId],
    queryFn: ({ pageParam = undefined }) => getFollowingRatings({ next: pageParam }),
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    enabled: !!userId,
  });

  return (
    <>
      <h4 className="posts-feed-title">Following</h4>
      <div className="posts-feed-container">
        {!data || isInitialLoading
          ? [...Array(4)].map((_, index) => <PostRatingPL key={index} />)
          : data.pages.flatMap((x) => x.data).map((post) => <PostRating {...post} key={`${post._id}-${post.liked_by_user}`} />)}
        {hasNextPage && <Loading fetchNextPage={fetchNextPage} />}
      </div>
    </>
  );
};
