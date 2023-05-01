import { ProfileRatingPL } from "../index";
import { ProfileScreenHeaderPL } from "./ProfileScreenHeaderPL/ProfileScreenHeaderPL";
import "./ProfileScreenPL.css";

export const ProfileScreenPL = () => {
  return (
    <div className="profile-screen">
      <ProfileScreenHeaderPL />
      <div className="filters" style={{ height: "3.17em" }} />
      <ol>
        {[...Array(4)].map((_, index) => (
          <ProfileRatingPL key={index} />
        ))}
      </ol>
    </div>
  );
};
