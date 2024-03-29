import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useAccessToken } from "@/hooks";
import { getUserProfile, getUserRatings } from "@/api/profileScreen";
import { DatabaseFilters, Loading, ProfileScreenHeader, PostRating, EmptyProfileScreen } from "@/components";
import { PostRatingPL } from "@/preloaders";
import { FilterQueries } from "@/enums";
import type { PersonalRating, User, UserRatings } from "@/types";
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

  useEffect(() => {
    setFilterActive(DEFAULT_FILTER);
  }, [userId]);

  const { data: user, status: userStatus } = useQuery<User>({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile({ userId }),
    onError: () => removeAccessToken(),
  });

  const { data, hasNextPage, fetchNextPage, isInitialLoading } = useInfiniteQuery<UserRatings>({
    queryKey: ["userRatings", userId, filterActive],
    queryFn: ({ pageParam }) => getUserRatings({ userId, next: pageParam, filter: filterActive }),
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    onError: () => removeAccessToken(),
    enabled: !!userId,
  });

  const ratings = data?.pages.flatMap((x) => x.data) ?? [];

  return (
    <>
      <Helmet>
        <title>{user?.displayName ? getPageTitle(user.displayName) : "Ratio"}</title>
      </Helmet>
      <ProfileScreenHeader />
      <div className="profile-screen-container">
        <DatabaseFilters filter={filterActive} changeFilter={setFilterActive} isLoading={isInitialLoading} />
        <div className="profile-screen-container-posts">
          {!isInitialLoading && userStatus === "success" ? (
            ratings.length > 0 ? (
              <>
                <RenderRatings ratings={ratings} user={user} />
                {hasNextPage && <Loading fetchNextPage={fetchNextPage} />}
              </>
            ) : (
              <EmptyProfileScreen />
            )
          ) : (
            <RatingsPreloader />
          )}
        </div>
      </div>
    </>
  );
};

const RatingsPreloader = () => {
  return [...Array(4)].map((_, index) => <PostRatingPL key={index} />);
};

const RenderRatings = ({ ratings, user }: { ratings: PersonalRating[]; user: User }) => {
  return ratings.map((post) => <PostRating {...{ ...post, user }} key={`${post._id}-${post.liked_by_user}`} />);
};
