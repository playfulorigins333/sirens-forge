// src/muses/data.ts

export type MuseProfile = {
  id: string;
  label: string;
  preview: string;
  storeEnabled?: boolean;
  category?: string;
};

export const MUSES: MuseProfile[] = [
  {
    id: "playful_origins",
    label: "Playful Origins",
    preview: "/muses/playful_origins.png",
    storeEnabled: true,
    category: "internal",
  },
  // Add more muses here later...
];
