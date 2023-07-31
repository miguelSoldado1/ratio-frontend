import React, { useState } from "react";
import "./AlbumEmbed.css";

export const AlbumEmbed = ({ albumId }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div className="album-spotify-embed-container gradient">
      <iframe
        title="Spotify Album Embed"
        src={`https://open.spotify.com/embed/album/${albumId}?theme=0`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        className={visibility ? "visible" : "hidden"}
        onLoad={() => setVisibility(true)}
      />
      {visibility}
    </div>
  );
};
