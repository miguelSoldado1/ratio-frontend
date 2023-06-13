import { HomeRatingLikes } from "./HomeRatingLikes/HomeRatingLikes";
import { HomeRatingAlbum } from "./HomeRatingAlbum/HomeRatingAlbum";
import { HomeRatingAvatar } from "./HomeRatingAvatar/HomeRatingAvatar";
import { HomeRatingPost } from "./HomeRatingPost/HomeRatingPost";
import { handleDate } from "../../scripts/scripts";
import "./HomeRating.css";

const HomeRating = (post) => {
  return (
    <div className="rating-container">
      <HomeRatingAvatar user={post.user}>
        <span className="created-date">{handleDate(post.createdAt)}</span>
      </HomeRatingAvatar>
      <HomeRatingAlbum album={post.album} />
      <HomeRatingPost post={post} />
      <HomeRatingLikes likes={post.likes} ratingId={post._id} likedByUser={post.liked_by_user} />
    </div>
  );
};

export default HomeRating;
