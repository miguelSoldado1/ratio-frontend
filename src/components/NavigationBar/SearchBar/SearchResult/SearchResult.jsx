import React from "react";
import { SearchItem } from "./SearchItem/SearchItem";
import "./SearchResult.css";

export const SearchResult = ({ searchResult, clearSearchBar }) => {
  return (
    <div className="search-result" id="search-result">
      {searchResult.map((album) => (
        <SearchItem album={album} key={album.id} clearSearchBar={clearSearchBar} />
      ))}
    </div>
  );
};
