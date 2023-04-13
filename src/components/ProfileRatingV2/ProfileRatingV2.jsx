import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useAccessToken from "../../hooks/useAuthentication";
import { getAlbum } from "../../api/albumDetails";
import { getUserProfile } from "../../api/profileScreen";
import { handleDate, getArtists } from "../../scripts/scripts";
import { RatingCircle } from "../../components/RatingCircle/RatingCircle";
import { ProfileRatingPL } from "../../preloaders/ProfileScreenPL/ProfileRatingPL/ProfileRatingPL";
import spotifyLogo from "../../icons/spotify-logo.png";
import "./ProfileRatingV2.css";

export const ProfileRatingV2 = ({ profileRating }) => {
  const { userId } = useParams();
  const { accessToken, removeAccessToken } = useAccessToken();
  const { album_id, createdAt, rating, comment } = profileRating;

  const { data: albumData, isLoading: albumLoading } = useQuery({
    queryKey: ["albumData", album_id],
    queryFn: () => getAlbum({ album_id, accessToken }),
    enabled: !!album_id,
    onError: () => removeAccessToken(),
  });

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile({ userId }),
    onError: () => removeAccessToken(),
  });

  if (albumLoading || userLoading) return <ProfileRatingPL />;

  return (
    <Link className="profile-rating" to={`/album/${album_id}`}>
      <div className="profile-rating-header">
        <div className="profile-rating-avatar">
          <img className="profile-rating-avatar-img" src={userData?.imageUrl} alt={userData?.displayName} />
          <span className="profile-rating-avatar-name">{userData?.displayName}</span>
        </div>
        <span className="profile-rating-header-date">{handleDate(createdAt)}</span>
      </div>
      <div className="profile-ratings-content">
        <div className="profile-ratings-content-album">
          <img className="profile-ratings-content-album-img" src={albumData?.image} alt={albumData?.name} />
          <span className="profile-ratings-content-album-name">{albumData?.name}</span>
          <span className="profile-ratings-content-album-artist">
            <img src={spotifyLogo} className="spotify-logo" alt="spotify logo" />
            {getArtists(albumData.artist)}
          </span>
        </div>
        <div className="profile-ratings-content-rating">
          <span className="profile-ratings-content-rating-comment">{comment}</span>
          <RatingCircle value={rating} description="Personal" />
        </div>
      </div>
    </Link>
  );
};
