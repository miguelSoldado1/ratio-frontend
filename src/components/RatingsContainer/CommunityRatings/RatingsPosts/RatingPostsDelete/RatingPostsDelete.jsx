import React, { useState } from "react";
import { DeleteModal } from "./DeleteModal/DeleteModal";
import { deleteRating } from "../../../../../api/albumDetails";
import { ReactComponent as DeleteIcon } from "../../../../../icons/delete-icon.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const RatingPostsDelete = ({ ratingId, albumId, resetPagination }) => {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const { mutate } = useMutation({
    mutationFn: deleteRating,
    onSuccess: () => {
      resetPagination();
      queryClient.invalidateQueries(["ratings"]);
      queryClient.invalidateQueries(["personalRating"]);
      queryClient.invalidateQueries(["averageRating"]);
    },
  });

  const handleDelete = () => {
    setShow(false);
    mutate({ ratingId });
  };

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
