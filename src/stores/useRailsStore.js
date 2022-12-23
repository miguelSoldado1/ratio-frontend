import create from "zustand";
import { persist } from "zustand/middleware";
import { handleRailRequests } from "../scripts/railsHelper";

let railsStore = (set, get) => ({
  myTopArtists: {},
  getMyTopArtists: async (accessToken) => {
    const response = await handleRailRequests(get, "myTopArtists", accessToken);
    if (response?.data || response?.error) {
      set({ myTopArtists: response });
    }
  },

  latestReviews: {},
  getLatestReviews: async (accessToken) => {
    const response = await handleRailRequests(get, "latestReviews", accessToken);
    if (response?.data || response?.error) {
      set({ latestReviews: response });
    }
  },

  recentlyListened: {},
  getRecentlyListened: async (accessToken) => {
    const response = await handleRailRequests(get, "recentlyListened", accessToken);
    if (response?.data || response?.error) {
      set({ recentlyListened: response });
    }
  },

  recentlyReleased: {},
  getRecentlyReleased: async (accessToken) => {
    const response = await handleRailRequests(get, "recentlyReleased", accessToken);
    if (response?.data || response?.error) {
      set({ recentlyReleased: response });
    }
  },
});

railsStore = persist(railsStore, { name: "home_screen_rails", getStorage: () => localStorage });

export const useRailsStore = create(railsStore);
