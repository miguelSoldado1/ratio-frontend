import { ProfileRatingPL } from "../index";
import "./ProfileScreenPL.css";

export const ProfileScreenPL = () => {
  return (
    <div>
      <span className="profile-rating-preloader-text">This user has no ratings yet...</span>
      <ProfileRatingPL />
      <ProfileRatingPL />
      <ProfileRatingPL />
    </div>
  );
};
