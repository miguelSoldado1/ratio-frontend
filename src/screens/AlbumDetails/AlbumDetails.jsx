import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import useAccessToken from "../../hooks/useAuthentication";
import { AlbumHeader, AlbumTrack, Rail } from "../../components";
import { AlbumDetailsPL } from "../../preloaders";
import { getAlbum, getRelatedAlbums } from "../../api/albumDetails";
import { RatingsContainer } from "../../components/RatingsContainer/RatingsContainer";
import "./AlbumDetails.css";

export const AlbumDetails = () => {
  const { removeAccessToken } = useAccessToken();
  const { albumId } = useParams();

  const { data: albumData, status: albumStatus } = useQuery({
    queryKey: ["albums", albumId],
    queryFn: () => getAlbum({ album_id: albumId }),
    onSuccess: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    onError: () => removeAccessToken(),
  });

  const artist_id = albumData?.artist_id;
  const { data: relatedAlbumsData, status: relatedAlbumsStatus } = useQuery({
    queryKey: ["relatedAlbums", albumId, artist_id],
    queryFn: () => getRelatedAlbums({ album_id: albumId, artist_id }),
    enabled: !!artist_id,
    onError: () => removeAccessToken(),
  });

  return (
    <>
      <Helmet>
        {albumStatus === "success" && (
          <title>
            {albumData.artist?.map((artist) => artist?.name).join(", ")} | {albumData.name}
          </title>
        )}
      </Helmet>
      {albumStatus !== "success" ? (
        <AlbumDetailsPL />
      ) : (
        <>
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
              <RatingsContainer albumId={albumId} />
            </div>
          </div>
          <Rail data={{ data: relatedAlbumsData, description: "Related albums" }} isLoading={relatedAlbumsStatus !== "success"} />
        </>
      )}
    </>
  );
};
