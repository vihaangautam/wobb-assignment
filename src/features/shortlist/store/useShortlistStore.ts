import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Platform } from "@/types";

export interface ShortlistedProfile {
  username: string;
  fullName: string;
  platform: Platform;
  avatarUrl: string;
  followers: number;
  isVerified: boolean;
}

interface ShortlistState {
  profiles: ShortlistedProfile[];
  addProfile: (profile: ShortlistedProfile) => void;
  removeProfile: (username: string) => void;
  isShortlisted: (username: string) => boolean;
  clearAll: () => void;
}

export const useShortlistStore = create<ShortlistState>()(
  persist(
    (set, get) => ({
      profiles: [],

      addProfile: (profile) =>
        set((state) =>
          state.profiles.some((p) => p.username === profile.username)
            ? state
            : { profiles: [...state.profiles, profile] }
        ),

      removeProfile: (username) =>
        set((state) => ({
          profiles: state.profiles.filter((p) => p.username !== username),
        })),

      isShortlisted: (username) =>
        get().profiles.some((p) => p.username === username),

      clearAll: () => set({ profiles: [] }),
    }),
    {
      name: "wobb-shortlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
