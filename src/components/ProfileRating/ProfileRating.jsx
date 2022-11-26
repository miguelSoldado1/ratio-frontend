import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getAverageAlbumRating, getAlbum } from "../../api";
import { RatingCircle } from "../RatingCircle/RatingCircle";
import { handleDate, getArtists } from "../../scripts/scripts";
import spotifyLogo from "../../icons/spotify-logo.png";
import "./ProfileRating.css";
import { ProfileRatingPL } from "../../preloaders";

export const ProfileRating = ({ props }) => {
  const [cookies, , removeCookie] = useCookies();
  const [albumData, setAlbumData] = useState({});
  const [communityRating, setCommunityRating] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumId = props.album_id;
        setAlbumData(await getAlbum(albumId, cookies?.access_token));
        const { rating } = await getAverageAlbumRating(albumId);
        setCommunityRating(rating);
      } catch (error) {
        removeCookie("access_token", { path: "/" });
      }
    };
    fetchData();
  }, [props.album_id, cookies, cookies.access_token, removeCookie]);

  const handleAlbumClick = () => {
    navigate(`/album/${props.album_id}`);
  };

  if (
    props?.createdAt &&
    props?.rating >= 0 &&
    albumData?.image &&
    albumData?.name &&
    albumData?.release_date &&
    albumData?.artist &&
    communityRating >= 0
  )
    return (
      <li className="profile-rating" onClick={handleAlbumClick}>
        <div className="profile-rating-item">
          <img className="profile-rating-img" src={albumData.image} alt={albumData.name} loading="lazy" />
          <div className="profile-rating-text">
            <p className="profile-rating-date">{handleDate(props.createdAt)}</p>
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
          <RatingCircle value={props.rating} description={"Personal"} />
          <RatingCircle value={communityRating} description={"Community"} />
        </div>
      </li>
    );
  return <ProfileRatingPL />;
};
