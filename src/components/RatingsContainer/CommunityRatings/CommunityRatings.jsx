import React, { useEffect, useState } from "react";
import { getCommunityAlbumRating } from "../../../api/albumDetails";
import { ReactComponent as RightArrow } from "../../../icons/right-arrow.svg";
import { ReactComponent as LeftArrow } from "../../../icons/left-arrow.svg";
import { RatingsPosts, DatabaseFilters } from "../../.";
import "./CommunityRatings.css";

const NUMBER_OF_ITEMS_SHOWN = 6;

export const CommunityRatings = ({ albumId, numOfRatings }) => {
  const [ratings, setRatings] = useState([]);
  const [page, setPage] = useState(0);
  const [filterActive, setFilterActive] = useState();
  const maxNumOfPages = Math.ceil(numOfRatings / NUMBER_OF_ITEMS_SHOWN);

  useEffect(() => {
    const fetchData = async () => {
      if (albumId && filterActive?.query) {
        setRatings(await getCommunityAlbumRating(albumId, page, filterActive.query));
      }
    };
    fetchData();
    return setRatings([]);
  }, [albumId, page, filterActive]);

  const handleNavigation = (reference) => {
    if (reference === navigationMapping.FORWARD && maxNumOfPages > page + 1) {
      setPage(page + 1);
      return;
    }
    if (reference === navigationMapping.BACKWARDS && page > 0) {
      setPage(page - 1);
      return;
    }
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
        <LeftArrow
          className={`nav-arrow-ratings  ${page >= 1}`}
          onClick={() => handleNavigation(navigationMapping.BACKWARDS)}
        />
        <p style={{ padding: 0 }}>{page + 1}</p>
        <RightArrow
          className={`nav-arrow-ratings ${maxNumOfPages > page + 1}`}
          onClick={() => handleNavigation(navigationMapping.FORWARD)}
        />
      </div>
    </>
  );
};

const navigationMapping = {
  BACKWARDS: 0,
  FORWARD: 1,
};
