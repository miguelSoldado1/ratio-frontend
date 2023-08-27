import { Container } from "..";
import { RailPL } from "@/preloaders";
import type { Album } from "@/types";
import "./Rail.css";

interface RailProps {
  isLoading: boolean;
  albums?: Album[];
  description?: string;
}

export const Rail: React.FC<RailProps> = ({ isLoading, albums, description }) => {
  if (isLoading) return <RailPL />;

  if (albums) {
    return (
      <div className="grid-container">
        <h1 className="grid-title overflow-ellipsis">{description}</h1>
        <ul className="grid">
          {albums.map((album) => (
            <Container album={album} key={album.id} />
          ))}
        </ul>
      </div>
    );
  }

  return null;
};
