import { SearchItem } from "./SearchItem/SearchItem";
import type { Album } from "@/types";
import "./SearchResult.css";

interface SearchResultProps {
  searchResult: Album[];
  clearSearchBar: () => void;
}

export const SearchResult: React.FC<SearchResultProps> = ({ searchResult, clearSearchBar }) => {
  return (
    <div className="search-result" id="search-result">
      {searchResult.map((album) => (
        <SearchItem album={album} key={album.id} clearSearchBar={clearSearchBar} />
      ))}
    </div>
  );
};
