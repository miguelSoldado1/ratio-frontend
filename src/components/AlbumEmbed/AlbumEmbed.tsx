import { useState } from "react";
import "./AlbumEmbed.css";

interface AlbumEmbedProps {
  albumId: string;
}

export const AlbumEmbed: React.FC<AlbumEmbedProps> = ({ albumId }) => {
  const [visibility, setVisibility] = useState<boolean>(false);

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
