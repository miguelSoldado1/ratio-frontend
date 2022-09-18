import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { RatingsContainer, AlbumHeader, AlbumTrack, Rail } from "../../components";
import { AlbumTracksPL } from "../../preloaders";
import { useAlbumStore } from "../../stores";
import "./AlbumDetails.css";

export const AlbumDetails = () => {
  const [cookies, setCookies, removeCookie] = useCookies();
  const { albumId } = useParams();
  const [album, getAlbum, clearData] = useAlbumStore((state) => [state.album, state.getAlbum, state.clearData]);

  useEffect(() => {
    const accessToken = cookies.access_token;
    getAlbum(albumId, accessToken)
      .then(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(() => {
        removeCookie("access_token", { path: "/" });
      });
    return clearData();
  }, [albumId, cookies, cookies.access_token, getAlbum, clearData]);

  return (
    <>
      <div className="album-details-container">
        <div className="album-details-column left">
          <AlbumHeader />
          <ol className="album-details-tracks">
            {album?.data?.tracks ? album?.data?.tracks?.map((track, index) => <AlbumTrack key={track.id} props={track} index={index} />) : <AlbumTracksPL />}
          </ol>
        </div>
        <div className="album-details-column right">
          <RatingsContainer albumId={albumId} />
        </div>
      </div>
      {album?.relatedAlbums ? <Rail content={album.relatedAlbums} /> : null}
    </>
  );
};
