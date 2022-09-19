import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ReactComponent as SearchIcon } from "../../../icons/search-icon.svg";
import { SearchResult } from "../../";
import "./SearchBar.css";

export const SearchBar = () => {
  const [cookies] = useCookies();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery !== "" && cookies && cookies.access_token)
        axios
          .get(`${process.env.REACT_APP_BACK_END_URL}/navigationBar/searchForAlbum?search_query=${searchQuery}`, {
            headers: { Authorization: "Bearer " + cookies.access_token },
          })
          .then((res) => setSearchResult(res.data));
    }, 200);

    if (searchQuery === "") {
      setSearchResult([]);
    }

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchQuery, cookies, cookies.access_token]);

  const clearSearchBar = () => {
    setSearchQuery("");
  };

  return (
    <div className="search">
      <SearchIcon className="search-icon" />
      <input type="search" className="search-input" autoComplete="off" placeholder="Search for Album..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      {searchResult.length > 0 && <SearchResult searchResult={searchResult} clearSearchBar={clearSearchBar} />}
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
