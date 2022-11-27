import create from "zustand";
import axios from "axios";
import { filters } from "../components/DatabaseFilters/DatabaseFilters";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/albumDetails`;

const ratingsStore = (set, get) => ({
  ratings: [],
  personalRating: null,
  averageRating: null,
  numOfRatings: 0,
  page: 0,

  filterActive: {},
  // HANDLE RATINGS POSTS
  getAllRatings: async (album_id, page_number, order, page_size) => {
    const response = await axios.get(`${BACK_END_URL}/getCommunityAlbumRating`, {
      params: { album_id, page_number, order, page_size },
    });
    set({ ratings: response.data });
  },
  createRating: async (data, accessToken) => {
    const response = await axios.post(`${BACK_END_URL}/createPost`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    set({ ratings: response.data, personalRating: data.rating, page: 0, filterActive: filters.LATEST });
    get().getAverageRating(data.album_id);
  },
  deleteRating: async (ratingId, accessToken, albumId) => {
    const response = await axios.delete(`${BACK_END_URL}/deletePost`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: { album_id: albumId, _id: ratingId },
    });
    const ratings = response.data;
    const result = { ratings: ratings, personalRating: null };
    if (ratings) get().getAverageRating(albumId);
    else result.averageRating = null;
    set({ ratings: response.data, personalRating: null, page: 0, filterActive: filters.LATEST });
  },
  clearAllRatings: () => {
    set({ ratings: [], averageRating: null, personalRating: null, numOfRatings: 0, page: 0, filterActive: {} });
  },
  // HANDLE RATING VALUES
  getAverageRating: async (album_id) => {
    const averageRating = await axios.get(`${BACK_END_URL}/getAverageAlbumRating`, { params: { album_id } });
    set({ averageRating: averageRating.data.rating, numOfRatings: averageRating.data.sum });
    return averageRating.data.rating;
  },
  getPersonalRating: async (album_id, user_id) => {
    const personalRating = await axios.get(`${BACK_END_URL}/getMyAlbumRating`, { params: { album_id, user_id } });
    set({ personalRating: personalRating.data.rating });
  },
  getCircleRatings: async (album_id, user_id) => {
    const average = await get().getAverageRating(album_id);
    if (average >= 0) get().getPersonalRating(album_id, user_id);
  },
  // HANDLE PAGINATION
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  decrementPage: () => set((state) => ({ page: state.page - 1 })),
  setPage: (pageNumber) => set({ page: pageNumber }),
  // HANDLE FILTERS
  setFilterActive: (filter) => set({ filterActive: filter }),
});

export const useRatingsStore = create(ratingsStore);
