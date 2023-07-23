import React from "react";
import { Link } from "react-router-dom";
import "./PostRatingAlbum.css";

export const PostRatingAlbum = ({ album }) => {
  return (
    <Link to={`/album/${album.id}`} className="album-container">
      <img className="album-image" src={album.image} alt={album.name} />
      <div className="album-text overflow-ellipsis">
        <span className="overflow-ellipsis">{album.name}</span>
        <span className="album-author overflow-ellipsis">{album.artist.map((artist) => artist.name).join(", ")}</span>
      </div>
    </Link>
  );
};
