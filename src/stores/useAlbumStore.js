import create from "zustand";
import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/albumDetails`;

let albumStore = (set, get) => ({
  album: {},
  getAlbum: async (albumId, accessToken) => {
    const response = await axios.get(`${BACK_END_URL}/getAlbum?album_id=${albumId}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    set({ album: { data: response.data } });
    get().getRelatedAlbums(accessToken);
  },
  getRelatedAlbums: async (accessToken) => {
    const album = get().album;
    const { id, artist_id } = album.data;
    const response = await axios.get(`${BACK_END_URL}/getRelatedAlbums?artist_id=${artist_id}&&album_id=${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (response.data.length > 0) {
      return set({ album: { ...album, relatedAlbums: { data: response.data, description: "Related albums" } } });
    }
    return set({ album: { ...album, relatedAlbums: { error: "no data" } } });
  },
  clearData: () => {
    set({ album: {} });
  },
});

export const useAlbumStore = create(albumStore);
