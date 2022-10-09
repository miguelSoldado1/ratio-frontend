import "./ProfileRatingPL.css";
import "../../gradient.css";

export const ProfileRatingPL = () => {
  return (
    <div className="profile-rating">
      <div className="profile-rating-item">
        <div className="profile-rating-img gradient" />
        <div className="profile-rating-text">
          <div className="profile-rating-preloader-date gradient" />
          <div className="profile-rating-preloader-album gradient" />
          <div className="profile-rating-preloader-artist gradient" />
        </div>
      </div>
    </div>
  );
};
