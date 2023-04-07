import React, { useEffect, useState } from "react";
import "./ProfileScreenRatings.css";
import { ProfileRatingPL, ProfileScreenPL } from "../../preloaders";
import { useParams } from "react-router";
import useAccessToken from "../../hooks/useAuthentication";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserPosts } from "../../api/profileScreen";
import { ProfileRating } from "../ProfileRating/ProfileRating";
import { Loading } from "../Loading/Loading";
import { DatabaseFilters } from "../DatabaseFilters/DatabaseFilters";

const NUMBER_OF_RATINGS = 6;

export const ProfileScreenRatings = ({ setTotalRatings }) => {
  const { userId } = useParams();
  const { removeAccessToken } = useAccessToken();
  const { ref, inView } = useInView();
  const [filterActive, setFilterActive] = useState({ tag: "Latest", query: "latest" });

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["profilePosts", userId, filterActive.query],
    queryFn: ({ pageParam = 0 }) => getUserPosts({ userId, pageParam, order: filterActive.query, pageSize: NUMBER_OF_RATINGS }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    onError: () => removeAccessToken(),
    onSuccess: (data) => setTotalRatings(data.pages[0].total),
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <ProfileScreenPL />;
  }

  return (
    <>
      <DatabaseFilters setFilterActive={setFilterActive} filterActive={filterActive} setPage={() => fetchNextPage({ pageParam: 0 })} />
      <div className="profile-ratings-container">
        {data.pages.map((page) =>
          page.data.length > 0 ? page.data.map((rating) => <ProfileRating props={rating} key={rating?._id} />) : <NoRatingsYet />
        )}
      </div>
      {hasNextPage && <Loading loadingRef={ref} />}
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
