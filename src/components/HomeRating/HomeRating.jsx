import { useState } from "react";
import { RatingCircle } from "../RatingCircle/RatingCircle";
import "./HomeRating.css";

const UserAvatar = ({ user }) => {
  return (
    <div className="avatar-container">
      <img src={user.image} alt={user.name} />
      <a href="/">{user.name}</a>
    </div>
  );
};

const LikeButton = ({ likes }) => {
  const [liked, setLiked] = useState(false);
  return (
    <button className="like-button-container" onClick={() => setLiked(!liked)}>
      <span>{likes}</span>
    </button>
  );
};

const HomeRating = ({ rating: { user, album, post } }) => {
  const dateString = post.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="rating-container">
      <div className="header-container">
        <UserAvatar user={user} />
        <span className="created-date">{dateString}</span>
      </div>
      <div className="album-container">
        <img src={album.image} alt={album.name} />
        <div className="album-text overflow-ellipsis">
          <span className="overflow-ellipsis">{album.name}</span>
          <span className="album-author overflow-ellipsis">{album.artists.join(", ")}</span>
          <span className="album-release-date overflow-ellipsis">{album.releaseDate}</span>
        </div>
      </div>
      <div className="post-container">
        <span>{post.comment}</span>
        <RatingCircle value={post.value} />
      </div>
      {/* <LikeButton likes={post.likes} /> */}
    </div>
  );
};

export default HomeRating;
