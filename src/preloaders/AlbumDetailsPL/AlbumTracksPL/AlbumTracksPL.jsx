import "./AlbumTracksPL.css";

export const AlbumTracksPL = () => {
  return (
    <>
      {[...Array(11)].map((track, index) => (
        <li className="album-track-outter" key={index}>
          <div className="album-track-container">
            <div className="album-track-number-preloader gradient" />
            <div className="album-track-detail">
              <div className="album-track-name-preloader gradient" />
              <div className="album-track-artist-names-preloader gradient" />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};
