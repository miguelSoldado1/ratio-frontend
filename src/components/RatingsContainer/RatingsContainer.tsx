import { useQuery } from "@tanstack/react-query";
import { SubmitRating } from "..";
import { RatingsContainerPL } from "../../preloaders";
import { RatingCircle } from "../RatingCircle/RatingCircle";
import { CommunityRatings } from "./CommunityRatings/CommunityRatings";
import { NoRatingsContainer } from "./NoRatingsContainer/NoRatingsContainer";
import { getAverageAlbumRating, getPersonalRating } from "../../api/albumDetails";
import useUserInfo from "../../hooks/useUserInfo";
import "./RatingsContainer.css";

interface RatingsContainerProps {
  albumId?: string;
}

export const RatingsContainer: React.FC<RatingsContainerProps> = ({ albumId }) => {
  const { data: userData } = useUserInfo();
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
        <RatingCircle value={personalRating} description="Personal" />
        <RatingCircle value={averageRating} description="Community" />
      </div>
      {personalRating === null && <SubmitRating albumId={albumId} />}
      {averageRating !== null ? <CommunityRatings albumId={albumId} /> : <NoRatingsContainer />}
    </div>
  );
};
