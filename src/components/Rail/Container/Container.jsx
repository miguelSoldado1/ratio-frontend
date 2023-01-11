import React from "react";
import { useNavigate } from "react-router-dom";
import { getArtists } from "../../../scripts/scripts";
import spotifyLogo from "../../../icons/spotify-logo.png";
import "./Container.css";

export const Container = ({ props }) => {
  const navigate = useNavigate();

  return (
    <>
      {props && props.artist && props.image && props.name && props.release_date && (
        <li className="container" onClick={() => navigate(`/album/${props.id}`)}>
          <img className="container-image" src={props.image} alt={props.name} loading="lazy" />
          <p className="container-album-name">{props.name}</p>
          <p className="container-artist-name">
            <img src={spotifyLogo} className="spotify-logo" alt="spotify logo" />
            {getArtists(props.artist)}
          </p>
        </li>
      )}
    </>
  );
};
