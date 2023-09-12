import { useOverflow } from "@/hooks";
import { RatingCircle, LikeButton } from "@/components";
import type { FeedRating } from "@/types";
import "./PostRatingPost.css";

interface PostRatingPostProps {
  post: FeedRating;
}

export const PostRatingPost: React.FC<PostRatingPostProps> = ({ post }) => {
  const { ref, overflow, expanded, handleToggleExpanded } = useOverflow();

  return (
    <>
      <div className="post-container">
        <span className={`post-container-content${expanded ? " expanded" : ""}`} ref={ref} onClick={handleToggleExpanded}>
          {post.comment}
        </span>
        <RatingCircle value={post.rating} />
      </div>
      <div className="home-rating-footer">
        <LikeButton className="home-rating-posts-button" likes={post.likes} ratingId={post._id} likedByUser={post.liked_by_user} />
        {overflow && <div className={`arrow ${expanded ? "arrow-up" : "arrow-down"}`} onClick={handleToggleExpanded} />}
      </div>
    </>
  );
};
