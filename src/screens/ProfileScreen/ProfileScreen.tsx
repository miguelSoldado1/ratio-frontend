import { useState } from "react";
import { useParams } from "react-router";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useAccessToken } from "@/hooks";
import { getUserProfile, getUserRatings } from "@/api/profileScreen";
import { DatabaseFilters, Loading, ProfileScreenHeader, PostRating } from "@/components";
import { PostRatingPL } from "@/preloaders";
import { FilterQueries } from "@/enums";
import type { User, UserRatings } from "@/types";
import "./ProfileScreen.css";

const DEFAULT_FILTER = FilterQueries.latest;

const getPageTitle = (displayName: string) => {
  const formattedName = `${displayName}${displayName?.slice(-1) !== "s" ? "'s" : "'"}`;
  return `${formattedName} Ratings`;
};

export const ProfileScreen = () => {
  const { userId } = useParams();
  const { removeAccessToken } = useAccessToken();
  const [filterActive, setFilterActive] = useState<FilterQueries>(DEFAULT_FILTER);

  const { data: user } = useQuery<User>({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile({ userId }),
    onSuccess: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    onError: () => removeAccessToken(),
  });

  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    status,
  } = useInfiniteQuery<UserRatings>({
    queryKey: ["userRatings", userId, filterActive],
    queryFn: ({ pageParam }) => getUserRatings({ userId, next: pageParam, filter: filterActive }),
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    onError: () => removeAccessToken(),
    enabled: !!userId,
  });

  return (
    <>
      <Helmet>
        <title>{user?.displayName ? getPageTitle(user.displayName) : "Ratio"}</title>
      </Helmet>
      <div>
        <ProfileScreenHeader />
        <div className="profile-screen-container">
          <DatabaseFilters filter={filterActive} changeFilter={setFilterActive} isLoading={status !== "success"} />
          <div className="profile-screen-container-posts">
            {posts && user
              ? posts.pages.flatMap((x) => x.data).map((post) => <PostRating {...{ ...post, user }} key={`${post._id}-${post.liked_by_user}`} />)
              : [...Array(4)].map((_, index) => <PostRatingPL key={index} />)}
            {hasNextPage && <Loading fetchNextPage={fetchNextPage} />}
          </div>
        </div>
      </div>
    </>
  );
};
