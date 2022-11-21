import { renderArtists } from "../../scripts/scripts";
import spotifyLogo from "../../icons/spotify-logo.png";
import "./AlbumHeader.css";

export const AlbumHeader = ({ data }) => {
  return (
    <div className="album-header">
      <img className="album-header-image" src={data?.image} alt={data?.name} loading="lazy" />
      <div className="album-details-details">
        <h1>
          <a href={data?.album_uri}>{data?.name}</a>
        </h1>
        <span className="album-details-line">
          <img src={spotifyLogo} className="spotify-logo" alt="spotify logo" />
          {renderArtists(data?.artist)}
        </span>
        <p className="album-details-line">
          {handleDatePrecision(data?.release_date, data?.release_date_precision)} | {data?.tracks?.length} tracks
        </p>
      </div>
    </div>
  );
};

const handleDatePrecision = (release_date, release_date_precision) => {
  const unformattedDate = new Date(release_date);
  switch (release_date_precision) {
    case date_precision.day:
      return new Intl.DateTimeFormat("EN", { year: "numeric", month: "long", day: "numeric" }).format(unformattedDate);
    case date_precision.month:
      return new Intl.DateTimeFormat("EN", { year: "numeric", month: "long" }).format(unformattedDate);
    case date_precision.year:
    default:
      return new Intl.DateTimeFormat("EN", { year: "numeric" }).format(unformattedDate);
  }
};

const date_precision = {
  day: "day",
  month: "month",
  year: "year",
};
