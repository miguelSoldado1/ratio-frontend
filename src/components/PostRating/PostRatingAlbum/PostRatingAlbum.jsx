import React from "react";
import { Link } from "react-router-dom";
import spotifyLogo from "../../../icons/spotify-logo.png";
import "./PostRatingAlbum.css";

export const PostRatingAlbum = ({ album }) => {
  return (
    <Link to={`/album/${album.id}`} className="album-container">
      <img className="album-image" src={album.image} alt={album.name} loading="lazy" />
      <div className="album-text overflow-ellipsis">
        <span className="overflow-ellipsis">{album.name}</span>
        <span className="album-author overflow-ellipsis">
          <img src={spotifyLogo} className="spotify-logo" alt="spotify logo" />
          {album.artist.map((artist) => artist.name).join(", ")}
        </span>
      </div>
    </Link>
  );
};
