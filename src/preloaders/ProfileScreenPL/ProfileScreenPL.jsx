import { ProfileRatingPL } from "../index";
import "./ProfileScreenPL.css";

export const ProfileScreenPL = () => {
  return (
    <div className="profile-screen">
      <div style={{ height: "2.29em" }} />
      <div className="filters" style={{ height: "3.17em" }} />
      <ol>
        {[...Array(4)].map((_, index) => (
          <ProfileRatingPL key={index} />
        ))}
      </ol>
    </div>
  );
};
