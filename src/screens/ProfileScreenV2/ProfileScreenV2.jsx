import React, { useState } from "react";
import { useParams } from "react-router";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import useAccessToken from "../../hooks/useAuthentication";
import { getUserProfile, getUserRatings } from "../../api/profileScreen";
import { DatabaseFilters, Loading, ProfileScreenHeader } from "../../components";
import PostRating from "../../components/PostRating/PostRating";
import "./ProfileScreenV2.css";

const ProfileScreenV2 = () => {
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
    queryFn: ({ pageParam }) => getUserRatings({ userId, cursor: pageParam ?? undefined, filter: filterActive.query }),
    getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
    onError: () => removeAccessToken(),
    enabled: !!userId,
  });

  return (
    <div>
      <ProfileScreenHeader />
      <DatabaseFilters setFilterActive={setFilterActive} filterActive={filterActive} setPage={() => fetchNextPage()} />
      <div className="profile-screen-container">
        {posts ? posts.pages.map((page) => page.data.map((post) => <PostRating {...{ ...post, user }} key={post._id} />)) : <div></div>}
        {hasNextPage && <Loading fetchNextPage={fetchNextPage} />}
      </div>
    </div>
  );
};

export default ProfileScreenV2;
