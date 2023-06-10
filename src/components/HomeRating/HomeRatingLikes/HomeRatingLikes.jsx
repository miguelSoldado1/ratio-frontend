import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLike, deleteLike } from "../../../api/albumDetails";
import { numberFormatter } from "../../../scripts/scripts";
import { ReactComponent as HeartIcon } from "../../../icons/heart-icon.svg";
import "./HomeRatingLikes.css";
import useUserInfo from "../../../hooks/useUserInfo";

export const HomeRatingLikes = ({ likes = 0, ratingId, likedByUser }) => {
  const { data: userData } = useUserInfo();
  const queryClient = useQueryClient();
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(likedByUser);

  const likeOnSuccess = ({ numberOfLikes }) => {
    queryClient.invalidateQueries(["getFollowingRatings", userData?.id]);
    setLikeCount(numberOfLikes);
  };

  const { mutate: createMutation, isLoading: isCreating } = useMutation({
    mutationFn: createLike,
    onSuccess: likeOnSuccess,
    onMutate: () => setLikeCount((currCount) => currCount + 1),
  });

  const { mutate: deleteMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteLike,
    onSuccess: likeOnSuccess,
    onMutate: () => setLikeCount((currCount) => currCount - 1),
  });

  const handleLike = () => {
    if (isCreating || isDeleting) return;
    setLiked((oldStatus) => !oldStatus);
    if (liked) return deleteMutation({ ratingId });
    return createMutation({ ratingId });
  };

  return (
    <button className={`home-rating-posts-button heart${liked ? " liked" : ""}`} onClick={handleLike}>
      <HeartIcon />
      <span>
        {numberFormatter.format(likeCount)} {likeCount === 1 ? "Like" : "Likes"}
      </span>
    </button>
  );
};
