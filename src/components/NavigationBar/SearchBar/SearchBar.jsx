import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../../hooks/useDebounce";
import { searchForAlbum } from "../../../api/navigationBar";
import { ReactComponent as SearchIcon } from "../../../icons/search-icon.svg";
import { SearchResult } from "../../";
import "./SearchBar.css";

export const SearchBar = () => {
  const [{ access_token }] = useCookies();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: () => debouncedSearchQuery.trim() && searchForAlbum({ access_token, search_query: debouncedSearchQuery }),
  });

  return (
    <div className="search">
      <SearchIcon className="search-icon" />
      <input
        type="search"
        className="search-input"
        autoComplete="off"
        placeholder="Search for Album..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {!isLoading && data.length > 0 && <SearchResult searchResult={data} clearSearchBar={() => setSearchQuery("")} />}
    </div>
  );
};

document.addEventListener("mousedown", (event) => {
  const searchElement = document.querySelector(".search");
  const searchResultElement = document?.querySelector(".search-result");
  if (searchElement && searchResultElement) {
    if (searchElement.contains(event.target)) searchResultElement.style.display = "block";
    else searchResultElement.style.display = "none";
  }
});
