import React, { useReducer, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../../../hooks/useUserInfo";
import { RatingsPosts } from "./RatingsPosts/RatingsPosts";
import { DatabaseFilters } from "../../DatabaseFilters/DatabaseFilters";
import { getCommunityAlbumRating } from "../../../api/albumDetails";
import { RatingPostsDelete } from "./RatingsPosts/RatingPostsDelete/RatingPostsDelete";
import "./CommunityRatings.css";

const PAGE_SIZE = 6;

const reducer = (state, action) => {
  switch (action.type) {
    case "next_page":
      return { page: state.page + 1, next: action.payload, previous: undefined };
    case "previous_page":
      return { page: state.page - 1, next: undefined, previous: action.payload };
    case "reset_pagination":
      return { page: 0, next: undefined, previous: undefined };
    default:
      return state;
  }
};

export const CommunityRatings = ({ albumId, numOfRatings }) => {
  const { data: userData } = useUserInfo();
  const [{ page, next, previous }, dispatch] = useReducer(reducer, { page: 0, next: undefined, previous: undefined });
  const [filterActive, setFilterActive] = useState({ tag: "Latest", query: "latest" });

  const id = userData?.id;

  const maxNumOfPages = Math.ceil(numOfRatings / PAGE_SIZE);

  const { data, isLoading } = useQuery({
    queryKey: ["ratings", albumId, page, filterActive.query],
    queryFn: () => {
      return getCommunityAlbumRating({ album_id: albumId, filter: filterActive.query, next, previous });
    },
    keepPreviousData: true,
  });

  const handleNavigation = (reference) => {
    if (reference === navigationMapping.FORWARD && maxNumOfPages > page + 1) {
      dispatch({ type: "next_page", payload: data.next });
    }
    if (reference === navigationMapping.BACKWARDS && page > 0) {
      dispatch({ type: "previous_page", payload: data.previous });
    }
  };

  const resetPagination = () => {
    dispatch({ type: "reset_pagination" });
    setFilterActive({ tag: "Latest", query: "latest" });
  };

  if (isLoading) {
    return <div className="ratings-loader" />;
  }

  return (
    <>
      <DatabaseFilters
        setFilterActive={setFilterActive}
        filterActive={filterActive}
        resetPagination={() => dispatch({ type: "reset_pagination" })}
        numberOfRatings={numOfRatings}
      />
      <ol className="community-ratings">
        {data.ratings?.map((rating) => (
          <RatingsPosts post={rating} key={`${rating._id}-${rating.liked_by_user}`}>
            {id === rating.profile.id && <RatingPostsDelete ratingId={rating._id} albumId={rating.album_id} resetPagination={resetPagination} />}
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

const navigationMapping = {
  BACKWARDS: 0,
  FORWARD: 1,
};
