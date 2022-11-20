import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AlbumHeader, AlbumTrack, Rail } from "../../components";
import { AlbumDetailsPL } from "../../preloaders";
import { getAlbum, getRelatedAlbums } from "../../api";
import { RatingsContainer } from "../../components/RatingsContainer/RatingsContainer";
import "./AlbumDetails.css";

export const AlbumDetails = () => {
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [data, setData] = useState({ album: {}, relatedAlbums: { data: [] }, loading: true });

  const updateData = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    const accessToken = cookies?.access_token;
    const fetchData = async () => {
      try {
        const album = await getAlbum(albumId, accessToken);
        const relatedAlbums = await getRelatedAlbums(albumId, album?.artist_id, accessToken);
        updateData("album", album);
        setData((prev) => ({ ...prev, relatedAlbums: { data: relatedAlbums } }));
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        navigate("/");
      }
      updateData("loading", false);
    };

    if (accessToken) {
      fetchData();
    }

    return () => setData({ album: {}, relatedAlbums: { data: [] }, loading: true });
  }, [albumId, cookies?.access_token, navigate, removeCookie]);

  if (data.loading) {
    return <AlbumDetailsPL />;
  }

  return (
    <>
      <div className="album-details-container">
        <div className="album-details-column left">
          <AlbumHeader data={data?.album} />
          <ol className="album-details-tracks">
            {data?.album?.tracks?.map((track, index) => (
              <AlbumTrack key={track.id} props={track} index={index} />
            ))}
          </ol>
        </div>
        <div className="album-details-column right">
          <RatingsContainer albumId={albumId} />
        </div>
      </div>
      {data?.relatedAlbums?.data?.length > 0 && (
        <Rail content={{ data: data?.relatedAlbums.data, description: "Related albums" }} />
      )}
    </>
  );
};
