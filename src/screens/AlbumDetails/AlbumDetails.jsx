import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { AlbumHeader, AlbumTrack, Rail } from "../../components";
import { AlbumDetailsPL } from "../../preloaders";
import { getAlbum, getRelatedAlbums } from "../../api/albumDetails";
import { RatingsContainer } from "../../components/RatingsContainer/RatingsContainer";
import "./AlbumDetails.css";

export const AlbumDetails = () => {
  const [{ access_token }] = useCookies();
  const navigate = useNavigate();
  const { album_id } = useParams();

  const { data: albumData, isLoading: albumLoading } = useQuery({
    queryKey: ["albums", album_id, access_token],
    queryFn: () => getAlbum({ album_id, access_token }),
    onSuccess: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    onError: () => navigate("/"),
  });

  const artist_id = albumData?.artist_id;
  const { data: relatedAlbumsData, isLoading: relatedAlbumsLoading } = useQuery({
    queryKey: ["relatedAlbums", album_id, artist_id, access_token],
    queryFn: () => getRelatedAlbums({ album_id, artist_id, access_token }),
    enabled: !!artist_id,
    onError: () => navigate("/"),
  });

  if (albumLoading) {
    return <AlbumDetailsPL />;
  }

  return (
    <>
      <Helmet>
        <title>
          {albumData.artist?.map((artist) => artist?.name).join(", ")} | {albumData.name}
        </title>
      </Helmet>
      <div className="album-details-container">
        <div className="album-details-column left">
          <AlbumHeader data={albumData} />
          <ol className="album-details-tracks">
            {albumData.tracks?.map((track, index) => (
              <AlbumTrack key={track.id} props={track} index={index} />
            ))}
          </ol>
        </div>
        <div className="album-details-column right">
          <RatingsContainer albumId={album_id} />
        </div>
      </div>
      <Rail content={{ data: { data: relatedAlbumsData, description: "Related albums" }, isLoading: relatedAlbumsLoading }} />
    </>
  );
};
