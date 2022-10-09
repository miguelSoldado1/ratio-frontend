import React from "react";
import { AlbumHeaderPL, AlbumTracksPL, RailPL } from "../";

export const AlbumDetailsPL = () => {
  return (
    <>
      <div className="album-details-container">
        <div className="album-details-column left">
          <AlbumHeaderPL />
          <AlbumTracksPL />
        </div>
        <div className="album-details-column right">{/* Missing ratings container preloader */}</div>
      </div>
      <RailPL />
    </>
  );
};
