import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../../hooks/useDebounce";
import { searchForAlbum } from "../../../api/navigationBar";
import useAccessToken from "../../../hooks/useAuthentication";
import { SearchResult } from "../../";
import { ReactComponent as SearchIcon } from "../../../icons/search-icon.svg";
import "./SearchBar.css";

export const SearchBar = () => {
  const { accessToken } = useAccessToken();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: () => debouncedSearchQuery.trim() && searchForAlbum({ accessToken, search_query: debouncedSearchQuery }),
    keepPreviousData: true,
  });

  return (
    <div className="search" data-backdrop="static">
      <SearchIcon className="search-icon" />
      <input
        id="search"
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

const handleMouseDown = (event) => {
  const searchElement = document.querySelector(".search");
  const searchResultElement = document?.querySelector(".search-result");
  if (searchElement && searchResultElement) {
    if (searchElement.contains(event.target)) searchResultElement.style.display = "block";
    else searchResultElement.style.display = "none";
  }
};

const handleKeyDown = (event) => {
  if (event.ctrlKey && event.key === "k") {
    event.preventDefault();
    const searchBar = document.getElementById("search");
    searchBar.focus();
  }
};
