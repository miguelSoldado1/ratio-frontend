import "./DatabaseFilters.css";

interface DatabaseFiltersProps {
  filter: FilterQueries;
  changeFilter: (filter: FilterQueries) => void;
  isLoading?: boolean;
}

// TODO: Validate if the disable if single is worth keeping
export const DatabaseFilters: React.FC<DatabaseFiltersProps> = ({ filter, changeFilter, isLoading = false }) => {
  const handleChange = (query: FilterQueries) => !isLoading && changeFilter(query);

  return (
    <div className="filters">
      {Object.keys(filters).map((filterKey) => {
        const filterObj = filters[filterKey as keyof typeof filters];
        return (
          <button className="filter" disabled={filter === filterObj.query} key={filterObj.query} onClick={() => handleChange(filterObj.query)}>
            {filterObj.label}
          </button>
        );
      })}
    </div>
  );
};

export enum FilterQueries {
  latest = "latest",
  oldest = "oldest",
  top_rated = "top_rated",
}

export const filters = {
  LATEST: { label: "Latest", query: FilterQueries.latest },
  OLDEST: { label: "Oldest", query: FilterQueries.oldest },
  TOP_RATED: { label: "Top Rated", query: FilterQueries.top_rated },
};
