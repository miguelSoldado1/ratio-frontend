import React, { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";
import { ProfileRating, DatabaseFilters, Button } from "../../components";
import { ProfileScreenPL, ProfileRatingPL } from "../../preloaders";
import { getUserDisplayName, getUserPosts } from "../../api/profileScreen";
import "./ProfileScreen.css";

const NUMBER_OF_RATINGS = 8;

const getPageTitle = (displayName) => {
  const formattedName = `${displayName}${displayName?.slice(-1) !== "s" ? "'s" : "'"}`;
  return `${formattedName} Ratings`;
};

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [{ access_token }] = useCookies();
  const [filterActive, setFilterActive] = useState({ tag: "Latest", query: "latest" });

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["profilePosts", userId, filterActive.query, access_token],
    queryFn: ({ pageParam = 0 }) =>
      getUserPosts({ userId, pageParam, order: filterActive.query, pageSize: NUMBER_OF_RATINGS, accessToken: access_token }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    onError: () => navigate("/"),
  });

  const { data: displayNameData, isLoading: displayNameLoading } = useQuery({
    queryKey: ["displayName", userId, access_token],
    queryFn: () => getUserDisplayName({ userId, accessToken: access_token }),
    onSuccess: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    onError: () => navigate("/"),
  });

  const title = !displayNameLoading ? getPageTitle(displayNameData?.displayName) : "";

  if (isLoading) {
    return <ProfileScreenPL />;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="profile-screen">
        <h1 className="profile-screen-title">{title}</h1>
        <DatabaseFilters setFilterActive={setFilterActive} filterActive={filterActive} setPage={() => fetchNextPage({ pageParam: 0 })} />
        {data.pages.map((page) =>
          page.data.length > 0 ? page.data.map((rating) => <ProfileRating props={rating} key={rating?._id} />) : <NoRatingsYet />
        )}
        {hasNextPage && <Button onClick={fetchNextPage}>Load more</Button>}
      </div>
    </>
  );
};

const NoRatingsYet = () => {
  return (
    <>
      <h3 className="profile-screen-no-ratings">No personal ratings yet...</h3>
      <ProfileRatingPL />
      <ProfileRatingPL />
      <ProfileRatingPL />
    </>
  );
};
