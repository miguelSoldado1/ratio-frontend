import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { DeleteModal } from "../../../../DeleteModal/DeleteModal";
import { ReactComponent as DeleteIcon } from "../../../../../icons/delete-icon.svg";
import { useRatingsStore } from "../../../../../stores";

export const RatingPostsDelete = ({ ratingId, albumId }) => {
  const [show, setShow] = useState(false);
  const deleteRating = useRatingsStore((state) => state.deleteRating);
  const [cookies] = useCookies();

  const handleDelete = () => deleteRating(ratingId, cookies.access_token, albumId);

  return (
    <>
      <div className="rating-posts-button" onClick={() => setShow(true)}>
        <DeleteIcon />
        <span>Delete</span>
      </div>
      <DeleteModal show={show} handleDelete={handleDelete} onClose={() => setShow(false)} />
    </>
  );
};
