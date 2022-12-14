import React from "react";
import { useNavigate } from "react-router-dom";
import { getArtists } from "../../../../../scripts/scripts";
import "./SearchItem.css";

export const SearchItem = ({ album, clearSearchBar }) => {
  const navigate = useNavigate();
  const { image, name, artist, release_date, id } = album;

  const handleAlbumClick = () => {
    navigate(`/album/${id}`);
    clearSearchBar();
  };

  return (
    <div className="search-album-item" onClick={handleAlbumClick}>
      <img src={image} alt={name} />
      <div>
        <p className="search-album-name">
          {name} ({new Date(release_date).getFullYear()})
        </p>
        <p className="search-album-artist">{getArtists(artist)}</p>
      </div>
    </div>
  );
};
