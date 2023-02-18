import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getPostLikes } from "../../../../../../api";
import { Loading, Modal } from "../../../../..";
import { LikesAvatar } from "./LikesAvatar/LikesAvatar";
import "./LikesModal.css";

const PAGE_SIZE = 8;

const LikesModal = ({ onClose, show, ratingId }) => {
  const [{ access_token }] = useCookies();
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["likesProfiles", ratingId, access_token],
    queryFn: ({ pageParam = undefined }) => getPostLikes(ratingId, access_token, pageParam, PAGE_SIZE),
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
        <div className="likes-modal-list">
          {data?.pages.map((page) => (
            <React.Fragment key={page.cursor}>
              {page?.postLikes?.map((user) => (
                <LikesAvatar user={user} key={user.like_id} />
              ))}
            </React.Fragment>
          ))}
          {hasNextPage && <Loading loadingRef={ref} />}
        </div>
      </div>
    </Modal>
  );
};

export default LikesModal;
