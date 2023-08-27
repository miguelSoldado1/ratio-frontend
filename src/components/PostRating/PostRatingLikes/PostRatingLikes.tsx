import React, { ReactNode, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createLike, deleteLike, getPostLikes } from "@/api/albumDetails";
import { numberFormatter } from "@/scripts/scripts";
import { FollowListModal, LongPressButton } from "@/components";
import { ReactComponent as HeartIcon } from "@/icons/heart-icon.svg";
import "./PostRatingLikes.css";

interface PostRatingLikesProps {
  likes?: number;
  ratingId: string;
  likedByUser: boolean;
  children: JSX.Element | ReactNode;
}

export const PostRatingLikes: React.FC<PostRatingLikesProps> = ({ likes = 0, ratingId, likedByUser, children }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(likedByUser);
  const [show, setShow] = useState(false);

  const likeOnSuccess = ({ numberOfLikes }: { numberOfLikes: number }) => {
    setLikeCount(numberOfLikes);
  };

  const { mutate: likeMutation, isLoading } = useMutation({
    mutationFn: liked ? deleteLike : createLike,
    onMutate: () => setLikeCount(liked ? likeCount - 1 : likeCount + 1),
    onSuccess: likeOnSuccess,
  });

  const handleLike = () => {
    if (!isLoading) {
      setLiked((oldStatus) => !oldStatus);
      likeMutation({ ratingId });
    }
  };

  return (
    <div className="home-rating-footer">
      <LongPressButton
        className={`home-rating-posts-button heart${liked ? " liked" : ""}`}
        onClick={handleLike}
        disabled={isLoading}
        onLongPress={() => likeCount > 0 && setShow(true)}
      >
        <>
          <HeartIcon />
          <span>
            {numberFormatter.format(likeCount)} {likeCount === 1 ? "Like" : "Likes"}
          </span>
        </>
      </LongPressButton>
      <FollowListModal
        show={show}
        onClose={() => setShow(false)}
        title="Likes"
        queryKey={["likesProfiles", ratingId]}
        queryFn={({ pageParam = undefined }) => getPostLikes({ postId: ratingId, next: pageParam })}
      />
      {children}
    </div>
  );
};
