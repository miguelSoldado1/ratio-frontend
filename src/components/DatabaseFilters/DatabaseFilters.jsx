import React from "react";
import "./DatabaseFilters.css";

// TODO: Validate if the disable if single is worth keeping
export const DatabaseFilters = ({ filter, changeFilter, isLoading = false }) => {
  const handleChange = (e) => !isLoading && changeFilter(e.target.value);

  return (
    <div className="filters">
      {Object.keys(filters).map((filterKey) => {
        const filterObj = filters[filterKey];
        return (
          <button className="filter" disabled={filter === filterObj.query} key={filterObj.query} onClick={handleChange} value={filterObj.query}>
            {filterObj.label}
          </button>
        );
      })}
    </div>
  );
};

export const filters = {
  LATEST: { label: "Latest", query: "latest" },
  OLDEST: { label: "Oldest", query: "oldest" },
  TOP_RATED: { label: "Top Rated", query: "top_rated" },
};
