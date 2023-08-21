import React, { useState } from "react";
import { useParams } from "react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { DatabaseFilters, ProfileScreenHeader, ProfileScreenRatings } from "../../components";
import useAccessToken from "../../hooks/useAuthentication";
import { getUserPosts } from "../../api/profileScreen";
import { ProfileScreenPL } from "../../preloaders";
import "./ProfileScreen.css";

const NUMBER_OF_RATINGS = 6;

export const ProfileScreen = () => {
  const { userId } = useParams();
  const { removeAccessToken } = useAccessToken();
  const [filterActive, setFilterActive] = useState({ tag: "Latest", query: "latest" });

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["profilePosts", userId, filterActive.query],
    queryFn: ({ pageParam = 0 }) => getUserPosts({ userId, pageParam: pageParam ?? 0, order: filterActive.query, pageSize: NUMBER_OF_RATINGS }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    onError: () => removeAccessToken(),
  });

  if (isLoading) return <ProfileScreenPL />;

  return (
    <div className="profile-screen">
      <ProfileScreenHeader />
      <DatabaseFilters setFilterActive={setFilterActive} filterActive={filterActive} resetPagination={() => fetchNextPage({ pageParam: 0 })} />
      {!isLoading && (
        <ProfileScreenRatings userPosts={data?.pages?.flatMap((page) => page?.data)} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
      )}
    </div>
  );
};
