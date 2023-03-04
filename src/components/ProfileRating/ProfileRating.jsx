import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAverageAlbumRating, getAlbum } from "../../api/albumDetails";
import { RatingCircle } from "../RatingCircle/RatingCircle";
import { handleDate, getArtists } from "../../scripts/scripts";
import useAccessToken from "../../hooks/useAccessToken";
import { ProfileRatingPL } from "../../preloaders";
import spotifyLogo from "../../icons/spotify-logo.png";
import "./ProfileRating.css";

export const ProfileRating = ({ props }) => {
  const { album_id, createdAt, rating } = props;
  const [accessToken, removeAccessToken] = useAccessToken();

  const { data: albumData, isLoading } = useQuery({
    queryKey: ["albumData", album_id],
    queryFn: () => getAlbum({ album_id, accessToken }),
    enabled: !!album_id,
    onError: () => removeAccessToken(),
  });

  const { data: averageRatingData } = useQuery({
    queryKey: ["communityRating", album_id],
    queryFn: () => getAverageAlbumRating({ album_id }),
    enabled: !!album_id,
    onError: () => removeAccessToken(),
  });

  if (isLoading) {
    return <ProfileRatingPL />;
  }

  return (
    <Link to={`/album/${album_id}`} className="profile-rating">
      <div className="profile-rating-item">
        <img className="profile-rating-img" src={albumData.image} alt={albumData.name} loading="lazy" />
        <div className="profile-rating-text">
          <p className="profile-rating-date">{handleDate(createdAt)}</p>
          <p className="profile-rating-name">
            <span>{albumData.name}</span>
            <span className="profile-rating-release"></span>
          </p>
          <p className="profile-rating-artist">
            <img src={spotifyLogo} className="spotify-logo" alt="spotify logo" />
            {getArtists(albumData.artist)}
          </p>
        </div>
      </div>
      <div className="profile-ratings-circles">
        <RatingCircle value={rating} description={"Personal"} />
        <RatingCircle value={averageRatingData?.averageRating} description={"Community"} />
      </div>
    </Link>
  );
};
