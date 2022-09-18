import React, { useEffect } from "react";
import "./DatabaseFilters.css";

export const DatabaseFilters = ({ setFilterActive, filterActive, setPage, numberOfRatings }) => {
  useEffect(() => {
    setFilterActive(filters.LATEST);
  }, [setFilterActive]);

  const handleFilters = (e) => {
    const value = e.target.innerHTML;
    if (value !== filterActive.tag) {
      switch (value) {
        case filters.LATEST.tag:
        default:
          setFilterActive(filters.LATEST);
          break;
        case filters.TOP_RATED.tag:
          setFilterActive(filters.TOP_RATED);
          break;
        case filters.OLDEST.tag:
          setFilterActive(filters.OLDEST);
          break;
      }
      setPage(0);
    }
  };

  return (
    <div className="filters">
      {Object.keys(filters).map((filter, index) => (
        <p key={index} className={`filter ${filterActive === filters[filter] ? "enabled" : "disabled"} ${numberOfRatings <= 1 ? "single" : null}`} onClick={handleFilters}>
          {filters[filter].tag}
        </p>
      ))}
    </div>
  );
};

const filters = {
  LATEST: { tag: "Latest", query: "latest" },
  OLDEST: { tag: "Oldest", query: "oldest" },
  TOP_RATED: { tag: "Top Rated", query: "top_rated" },
};
