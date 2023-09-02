import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { Loading, Modal } from "@/components";
import { FollowListAvatar } from "./FollowListAvatar/FollowListAvatar";
import type { ListModal } from "@/types";
import { useAccessToken } from "@/hooks";

interface FollowListModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  queryKey: QueryKey;
  queryFn: ({ pageParam }: { pageParam?: string }) => Promise<ListModal>;
}

export const FollowListModal: React.FC<FollowListModalProps> = ({ show, onClose, title, queryKey, queryFn }) => {
  const { removeAccessToken } = useAccessToken();

  const { data, isInitialLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
    onError: () => removeAccessToken(),
    enabled: show,
  });

  return (
    <Modal show={show} onClose={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">
          <h2>{title}</h2>
        </div>
        <div className="avatar-modal-list">
          {!isInitialLoading && data?.pages ? (
            <>
              {data.pages
                .flatMap((x) => x.users)
                .map((user) => (
                  <FollowListAvatar {...user} onClose={onClose} key={`${user.profile.id} ${user.isFollowing}`} />
                ))}
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
