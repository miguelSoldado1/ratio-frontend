import React, { useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserInfo } from "@/hooks";
import { getCommunityAlbumRatings } from "@/api/albumDetails";
import { DatabaseFilters, RatingsPost } from "@/components";
import { RatingPostsDelete } from "./RatingsPosts/RatingPostsDelete/RatingPostsDelete";
import { FilterQueries } from "@/enums";
import type { CommunityAlbumRatings } from "@/types";
import "./CommunityRatings.css";

const DEFAULT_FILTER = FilterQueries.latest;

interface ReducerState {
  page: number;
  next?: string;
  previous?: string;
  filter: FilterQueries;
}

interface ReducerAction {
  type: "next_page" | "previous_page" | "reset_pagination" | "change_filter";
  payload?: string | FilterQueries;
}

// TODO: Type this better
const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case "next_page":
      return { ...state, page: state.page + 1, next: action.payload, previous: undefined };
    case "previous_page":
      return { ...state, page: state.page - 1, next: undefined, previous: action.payload ?? undefined };
    case "reset_pagination":
      return { page: 0, next: undefined, previous: undefined, filter: DEFAULT_FILTER };
    case "change_filter":
      return { page: 0, next: undefined, previous: undefined, filter: (action.payload as FilterQueries) ?? DEFAULT_FILTER };
    default:
      return state;
  }
};

interface CommunityRatingsProps {
  albumId?: string;
}

export const CommunityRatings: React.FC<CommunityRatingsProps> = ({ albumId }) => {
  const { userData } = useUserInfo();
  const [{ page, next, previous, filter }, dispatch] = useReducer(reducer, {
    page: 0,
    next: undefined,
    previous: undefined,
    filter: DEFAULT_FILTER,
  });

  const { data, status, isPreviousData } = useQuery<CommunityAlbumRatings>({
    queryKey: ["ratings", page, albumId, filter],
    queryFn: () => getCommunityAlbumRatings({ albumId, filter: filter, next: next ?? undefined, previous: previous ?? undefined }),
    keepPreviousData: true,
  });

  const goToPreviousStep = () => dispatch({ type: "previous_page", payload: data?.previous ?? undefined });
  const goToNextStep = () => dispatch({ type: "next_page", payload: data?.next ?? undefined });

  return (
    <>
      <DatabaseFilters
        filter={filter}
        changeFilter={(filter: string) => dispatch({ type: "change_filter", payload: filter })}
        isLoading={status !== "success"}
        disabled={data?.ratings && data?.ratings.length <= 1}
      />
      {status === "success" && data.ratings.length > 0 ? (
        <>
          <ol className="community-ratings">
            {data.ratings?.map((rating) => (
              <RatingsPost ratingPost={rating} key={`${rating._id}-${rating.liked_by_user}`} disabled={isPreviousData}>
                <>
                  {userData?.id === rating.profile.id && (
                    <RatingPostsDelete ratingId={rating._id} resetPagination={() => dispatch({ type: "reset_pagination" })} />
                  )}
                </>
              </RatingsPost>
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
