import { useEffect } from "react";
import { useRatingsStore } from "../../../stores";
import { RatingsPosts } from "./RatingsPosts/RatingsPosts";
import { ReactComponent as Arrow } from "../../../icons/arrow.svg";
import "./CommunityRatings.css";
import { DatabaseFilters } from "../../DatabaseFilters/DatabaseFilters";
import "./CommunityRatings.css";

const PAGE_SIZE = 6;

export const CommunityRatings = ({ albumId, numOfRatings }) => {
  const [getAllRatings, ratings] = useRatingsStore((state) => [state.getAllRatings, state.ratings]);
  const [page, incrementPage, decrementPage, setPage] = useRatingsStore((state) => [
    state.page,
    state.incrementPage,
    state.decrementPage,
    state.setPage,
  ]);
  const [filterActive, setFilterActive] = useRatingsStore((state) => [state.filterActive, state.setFilterActive]);
  const maxNumOfPages = Math.ceil(numOfRatings / PAGE_SIZE);

  useEffect(() => {
    if (albumId && page >= 0 && filterActive?.query) {
      getAllRatings(albumId, page, filterActive.query, PAGE_SIZE);
    }
  }, [albumId, page, filterActive, getAllRatings]);

  const handleNavigation = (reference) => {
    if (reference === navigationMapping.FORWARD && maxNumOfPages > page + 1) return incrementPage();
    if (reference === navigationMapping.BACKWARDS && page > 0) return decrementPage();
  };

  return (
    <>
      <DatabaseFilters
        setFilterActive={setFilterActive}
        filterActive={filterActive}
        setPage={setPage}
        numberOfRatings={numOfRatings}
      />
      <ol className="community-ratings">
        {ratings?.map((item) => (
          <RatingsPosts post={item} key={item._id} />
        ))}
      </ol>
      <div className="nav-arrow-ratings-container">
        <Arrow
          className={`nav-arrow-ratings  ${page >= 1}`}
          onClick={() => handleNavigation(navigationMapping.BACKWARDS)}
          style={{ rotate: "-90deg" }}
        />
        <p style={{ padding: 0 }}>{page + 1}</p>
        <Arrow
          className={`nav-arrow-ratings ${maxNumOfPages > page + 1}`}
          onClick={() => handleNavigation(navigationMapping.FORWARD)}
          style={{ rotate: "90deg" }}
        />
      </div>
    </>
  );
};

const navigationMapping = {
  BACKWARDS: 0,
  FORWARD: 1,
};
