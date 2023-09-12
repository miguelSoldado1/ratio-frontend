import { renderArtists } from "@/scripts/scripts";
import { Track } from "@/types";
import "./AlbumTrack.css";

interface AlbumTrackProps {
  track: Track;
  index: number;
}

export const AlbumTrack: React.FC<AlbumTrackProps> = ({ track, index }) => {
  return (
    <li className="album-track-outter" key={track.id}>
      <div className="album-track-container">
        <span className="album-track-number">{index + 1}</span>
        <div className="album-track-detail">
          <a className="album-track-name overflow-ellipsis" href={track?.track_url}>
            {track?.name}
          </a>
          <div className="album-track-artist">
            {track?.explicit && (
              <span className="explicit" title="Explicit">
                E
              </span>
            )}
            <span className="album-track-artist-names overflow-ellipsis">{renderArtists(track?.artists)}</span>
          </div>
        </div>
      </div>
      <span className="album-track-duration">{handleTrackDuration(track?.duration_ms)}</span>
    </li>
  );
};

const handleTrackDuration = (duration: number) => {
  const unformattedDuration = new Date(duration);
  const formattedDuration = unformattedDuration.toUTCString();
  const hours = unformattedDuration.getUTCHours();
  const minutes = unformattedDuration.getMinutes();

  if (hours) return hours > 9 ? formattedDuration.substring(17, 25) : formattedDuration.substring(18, 25);
  if (minutes) return minutes > 9 ? formattedDuration.substring(20, 25) : formattedDuration.substring(21, 25);
  return formattedDuration.substring(21, 25);
};
