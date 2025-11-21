import { create } from "zustand";
import { MUSES } from "@/app/data/muses";

export const useMuseStore = create((set) => ({
  selectedMuse: null,
  muses: MUSES,
  setSelectedMuse: (muse) => set({ selectedMuse: muse }),
  clearSelectedMuse: () => set({ selectedMuse: null })
}));
