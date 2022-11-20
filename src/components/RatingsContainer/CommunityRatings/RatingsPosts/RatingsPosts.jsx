import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useRatingsStore, useUserDataStore } from "../../../../stores";
import { handleDate } from "../../../../scripts/scripts";
import { getUsersProfile, handleLikes } from "../../../../api";
import { RatingCircleV2 } from "../../../RatingCircleV2/RatingCircleV2";
import { Modal } from "../../../Modal/Modal";
import { ReactComponent as DeleteIcon } from "../../../../icons/delete-icon.svg";
import { ReactComponent as HeartIcon } from "../../../../icons/heart-icon.svg";
import avatarPlacehoder from "../../../../icons/avatar-placeholder.svg";
import "./RatingsPosts.css";

const isOverflown = (element) => {
  return element?.clientWidth < element?.scrollWidth || element?.clientHeight < element?.scrollHeight;
};

// TODO When .has() CSS selector is more widely supported replace the expanded state
export const RatingsPosts = ({ post }) => {
  const { user_id, comment, rating, createdAt, _id, likes, album_id } = post;
  const deleteRating = useRatingsStore((state) => state.deleteRating);
  const [cookies] = useCookies();
  const [profileData, setProfileData] = useState();
  const [show, setShow] = useState(false);
  const [liked, setLiked] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [expanded, setExpanded] = useState(false);
  const userData = useUserDataStore((state) => state.userData);
  const ref = useRef(null);

  useEffect(() => {
    setOverflow(isOverflown(ref.current));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (likes.findIndex((element) => element === userData.id) >= 0) setLiked(true);
        if (userData.id === user_id) return setProfileData(userData);
        setProfileData(await getUsersProfile(user_id, cookies.access_token));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user_id, cookies, cookies.access_token, userData, likes]);

  const handleDelete = () => deleteRating(_id, cookies.access_token, album_id);

  const handleLike = () => {
    try {
      handleLikes(_id, cookies.access_token, !liked);
      setLiked(!liked);
      if (liked) return setLikeCount(likeCount - 1);
      setLikeCount(likeCount + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <li className="rating-posts-container">
        <div className="rating-posts-header">
          <PostAvatar profileData={profileData} />
          <span>{handleDate(createdAt)}</span>
        </div>
        <div className="rating-posts-body">
          <div
            className={`rating-posts-content${expanded ? " expanded" : ""}`}
            ref={ref}
            onClick={() => setExpanded(!expanded)}
          >
            {comment}
          </div>
          <RatingCircleV2 value={rating} />
        </div>
        <div className="rating-posts-footer">
          <div>
            <div className={`rating-posts-button heart${liked ? " liked" : ""}`} onClick={handleLike}>
              <HeartIcon />
              {likeCount === 1 ? <span>{likeCount} Like</span> : <span>{likeCount} Likes</span>}
            </div>
            {userData.id === user_id && (
              <div className="rating-posts-button" onClick={() => setShow(true)}>
                <DeleteIcon />
                <span>Delete</span>
              </div>
            )}
          </div>
          {overflow && (
            <div className={`arrow${expanded ? " arrow-up" : " arrow-down"}`} onClick={() => setExpanded(!expanded)} />
          )}
        </div>
      </li>
      <Modal title="Deleting rating" onSave={handleDelete} onClose={() => setShow(false)} show={show}>
        <p>Are you sure you want to delete this rating?</p>
      </Modal>
    </>
  );
};

const PostAvatar = ({ profileData }) => {
  return (
    <Link className="post-avatar" to={`/profile/${profileData?.id}`} state={{ display_name: profileData?.display_name }}>
      <img className="post-avatar-img" alt="" src={profileData?.image_url ?? avatarPlacehoder} loading="lazy" />
      <p className="post-avatar-name">{profileData?.display_name}</p>
    </Link>
  );
};
