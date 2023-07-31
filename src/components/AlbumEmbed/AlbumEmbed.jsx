import React, { useState } from "react";
import "./AlbumEmbed.css";

export const AlbumEmbed = ({ name, albumId }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div className="album-spotify-embed-container gradient">
      <iframe
        title={name}
        src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        allowFullScreen
        className={visibility ? "visible" : "hidden"}
        onLoad={() => setVisibility(true)}
      />
      {visibility}
    </div>
  );
};
