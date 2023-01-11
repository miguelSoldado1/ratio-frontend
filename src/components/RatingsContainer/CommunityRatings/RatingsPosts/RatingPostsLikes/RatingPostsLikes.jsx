import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { handleLikes } from "../../../../../api";
import { ReactComponent as HeartIcon } from "../../../../../icons/heart-icon.svg";

const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });

export const RatingPostsLikes = ({ likes, ratingId, userDataId }) => {
  const [likeCount, setLikeCount] = useState(likes.length);
  const [liked, setLiked] = useState(false);
  const [cookies] = useCookies();
  const likeAddOnText = likeCount === 1 ? "Like" : "Likes";

  useEffect(() => {
    if (likes.findIndex((element) => element === userDataId) >= 0) setLiked(true);
  }, [likes, userDataId]);

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
    <div className={`rating-posts-button heart${liked ? " liked" : ""}`} onClick={handleLike}>
      <HeartIcon />
      <span>
        {numberFormatter.format(likeCount)} {likeAddOnText}
      </span>
    </div>
  );
};
