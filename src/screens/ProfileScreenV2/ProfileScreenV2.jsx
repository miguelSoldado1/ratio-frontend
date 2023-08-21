import React, { useState } from "react";
import { useParams } from "react-router";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import useAccessToken from "../../hooks/useAuthentication";
import { getUserProfile, getUserRatings } from "../../api/profileScreen";
import { DatabaseFilters, Loading, ProfileScreenHeader, PostRating } from "../../components";
import { PostRatingPL } from "../../preloaders";
import "./ProfileScreenV2.css";

const getPageTitle = (displayName) => {
  const formattedName = `${displayName}${displayName?.slice(-1) !== "s" ? "'s" : "'"}`;
  return `${formattedName} Ratings`;
};

export const ProfileScreenV2 = () => {
  const { userId } = useParams();
  const { removeAccessToken } = useAccessToken();
  const [filterActive, setFilterActive] = useState({ tag: "Latest", query: "latest" });

  const { data: user } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile({ userId }),
    onSuccess: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    onError: () => removeAccessToken(),
  });

  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["userRatings", userId, filterActive.query],
    queryFn: ({ pageParam }) => getUserRatings({ userId, next: pageParam, filter: filterActive.query }),
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
          <DatabaseFilters setFilterActive={setFilterActive} filterActive={filterActive} resetPagination={() => fetchNextPage()} />
          <div className="profile-screen-container-posts">
            {posts && user
              ? posts.pages.map((page) => page.data.map((post) => <PostRating {...{ ...post, user }} key={`${post._id}-${post.liked_by_user}`} />))
              : [...Array(4)].map((_, index) => <PostRatingPL key={index} />)}
            {hasNextPage && <Loading fetchNextPage={fetchNextPage} />}
          </div>
        </div>
      </div>
    </>
  );
};
