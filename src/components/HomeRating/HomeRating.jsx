import { RatingCircle } from "../RatingCircle/RatingCircle";
import { HomeRatingLikes } from "./HomeRatingLikes/HomeRatingLikes";
import "./HomeRating.css";

const UserAvatar = ({ user }) => {
  return (
    <div className="avatar-container">
      <img src={user.imageUrl} alt={user.displayName} />
      <a href="/">{user.displayName}</a>
    </div>
  );
};

const AlbumContainer = ({ album }) => {
  return (
    <div className="album-container">
      <img src={album.image} alt={album.name} />
      <div className="album-text overflow-ellipsis">
        <span className="overflow-ellipsis">{album.name}</span>
        <span className="album-author overflow-ellipsis">{album.artist.map((artist) => artist.name).join(", ")}</span>
        <span className="album-release-date overflow-ellipsis">{album.releaseDate}</span>
      </div>
    </div>
  );
};

const HomeRating = (post) => {
  const dateString = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="rating-container">
      <div className="header-container">
        <UserAvatar user={post.user} />
        <span className="created-date">{dateString}</span>
      </div>
      <AlbumContainer album={post.album} />
      <div className="post-container">
        <span>{post.comment}</span>
        <RatingCircle value={post.rating} />
      </div>
      <HomeRatingLikes likes={post.likes} ratingId={post._id} likedByUser={post.liked_by_user} />
    </div>
  );
};

export default HomeRating;
