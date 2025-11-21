import { create } from "zustand";

import { MUSES } from "@/app/data/muses";

export interface Muse {
  id: number;
  name: string;
  slug: string;
  loraKey: string;
  vaultKey: string;
  archetype: string;
  personality: any;
  camera: any;
  modules: any;
  previewImages: any[];
}

interface MuseState {
  selectedMuse: Muse | null;
  muses: Muse[];
  setSelectedMuse: (muse: Muse) => void;
  clearSelectedMuse: () => void;
}

export const useMuseStore = create<MuseState>((set) => ({
  selectedMuse: null,
  muses: MUSES,
  setSelectedMuse: (muse) => set({ selectedMuse: muse }),
  clearSelectedMuse: () => set({ selectedMuse: null })
}));
