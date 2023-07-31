import React from "react";
import { AlbumHeaderPL, AlbumTracksPL, RailPL, RatingsContainerPL } from "../";

export const AlbumDetailsPL = () => {
  return (
    <>
      <div className="album-spotify-embed-container gradient" />
      <div className="album-details-container">
        <div className="album-details-column left">
          <AlbumHeaderPL />
          <AlbumTracksPL />
        </div>
        <div className="album-details-column right">
          <RatingsContainerPL />
        </div>
      </div>
      <RailPL />
    </>
  );
};
