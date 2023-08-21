import React from "react";
import "./DatabaseFilters.css";

export const DatabaseFilters = ({ setFilterActive, filterActive, resetPagination, numberOfRatings = 2 }) => {
  const handleFilters = (e) => {
    const value = e.target.innerHTML;
    if (value === filterActive.tag) return;

    const newFilter = Object.values(filters).find((filter) => filter.tag === value);

    setFilterActive(newFilter || filters.LATEST);
    resetPagination();
  };

  return (
    <div className="filters">
      {Object.keys(filters).map((filter) => (
        <button
          disabled={numberOfRatings <= 1}
          key={filters[filter].query}
          className={`filter ${filterActive.query === filters[filter].query ? "enabled" : "disabled"} ${numberOfRatings <= 1 ? "single" : ""}`}
          onClick={handleFilters}
        >
          {filters[filter].tag}
        </button>
      ))}
    </div>
  );
};

export const filters = {
  LATEST: { tag: "Latest", query: "latest" },
  OLDEST: { tag: "Oldest", query: "oldest" },
  TOP_RATED: { tag: "Top Rated", query: "top_rated" },
};
