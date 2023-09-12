import { useNavigate } from "react-router-dom";
import { getArtists } from "@/scripts/scripts";
import spotifyLogo from "@/icons/spotify-logo.png";
import type { Album } from "@/types";
import "./Container.css";

interface ContainerProps {
  album: Album;
}

export const Container: React.FC<ContainerProps> = ({ album }) => {
  const navigate = useNavigate();

  return (
    <>
      {album && album.artist && album.image && album.name && album.release_date && (
        <li className="container" onClick={() => navigate(`/album/${album.id}`)}>
          <img className="container-image" src={album.image} alt={album.name} loading="lazy" />
          <p className="container-album-name overflow-ellipsis">{album.name}</p>
          <p className="container-artist-name overflow-ellipsis">
            <img src={spotifyLogo} className="spotify-logo" alt="spotify logo" />
            {getArtists(album.artist)}
          </p>
        </li>
      )}
    </>
  );
};
