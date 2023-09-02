import { useQuery } from "@tanstack/react-query";
import { useUserInfo } from "@/hooks";
import { RatingsContainerPL } from "@/preloaders";
import { RatingCircle, CommunityRatings, NoRatingsContainer, SubmitRating } from "@/components";
import { getAverageAlbumRating, getPersonalRating } from "@/api/albumDetails";
import "./RatingsContainer.css";

interface RatingsContainerProps {
  albumId?: string;
}

export const RatingsContainer: React.FC<RatingsContainerProps> = ({ albumId }) => {
  const { userData } = useUserInfo();
  const userId = userData?.id;

  const { data: averageData, status: averageStatus } = useQuery({
    queryKey: ["averageRating", albumId],
    queryFn: () => getAverageAlbumRating({ albumId }),
  });

  const { data: personalRating, status: personalStatus } = useQuery({
    queryKey: ["personalRating", albumId, userId],
    queryFn: () => getPersonalRating({ albumId, userId }),
  });

  if (averageStatus !== "success" || personalStatus !== "success") {
    return <RatingsContainerPL />;
  }

  const averageRating = averageData?.averageRating;

  return (
    <div className="ratings-container">
      <div className="ratings-circles">
        <RatingCircle value={personalRating ?? -1} description="Personal" />
        <RatingCircle value={averageRating ?? -1} description="Community" />
      </div>
      {personalRating === null && <SubmitRating albumId={albumId} />}
      {averageRating !== null ? <CommunityRatings albumId={albumId} /> : <NoRatingsContainer />}
    </div>
  );
};
