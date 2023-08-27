import { handleDate } from "@/scripts/scripts";
import { useOverflow } from "@/hooks";
import { RatingCircle } from "@/components";
import { RatingPostsLikes } from "./RatingPostsLikes/RatingPostsLikes";
import { RatingPostsAvatar } from "./RatingPostsAvatar/RatingPostsAvatar";
import type { AlbumRating } from "@/types";
import "./RatingsPosts.css";

interface RatingsPostsProps {
  ratingPost: AlbumRating;
  children?: JSX.Element;
}

export const RatingsPosts: React.FC<RatingsPostsProps> = ({ ratingPost, children }) => {
  const { comment, rating, createdAt, _id, likes, liked_by_user } = ratingPost;
  const { ref, overflow, expanded, handleToggleExpanded } = useOverflow();

  return (
    <li className="rating-posts-container">
      <div className="rating-posts-header">
        <RatingPostsAvatar profile={ratingPost.profile} />
        <span>{handleDate(createdAt)}</span>
      </div>
      <div className="rating-posts-body">
        <div className={`rating-posts-content${expanded ? " expanded" : ""}`} ref={ref} onClick={handleToggleExpanded}>
          {comment}
        </div>
        <RatingCircle value={rating} />
      </div>
      <div className="rating-posts-footer">
        <div>
          <RatingPostsLikes likes={likes} ratingId={_id} likedByUser={liked_by_user} />
          {children}
        </div>
        {overflow && <div className={`arrow ${expanded ? "arrow-up" : "arrow-down"}`} onClick={handleToggleExpanded} />}
      </div>
    </li>
  );
};
