import "./ProfileRatingPL.css";
import "../../gradient.css";

export const ProfileRatingPL = () => {
  return (
    <div className="profile-rating">
      <div className="profile-rating-header">
        <div className="profile-rating-avatar">
          <div className="profile-rating-avatar-img gradient" />
          <div className="profile-rating-avatar-preloader-name gradient" />
        </div>
        <div className="profile-rating-header-date gradient" />
      </div>
      <div className="profile-ratings-content">
        <div className="profile-ratings-content-album">
          <div className="profile-ratings-content-album-img gradient" />
          <div className="profile-ratings-content-album-preloader-name gradient" />
          <div className="profile-ratings-content-album-preloader-artist gradient">
            <div />
          </div>
        </div>
        <div className="profile-ratings-content-rating">
          <div className="profile-ratings-content-rating-comment gradient" />
          <div />
        </div>
      </div>
    </div>
  );
};
