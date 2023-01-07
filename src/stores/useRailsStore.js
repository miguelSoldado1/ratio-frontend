import create from "zustand";
import { persist } from "zustand/middleware";
import { handleRailRequests, railNames } from "../scripts/railsHelper";

let railsStore = (set, get) => ({
  myTopArtists: {},
  latestReviews: {},
  recentlyListened: {},
  recentlyReleased: {},
  getAllRails: async (accessToken) => {
    const getter = get();
    getter.getMyTopArtists(accessToken);
    getter.getLatestReviews(accessToken);
    getter.getRecentlyListened(accessToken);
    getter.getRecentlyReleased(accessToken);
  },
  getMyTopArtists: async (accessToken) => {
    const response = await handleRailRequests(get, railNames[0], accessToken);
    if (response?.data || response?.error) {
      set({ myTopArtists: response });
    }
  },
  getLatestReviews: async (accessToken) => {
    const response = await handleRailRequests(get, railNames[1], accessToken);
    if (response?.data || response?.error) {
      set({ latestReviews: response });
    }
  },
  getRecentlyListened: async (accessToken) => {
    const response = await handleRailRequests(get, railNames[2], accessToken);
    if (response?.data || response?.error) {
      set({ recentlyListened: response });
    }
  },
  getRecentlyReleased: async (accessToken) => {
    const response = await handleRailRequests(get, railNames[3], accessToken);
    if (response?.data || response?.error) {
      set({ recentlyReleased: response });
    }
  },
});

railsStore = persist(railsStore, { name: "home_screen_rails", getStorage: () => localStorage });

export const useRailsStore = create(railsStore);
