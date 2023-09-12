import React from "react";
import { useNavigate } from "react-router-dom";
import { getArtists } from "@/scripts/scripts";
import type { Album } from "@/types";
import "./SearchItem.css";

interface SearchItemProps {
  album: Album;
  clearSearchBar: () => void;
}

export const SearchItem: React.FC<SearchItemProps> = ({ album, clearSearchBar }) => {
  const navigate = useNavigate();
  const { image, name, artist, release_date, id } = album;

  const handleAlbumClick = () => {
    navigate(`/album/${id}`);
    clearSearchBar();
  };

  return (
    <div className="search-album-item" onClick={handleAlbumClick}>
      <img src={image} alt={name} loading="lazy" />
      <div>
        <p className="search-album-name">
          {name} ({new Date(release_date).getFullYear()})
        </p>
        <p className="search-album-artist">{getArtists(artist)}</p>
      </div>
    </div>
  );
};
