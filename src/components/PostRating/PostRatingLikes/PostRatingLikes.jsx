import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserInfo from "../../../hooks/useUserInfo";
import { createLike, deleteLike, getPostLikes } from "../../../api/albumDetails";
import { numberFormatter } from "../../../scripts/scripts";
import { LongPressButton } from "../../LongPressButton/LongPressButton";
import { FollowListModal } from "../../ProfileScreenHeader/FollowListModal/FollowListModal";
import { ReactComponent as HeartIcon } from "../../../icons/heart-icon.svg";
import "./PostRatingLikes.css";

export const PostRatingLikes = ({ likes = 0, ratingId, likedByUser, children }) => {
  const { data: userData } = useUserInfo();
  const queryClient = useQueryClient();
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(likedByUser);
  const [show, setShow] = useState(false);

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
    <div className="home-rating-footer">
      <LongPressButton
        className={`home-rating-posts-button heart${liked ? " liked" : ""}`}
        onClick={handleLike}
        onLongPress={() => likeCount > 0 && setShow(true)}
      >
        <HeartIcon />
        <span>
          {numberFormatter.format(likeCount)} {likeCount === 1 ? "Like" : "Likes"}
        </span>
      </LongPressButton>
      <FollowListModal
        show={show}
        onClose={() => setShow(false)}
        title="Likes"
        queryKey={["likesProfiles", ratingId]}
        queryFn={({ pageParam = undefined }) => getPostLikes({ post_id: ratingId, cursor: pageParam })}
      />
      {children}
    </div>
  );
};
