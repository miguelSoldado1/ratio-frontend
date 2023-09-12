import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "@/hooks";
import { getAlbum, getRelatedAlbums } from "@/api/albumDetails";
import { AlbumHeader, AlbumTrack, Rail } from "@/components";
import { AlbumHeaderPL, AlbumTracksPL } from "@/preloaders";
import { RatingsContainer } from "@/components";
import type { Album, DetailedAlbum } from "@/types";
import "./AlbumDetails.css";

export const AlbumDetails = () => {
  const { removeAccessToken } = useAccessToken();
  const { albumId } = useParams();

  const { data: albumData, status: albumStatus } = useQuery<DetailedAlbum>({
    queryKey: ["albums", albumId],
    queryFn: () => getAlbum({ albumId }),
    onError: () => removeAccessToken(),
  });

  const artist_id = albumData?.artist_id;

  const { data: relatedAlbumsData, status: relatedAlbumsStatus } = useQuery<Album[]>({
    queryKey: ["relatedAlbums", albumId, artist_id],
    queryFn: () => getRelatedAlbums({ albumId: albumId, artistId: artist_id }),
    onError: () => removeAccessToken(),
    enabled: !!artist_id,
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
      <>
        <div className="album-details-container">
          <div className="album-details-column left">
            {albumStatus !== "success" ? <AlbumHeaderPL /> : <AlbumHeader data={albumData} />}
            {albumStatus !== "success" ? (
              <AlbumTracksPL />
            ) : (
              <ol className="album-details-tracks">
                {albumData.tracks?.map((track, index) => (
                  <AlbumTrack key={track.id} track={track} index={index} />
                ))}
              </ol>
            )}
          </div>
          <div className="album-details-column right">
            <RatingsContainer albumId={albumId} />
          </div>
        </div>
        <Rail albums={relatedAlbumsData} description="Related albums" isLoading={relatedAlbumsStatus !== "success"} />
      </>
    </>
  );
};
