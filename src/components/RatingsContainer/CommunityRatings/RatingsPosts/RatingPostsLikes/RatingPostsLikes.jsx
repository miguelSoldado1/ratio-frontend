import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { createLike, deleteLike } from "../../../../../api";
import { LongPressButton } from "../../../../LongPressButton/LongPressButton";
import LikesModal from "./LikesModal/LikesModal";
import { ReactComponent as HeartIcon } from "../../../../../icons/heart-icon.svg";

const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });

export const RatingPostsLikes = ({ likes = 0, ratingId, likedByUser }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(likedByUser);
  const [show, setShow] = useState(false);
  const [{ access_token }] = useCookies();

  const likeOnSuccess = ({ numberOfLikes }) => setLikeCount(numberOfLikes);

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
    if (liked) return deleteMutation({ ratingId, access_token });
    return createMutation({ ratingId, access_token });
  };

  return (
    <>
      <LongPressButton
        className={`rating-posts-button heart${liked ? " liked" : ""}`}
        onClick={handleLike}
        onLongPress={() => likeCount > 0 && setShow(true)}
      >
        <HeartIcon />
        <span>
          {numberFormatter.format(likeCount)} {likeCount === 1 ? "Like" : "Likes"}
        </span>
      </LongPressButton>
      <LikesModal show={show} onClose={() => setShow(false)} ratingId={ratingId} />
    </>
  );
};
