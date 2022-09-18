import React from "react";
import moment from "moment";
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
      <span className="album-track-duration">{moment.utc(props?.duration_ms).customFormatDuration()}</span>
    </li>
  );
};

// probably a better way to do this but couldn't find any
// if needed elsewhere move from this component but for now it's safe to stay
moment.prototype.customFormatDuration = function () {
  return this.hours() ? this.format("H:mm:ss") : this.format("m:ss");
};
