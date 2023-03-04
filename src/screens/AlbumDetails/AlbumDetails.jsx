import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import useAccessToken from "../../hooks/useAccessToken";
import { AlbumHeader, AlbumTrack, Rail } from "../../components";
import { AlbumDetailsPL } from "../../preloaders";
import { getAlbum, getRelatedAlbums } from "../../api/albumDetails";
import { RatingsContainer } from "../../components/RatingsContainer/RatingsContainer";
import "./AlbumDetails.css";

export const AlbumDetails = () => {
  const [accessToken, removeAccessToken] = useAccessToken();
  const { album_id } = useParams();

  const { data: albumData, isLoading: albumLoading } = useQuery({
    queryKey: ["albums", album_id, accessToken],
    queryFn: () => getAlbum({ album_id, accessToken }),
    onSuccess: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    onError: () => removeAccessToken(),
  });

  const artist_id = albumData?.artist_id;
  const { data: relatedAlbumsData, isLoading: relatedAlbumsLoading } = useQuery({
    queryKey: ["relatedAlbums", album_id, artist_id, accessToken],
    queryFn: () => getRelatedAlbums({ album_id, artist_id, accessToken }),
    enabled: !!artist_id,
    onError: () => removeAccessToken(),
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
