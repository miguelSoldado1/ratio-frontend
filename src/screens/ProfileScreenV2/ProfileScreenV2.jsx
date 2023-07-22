import React, { useState } from "react";
import "./ProfileScreenV2.css";
import { useParams } from "react-router";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getUserProfile, getUserRatings } from "../../api/profileScreen";
import useAccessToken from "../../hooks/useAuthentication";
import HomeRating from "../../components/HomeRating/HomeRating";
import { DatabaseFilters, Loading, ProfileScreenHeader } from "../../components";

const ProfileScreenV2 = () => {
  const { userId } = useParams();
  const { removeAccessToken } = useAccessToken();
  const [filterActive, setFilterActive] = useState({ tag: "Latest", query: "latest" });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile({ userId }),
    onSuccess: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    onError: () => removeAccessToken(),
  });

  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isLoading: postsLoading,
  } = useInfiniteQuery({
    queryKey: ["userRatings", userId, filterActive.query],
    queryFn: ({ pageParam }) => getUserRatings({ userId, cursor: pageParam ?? undefined, filter: filterActive.query }),
    getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
    onError: () => removeAccessToken(),
    enabled: !!userId,
  });

  if (postsLoading || userLoading) return null;

  return (
    <div>
      <ProfileScreenHeader />
      <DatabaseFilters setFilterActive={setFilterActive} filterActive={filterActive} setPage={() => fetchNextPage()} />
      <div className="posts-feed-container">
        {posts.pages.map((page) => page.data.map((post) => <HomeRating {...{ ...post, user }} key={post._id} />))}
        {hasNextPage && <Loading fetchNextPage={fetchNextPage} />}
      </div>
    </div>
  );
};

export default ProfileScreenV2;
