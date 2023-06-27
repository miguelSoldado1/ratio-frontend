import { HomeRatingAlbum } from "./HomeRatingAlbum/HomeRatingAlbum";
import { HomeRatingAvatar } from "./HomeRatingAvatar/HomeRatingAvatar";
import { HomeRatingPost } from "./HomeRatingPost/HomeRatingPost";
import { handleDate } from "../../scripts/scripts";
import "./HomeRating.css";

const HomeRating = (post) => {
  return (
    <div className="rating-container">
      <HomeRatingAvatar user={post.user}>
        <span className="created-date overflow-ellipsis">{handleDate(post.createdAt)}</span>
      </HomeRatingAvatar>
      <HomeRatingAlbum album={post.album} />
      <HomeRatingPost post={post} />
    </div>
  );
};

export default HomeRating;
