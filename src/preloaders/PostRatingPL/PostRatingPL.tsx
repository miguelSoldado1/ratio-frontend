import "./PostRatingPL.css";

export const PostRatingPL = () => {
  return (
    <div className="rating-container">
      <div className="header-container">
        <div className="avatar-container preloader">
          <div className="post-rating-avatar-preloader gradient" />
          <div className="post-rating-name-preloader gradient" />
        </div>
        <div className="created-date-preloader gradient" />
      </div>
      <div className="album-container">
        <div className="album-image gradient" />
        <div className="album-text-preloader">
          <div className="album-name-preloader gradient" />
          <div className="album-author-preloader gradient" />
        </div>
      </div>
      <div className="post-container">
        <div className="post-lines-preloader">
          <div className="post-line-preloader w80 gradient" />
          <div className="post-line-preloader w60 gradient" />
          <div className="post-line-preloader w70 gradient" />
        </div>
        <div className="rating-circle-container-preloader gradient" />
      </div>
      <div className="home-rating-footer">
        <div className="likes-container-preloader gradient" />
      </div>
    </div>
  );
};
