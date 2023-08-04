import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostLikes } from "../../../../../../api/albumDetails";
import { Loading, Modal } from "../../../../..";
import { LikesAvatar } from "./LikesAvatar/LikesAvatar";
import "./LikesModal.css";

const PAGE_SIZE = 8;

export const LikesModal = ({ onClose, show, ratingId }) => {
  const { data, fetchNextPage, hasNextPage, isInitialLoading } = useInfiniteQuery({
    queryKey: ["likesProfiles", ratingId],
    queryFn: ({ pageParam = undefined }) => getPostLikes({ post_id: ratingId, cursor: pageParam, page_size: PAGE_SIZE }),
    getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
    enabled: show,
  });

  return (
    <Modal show={show} onClose={onClose} title="Liked by">
      <div className="likes-modal-list">
        {!isInitialLoading ? (
          <>
            {data?.pages.map((page) => page.postLikes.map((user) => <LikesAvatar user={user} key={user.like_id} />))}
            {hasNextPage && <Loading fetchNextPage={fetchNextPage} />}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </Modal>
  );
};
