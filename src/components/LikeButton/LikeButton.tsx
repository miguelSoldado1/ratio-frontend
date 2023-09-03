import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLike, deleteLike, getPostLikes } from "@/api/albumDetails";
import { numberFormatter } from "@/scripts/scripts";
import { LongPressButton, FollowListModal } from "@/components";
import { ReactComponent as HeartIcon } from "@/icons/heart-icon.svg";
import "./LikeButton.css";

interface LikeButtonProps {
  likes?: number;
  ratingId: string;
  likedByUser: boolean;
  className: string;
}

// Just setting this variable to make sure the keys are for sure equal
const LIKES_PROFILES = "likesProfiles";

export const LikeButton: React.FC<LikeButtonProps> = ({ likes = 0, ratingId, likedByUser, className }) => {
  const queryClient = useQueryClient();
  const [likeCount, setLikeCount] = useState<number>(likes);
  const [liked, setLiked] = useState<boolean>(likedByUser);
  const [show, setShow] = useState<boolean>(false);

  const { mutate: likeMutation, isLoading } = useMutation({
    mutationFn: liked ? deleteLike : createLike,
    onMutate: () => setLikeCount(liked ? likeCount - 1 : likeCount + 1),
    onSuccess: ({ numberOfLikes }: { numberOfLikes: number }) => setLikeCount(numberOfLikes),
  });

  const handleLike = () => {
    if (!isLoading) {
      setLiked((oldStatus) => !oldStatus);
      likeMutation({ ratingId });
    }
  };

  const handleLongPress = () => {
    queryClient.resetQueries([LIKES_PROFILES, ratingId]);
    likeCount > 0 && setShow(true);
  };

  return (
    <>
      <LongPressButton
        className={`${className} heart${liked ? " liked" : ""}`}
        onClick={handleLike}
        disabled={isLoading}
        onLongPress={handleLongPress}
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
        queryKey={[LIKES_PROFILES, ratingId]}
        queryFn={({ pageParam = undefined }) => getPostLikes({ postId: ratingId, next: pageParam })}
      />
    </>
  );
};
