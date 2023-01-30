import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { handleLikes } from "../../../../../api";
import { ReactComponent as HeartIcon } from "../../../../../icons/heart-icon.svg";
import { LongPressButton } from "../../../../LongPressButton/LongPressButton";
import { LikesModal } from "./LikesModal/LikesModal";

const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });

export const RatingPostsLikes = ({ likes = 0, ratingId, likedByUser }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(likedByUser);
  const [show, setShow] = useState(false);
  const [cookies] = useCookies();
  const likeAddOnText = likeCount === 1 ? "Like" : "Likes";

  const handleLike = () => {
    try {
      handleLikes(ratingId, cookies.access_token, !liked);
      setLiked(!liked);
      if (liked) return setLikeCount(likeCount - 1);
      setLikeCount(likeCount + 1);
    } catch (error) {
      console.log(error);
    }
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
          {numberFormatter.format(likeCount)} {likeAddOnText}
        </span>
      </LongPressButton>
      <LikesModal show={show} onClose={() => setShow(false)} ratingId={ratingId} />
    </>
  );
};
