import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getAverageAlbumRating, getAlbum } from "../../api";
import { RatingCircleV2 } from "../RatingCircleV2/RatingCircleV2";
import { handleDate, getArtists } from "../../scripts/scripts";
import spotifyLogo from "../../icons/spotify-logo.png";
import "./ProfileRating.css";
import { ProfileRatingPL } from "../../preloaders";

export const ProfileRating = ({ props }) => {
  const [cookies, setCookies, removeCookie] = useCookies();
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
  }, [props.album_id, cookies, cookies.access_token]);

  const handleAlbumClick = () => {
    navigate(`/album/${props.album_id}`);
  };

  if (props && props?.createdAt && props?.rating >= 0 && albumData?.image && albumData?.name && albumData?.release_date && albumData?.artist && communityRating >= 0)
    return (
      <li className="profile-rating" onClick={handleAlbumClick}>
        <div className="profile-rating-item">
          <img className="profile-rating-img" src={albumData.image} alt="" />
          <div className="profile-rating-text">
            <p className="profile-rating-date">{handleDate(props.createdAt)}</p>
            <p className="profile-rating-name">
              <span>{albumData.name}</span>
              <span className="profile-rating-release"> ({moment(albumData.release_date).year()})</span>
            </p>
            <p className="profile-rating-artist">
              <img src={spotifyLogo} className="spotify-logo" alt="" />
              {getArtists(albumData.artist)}
            </p>
          </div>
        </div>
        <div className="profile-ratings-circles">
          <RatingCircleV2 value={props.rating} description={"Personal"} />
          <RatingCircleV2 value={communityRating} description={"Community"} />
        </div>
      </li>
    );
  return <ProfileRatingPL />;
};
