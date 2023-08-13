import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Modal } from "../../Modal/Modal";
import { Loading } from "../../Loading/Loading";
import { FollowListAvatar } from "./FollowListAvatar/FollowListAvatar";

const OVERRIDE_WIDTH = "17em";

export const FollowListModal = ({ show, onClose, title, queryKey, queryFn }) => {
  const { userId } = useParams();

  const { data, isInitialLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey, userId],
    queryFn: ({ pageParam = undefined }) => queryFn({ userId, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
    enabled: show,
  });

  return (
    <Modal show={show} onClose={onClose} title={title}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">
          <h2>{title}</h2>
        </div>
        <div className="avatar-modal-list" style={{ width: OVERRIDE_WIDTH }}>
          {!isInitialLoading && data?.pages ? (
            <>
              {data.pages.map((page) =>
                page.users?.map((user) => <FollowListAvatar {...user} key={`${user.profile.id} ${user.isFollowing}`} onClose={onClose} />)
              )}
              {hasNextPage && <Loading fetchNextPage={fetchNextPage} />}
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </Modal>
  );
};
