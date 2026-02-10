import { create } from "zustand";
import type { MuseProfile } from "@/muses/data";

type MuseStore = {
  unlocked: string[]; // array of muse IDs
  unlockMuse: (id: string) => void;
  setUnlocked: (ids: string[]) => void;
};

export const useMuseStore = create<MuseStore>((set) => ({
  unlocked: [],

  unlockMuse: (id) =>
    set((state) => ({
      unlocked: state.unlocked.includes(id)
        ? state.unlocked
        : [...state.unlocked, id],
    })),

  setUnlocked: (ids) => set({ unlocked: ids }),
}));
