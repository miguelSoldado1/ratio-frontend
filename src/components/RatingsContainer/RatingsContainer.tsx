import { useQuery } from "@tanstack/react-query";
import { getAlbumRatings } from "@/api/albumDetails";
import { useUserInfo } from "@/hooks";
import { RatingsContainerPL } from "@/preloaders";
import { RatingCircle, CommunityRatings, NoRatingsContainer, SubmitRating } from "@/components";
import type { AlbumRatings } from "@/types";
import "./RatingsContainer.css";

interface RatingsContainerProps {
  albumId?: string;
}

export const RatingsContainer: React.FC<RatingsContainerProps> = ({ albumId }) => {
  const { userData } = useUserInfo();
  const userId = userData?.id;

  const { data, status } = useQuery<AlbumRatings>({
    queryKey: ["albumRatings", albumId, userId],
    queryFn: () => getAlbumRatings({ albumId, userId }),
    enabled: !!userId,
  });

  if (status !== "success") {
    return <RatingsContainerPL />;
  }

  return (
    <div className="ratings-container">
      <div className="ratings-circles">
        <RatingCircle value={data?.userRating ?? -1} description="Personal" />
        <RatingCircle value={data?.averageRating ?? -1} description="Community" />
      </div>
      {data?.userRating === null && <SubmitRating albumId={albumId} />}
      {data?.averageRating !== null ? <CommunityRatings albumId={albumId} /> : <NoRatingsContainer />}
    </div>
  );
};
