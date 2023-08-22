import React, { useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../../../hooks/useUserInfo";
import { RatingsPosts } from "./RatingsPosts/RatingsPosts";
import { DatabaseFilters, filters } from "../../DatabaseFilters/DatabaseFilters";
import { getCommunityAlbumRatings } from "../../../api/albumDetails";
import { RatingPostsDelete } from "./RatingsPosts/RatingPostsDelete/RatingPostsDelete";
import "./CommunityRatings.css";

const DEFAULT_FILTER = filters.LATEST.query;

const reducer = (state, action) => {
  switch (action.type) {
    case "next_page":
      return { ...state, page: state.page + 1, next: action.payload, previous: undefined };
    case "previous_page":
      return { ...state, page: state.page - 1, next: undefined, previous: action.payload };
    case "reset_pagination":
      return { page: 0, next: undefined, previous: undefined, filter: DEFAULT_FILTER };
    case "change_filter":
      return { page: 0, next: undefined, previous: undefined, filter: action.payload };
    default:
      return state;
  }
};

export const CommunityRatings = ({ albumId, numOfRatings }) => {
  const { data: userData } = useUserInfo();
  const [{ page, next, previous, filter }, dispatch] = useReducer(reducer, { page: 0, next: undefined, previous: undefined, filter: DEFAULT_FILTER });

  const { data, status } = useQuery({
    queryKey: ["ratings", albumId, page, filter],
    queryFn: () => getCommunityAlbumRatings({ album_id: albumId, filter: filter, next, previous }),
  });

  const goToPreviousStep = () => dispatch({ type: "previous_page", payload: data.previous });
  const goToNextStep = () => dispatch({ type: "next_page", payload: data.next });

  return (
    <>
      <DatabaseFilters
        filter={filter}
        changeFilter={(filter) => dispatch({ type: "change_filter", payload: filter })}
        isLoading={status !== "success"}
      />
      {status === "success" && data.ratings.length > 0 ? (
        <>
          <ol className="community-ratings">
            {data.ratings?.map((rating) => (
              <RatingsPosts post={rating} key={`${rating._id}-${rating.liked_by_user}`}>
                {userData?.id === rating.profile.id && (
                  <RatingPostsDelete ratingId={rating._id} albumId={rating.album_id} resetPagination={() => dispatch({ type: "reset_pagination" })} />
                )}
              </RatingsPosts>
            ))}
          </ol>
          <div className="nav-arrow-ratings-container">
            <button className="arrow" onClick={goToPreviousStep} style={{ rotate: "135deg" }} disabled={!data.previous || page === 0} />
            <p style={{ padding: 0 }}>{page + 1}</p>
            <button className="arrow" onClick={goToNextStep} style={{ rotate: "-45deg" }} disabled={!data.next} />
          </div>
        </>
      ) : (
        <div className="ratings-loader" />
      )}
    </>
  );
};
