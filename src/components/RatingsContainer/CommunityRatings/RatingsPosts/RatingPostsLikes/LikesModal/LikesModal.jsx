import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getPostLikes } from "../../../../../../api/albumDetails";
import { Loading, Modal } from "../../../../..";
import { LikesAvatar } from "./LikesAvatar/LikesAvatar";
import "./LikesModal.css";

const PAGE_SIZE = 8;

const LikesModal = ({ onClose, show, ratingId }) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isInitialLoading } = useInfiniteQuery({
    queryKey: ["likesProfiles", ratingId],
    queryFn: ({ pageParam = undefined }) => getPostLikes({ post_id: ratingId, cursor: pageParam, page_size: PAGE_SIZE }),
    getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
    enabled: show,
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <Modal show={show} onClose={onClose}>
      <div className="likes-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="likes-modal-title">
          <h2>Liked by</h2>
        </div>
        {isInitialLoading ? (
          <div className="likes-modal-list">
            <Loading />
          </div>
        ) : (
          <div className="likes-modal-list">
            {data?.pages.map((page) => page.postLikes.map((user) => <LikesAvatar user={user} key={user.like_id} />))}
            {hasNextPage && <Loading loadingRef={ref} />}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default LikesModal;
