import "./AlbumHeaderPL.css";
import "../../gradient.css";

export const AlbumHeaderPL = () => {
  return (
    <div className="album-header">
      <div className="album-header-image gradient" />
      <div className="album-details-details">
        <div className="album-details-preloader-title gradient" />
        <div className="album-details-preloader-line gradient" />
        <div className="album-details-preloader-line gradient" />
      </div>
    </div>
  );
};
