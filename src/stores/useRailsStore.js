import create from "zustand";
import { persist } from "zustand/middleware";
import { handleRailRequests } from "../scripts/railsHelper";

const railNames = {
  myTopArtists: 0,
  latestReviews: 1,
  recentlyListened: 2,
  recentlyReleased: 3,
};

const railNamesKeys = Object.keys(railNames);

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
    const response = await handleRailRequests(get, railNamesKeys[railNames.myTopArtists], accessToken);
    if (response?.data || response?.error) {
      set({ myTopArtists: response });
    }
  },
  getLatestReviews: async (accessToken) => {
    const response = await handleRailRequests(get, railNamesKeys[railNames.latestReviews], accessToken);
    if (response?.data || response?.error) {
      set({ latestReviews: response });
    }
  },
  getRecentlyListened: async (accessToken) => {
    const response = await handleRailRequests(get, railNamesKeys[railNames.recentlyListened], accessToken);
    if (response?.data || response?.error) {
      set({ recentlyListened: response });
    }
  },
  getRecentlyReleased: async (accessToken) => {
    const response = await handleRailRequests(get, railNamesKeys[railNames.recentlyReleased], accessToken);
    if (response?.data || response?.error) {
      set({ recentlyReleased: response });
    }
  },
});

railsStore = persist(railsStore, { name: "home_screen_rails", getStorage: () => localStorage });

export const useRailsStore = create(railsStore);
