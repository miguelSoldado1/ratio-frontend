import React, { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import useAccessToken from "../../hooks/useAuthentication";
import { ProfileRating, DatabaseFilters } from "../../components";
import { Loading } from "../../components/Loading/Loading";
import { ProfileScreenPL, ProfileRatingPL } from "../../preloaders";
import { getUserDisplayName, getUserPosts } from "../../api/profileScreen";
import "./ProfileScreen.css";

const NUMBER_OF_RATINGS = 6;

const getPageTitle = (displayName) => {
  const formattedName = `${displayName}${displayName?.slice(-1) !== "s" ? "'s" : "'"}`;
  return `${formattedName} Ratings`;
};

export const ProfileScreen = () => {
  const { userId } = useParams();
  const { removeAccessToken } = useAccessToken();
  const { ref, inView } = useInView();
  const [filterActive, setFilterActive] = useState({ tag: "Latest", query: "latest" });

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["profilePosts", userId, filterActive.query],
    queryFn: ({ pageParam = 0 }) => getUserPosts({ userId, pageParam, order: filterActive.query, pageSize: NUMBER_OF_RATINGS }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    onError: () => removeAccessToken(),
  });

  const { data: displayNameData, isLoading: displayNameLoading } = useQuery({
    queryKey: ["displayName", userId],
    queryFn: () => getUserDisplayName({ userId }),
    onSuccess: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    onError: () => removeAccessToken(),
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

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
        <div className="profile-ratings-container">
          {data.pages.map((page) =>
            page.data.length > 0 ? page.data.map((rating) => <ProfileRating props={rating} key={rating?._id} />) : <NoRatingsYet />
          )}
        </div>
        {hasNextPage && <Loading loadingRef={ref} />}
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
