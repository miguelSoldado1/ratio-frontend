import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowingRatings } from "@/api/homeScreen";
import { PostRating, Loading, EmptyPostsFeed } from "..";
import { PostRatingPL } from "@/preloaders";
import type { FeedRating, FollowingRatings } from "@/types";
import "./PostsFeed.css";
import { useAccessToken } from "@/hooks";

interface PostsFeedProps {
  userId?: string;
}

export const PostsFeed: React.FC<PostsFeedProps> = ({ userId }) => {
  const { removeAccessToken } = useAccessToken();

  const { data, isInitialLoading, hasNextPage, fetchNextPage } = useInfiniteQuery<FollowingRatings>({
    queryKey: ["followingRatings", userId],
    queryFn: ({ pageParam = undefined }) => getFollowingRatings({ next: pageParam }),
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    onError: removeAccessToken,
    enabled: !!userId,
  });

  const ratings = data?.pages.flatMap((x) => x.data);

  return (
    <>
      <h4 className="posts-feed-title">Following</h4>
      <div className="posts-feed-container">
        {!ratings || isInitialLoading ? (
          <RatingsPreloader />
        ) : ratings.length !== 0 ? (
          <>
            <RenderRatings ratings={ratings} />
            {hasNextPage && <Loading fetchNextPage={fetchNextPage} />}
          </>
        ) : (
          <EmptyPostsFeed />
        )}
      </div>
    </>
  );
};

const RatingsPreloader = () => {
  return [...Array(4)].map((_, index) => <PostRatingPL key={index} />);
};

const RenderRatings = ({ ratings }: { ratings: FeedRating[] }) => {
  return ratings.map((post) => <PostRating {...post} key={`${post._id}-${post.liked_by_user}`} />);
};
