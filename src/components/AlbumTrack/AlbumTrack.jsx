import React from "react";
import { renderArtists } from "../../scripts/scripts";
import "./AlbumTrack.css";

export const AlbumTrack = ({ props, index }) => {
  return (
    <li className="album-track-outter" key={props.id}>
      <div className="album-track-container">
        <span className="album-track-number">{index + 1}</span>
        <div className="album-track-detail">
          <a className="album-track-name" href={props?.track_url}>
            {props?.name}
          </a>
          <div className="album-track-artist">
            {props?.explicit ? (
              <span className="explicit" title="Explicit">
                E
              </span>
            ) : null}
            <span className="album-track-artist-names">{renderArtists(props?.artists)}</span>
          </div>
        </div>
      </div>
      <span className="album-track-duration">{handleTrackDuration(props?.duration_ms)}</span>
    </li>
  );
};

const handleTrackDuration = (duration) => {
  const unformattedDuration = new Date(duration);
  const formattedDuration = unformattedDuration.toUTCString();
  const hours = unformattedDuration.getUTCHours();
  const minutes = unformattedDuration.getMinutes();

  if (hours) return hours > 9 ? formattedDuration.substring(17, 25) : formattedDuration.substring(18, 25);
  if (minutes) return minutes > 9 ? formattedDuration.substring(20, 25) : formattedDuration.substring(21, 25);
  return formattedDuration.substring(21, 25);
};
