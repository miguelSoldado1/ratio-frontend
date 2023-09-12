import { PostRatingAlbum } from "./PostRatingAlbum/PostRatingAlbum";
import { PostRatingAvatar } from "./PostRatingAvatar/PostRatingAvatar";
import { PostRatingPost } from "./PostRatingPost/PostRatingPost";
import { handleDate } from "@/scripts/scripts";
import type { FeedRating } from "@/types";
import "./PostRating.css";

export const PostRating: React.FC<FeedRating> = (post) => {
  return (
    <div className="rating-container">
      <PostRatingAvatar user={post.user}>
        <span className="created-date overflow-ellipsis">{handleDate(post.createdAt)}</span>
      </PostRatingAvatar>
      <PostRatingAlbum album={post.album} />
      <PostRatingPost post={post} />
    </div>
  );
};
