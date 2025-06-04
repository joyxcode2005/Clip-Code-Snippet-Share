import { create } from "zustand";
import axios from "axios";
import { BACKEND_URL } from "../constants";


interface AuthState {
  token: string | null;
  user: any | null;
  isLoogedIn: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  isLoogedIn: !!localStorage.getItem("token"),

  login: async (token: string) => {
    localStorage.setItem("token", token);
    set({ token, isLoogedIn: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null, isLoogedIn: false });
  },

  fetchUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/user/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ user: res.data, isLoogedIn: true });
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem("token");
      set({ token: null, user: null, isLoogedIn: false });
    }
  },
}));
