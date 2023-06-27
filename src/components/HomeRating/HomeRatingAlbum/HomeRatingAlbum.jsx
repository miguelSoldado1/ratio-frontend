import React from "react";
import "./HomeRatingAlbum.css";
import { Link } from "react-router-dom";

export const HomeRatingAlbum = ({ album }) => {
  return (
    <Link to={`/album/${album.id}`} className="album-container">
      <img src={album.image} alt={album.name} />
      <div className="album-text overflow-ellipsis">
        <span className="overflow-ellipsis">{album.name}</span>
        <span className="album-author overflow-ellipsis">{album.artist.map((artist) => artist.name).join(", ")}</span>
        <span className="album-release-date overflow-ellipsis">{album.releaseDate}</span>
      </div>
    </Link>
  );
};
