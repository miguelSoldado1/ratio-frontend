import React, { useEffect, useState } from "react";
import { getCommunityAlbumRating } from "../../../api/albumDetails";
import { ReactComponent as Arrow } from "../../../icons/arrow.svg";
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
        setRatings(await getCommunityAlbumRating(albumId, page, filterActive.query, NUMBER_OF_ITEMS_SHOWN));
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
