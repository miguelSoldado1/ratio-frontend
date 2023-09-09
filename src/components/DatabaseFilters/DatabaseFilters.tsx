import { FilterQueries } from "@/enums";
import "./DatabaseFilters.css";

interface DatabaseFiltersProps {
  filter: FilterQueries;
  changeFilter: (filter: FilterQueries) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const DatabaseFilters: React.FC<DatabaseFiltersProps> = ({ filter, changeFilter, isLoading = false, disabled = false }) => {
  const handleChange = (query: FilterQueries) => {
    if (!isLoading && !disabled) {
      changeFilter(query);
    }
  };

  return (
    <div className={`filters${disabled ? " disabled" : ""}`}>
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

const filters = {
  LATEST: { label: "Latest", query: FilterQueries.latest },
  OLDEST: { label: "Oldest", query: FilterQueries.oldest },
  TOP_RATED: { label: "Top Rated", query: FilterQueries.top_rated },
};
