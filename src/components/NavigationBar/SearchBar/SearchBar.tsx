import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { searchForAlbum } from "@/api/navigationBar";
import useAccessToken from "@/hooks/useAuthentication";
import { SearchResult } from "../..";
import { ReactComponent as SearchIcon } from "@/icons/search-icon.svg";
import "./SearchBar.css";

export const SearchBar = () => {
  const { removeAccessToken } = useAccessToken();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { data, status } = useQuery({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: () => debouncedSearchQuery.trim() && searchForAlbum({ searchQuery: debouncedSearchQuery }),
    keepPreviousData: true,
    onError: () => removeAccessToken(),
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
      {status === "success" && data?.length > 0 && <SearchResult searchResult={data} clearSearchBar={() => setSearchQuery("")} />}
    </div>
  );
};

// TODO: This looks kinda fucked, fix it
const handleMouseDown = (event: MouseEvent) => {
  const searchElement = document.querySelector(".search");
  const searchResultElement = document?.querySelector(".search-result");
  if (searchElement && searchResultElement) {
    (searchResultElement as HTMLElement).style.display = searchElement.contains(event.target as HTMLElement) ? "block" : "none";
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === "k") {
    event.preventDefault();
    const searchBar = document.getElementById("search");
    searchBar?.focus();
  }
};
