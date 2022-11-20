import create from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/navigationBar`;

let userDataStore = (set, get) => ({
  userData: {},
  getUserData: async (accessToken) => {
    const { id, images } = get().userData;
    if (!id && !images) {
      const response = await axios.get(`${BACK_END_URL}/getMe`, { headers: { Authorization: `Bearer ${accessToken}` } });
      set({ userData: response.data });
    }
  },
});

userDataStore = persist(userDataStore, { name: "user_data", getStorage: () => sessionStorage });

export const useUserDataStore = create(userDataStore);
