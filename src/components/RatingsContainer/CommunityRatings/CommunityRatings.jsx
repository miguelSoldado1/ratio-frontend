import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { RatingsPosts } from "./RatingsPosts/RatingsPosts";
import { DatabaseFilters } from "../../DatabaseFilters/DatabaseFilters";
import { getAllRatings } from "../../../api/albumDetails";
import { RatingPostsDelete } from "./RatingsPosts/RatingPostsDelete/RatingPostsDelete";
import "./CommunityRatings.css";

const PAGE_SIZE = 6;

export const CommunityRatings = ({ albumId, numOfRatings }) => {
  const [{ access_token }] = useCookies();
  const { data: userData } = useQuery({ queryKey: ["userInfo", access_token], staleTime: 60 * 6000 });
  const { id } = userData;
  const [page, setPage] = useState(0);

  const [filterActive, setFilterActive] = useState({ tag: "Latest", query: "latest" });
  const maxNumOfPages = Math.ceil(numOfRatings / PAGE_SIZE);

  const { data: ratingsData, isLoading } = useQuery({
    queryKey: ["ratings", albumId, page, filterActive.query],
    queryFn: () => getAllRatings(albumId, page, filterActive.query, PAGE_SIZE, id),
    keepPreviousData: true,
    staleTime: 300000,
  });

  const handleNavigation = (reference) => {
    if (reference === navigationMapping.FORWARD && maxNumOfPages > page + 1) return setPage(page + 1);
    if (reference === navigationMapping.BACKWARDS && page > 0) return setPage(page - 1);
  };

  const resetPagination = () => {
    setPage(0);
    setFilterActive({ tag: "Latest", query: "latest" });
  };

  if (isLoading) {
    return <div className="ratings-loader" />;
  }

  return (
    <>
      <DatabaseFilters setFilterActive={setFilterActive} filterActive={filterActive} setPage={setPage} numberOfRatings={numOfRatings} />
      <ol className="community-ratings">
        {ratingsData.ratings.map((item) => (
          <RatingsPosts post={item} key={item._id}>
            {id === item.user_id && <RatingPostsDelete ratingId={item._id} albumId={item.album_id} resetPagination={resetPagination} />}
          </RatingsPosts>
        ))}
      </ol>
      <div className="nav-arrow-ratings-container">
        <div
          className={`arrow  ${page < 1 && " disabled"}`}
          onClick={() => handleNavigation(navigationMapping.BACKWARDS)}
          style={{ rotate: "135deg" }}
        />
        <p style={{ padding: 0 }}>{page + 1}</p>
        <div
          className={`arrow  ${maxNumOfPages <= page + 1 && " disabled"}`}
          onClick={() => handleNavigation(navigationMapping.FORWARD)}
          style={{ rotate: "-45deg" }}
        />
      </div>
    </>
  );
};

const navigationMapping = { BACKWARDS: 0, FORWARD: 1 };
