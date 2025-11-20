export type Muse = {
  id: string;
  label: string;
  explicitLevels: string[];
  storeEnabled?: boolean;
  category?: string;
};

export const MUSES: Muse[] = [
  {
    id: "playful_origins",
    label: "Playful Origins",
    explicitLevels: ["sfw", "nsfw"],
    storeEnabled: true,
    category: "featured",
  },
  {
    id: "midnight_melody",
    label: "Midnight Melody",
    explicitLevels: ["sfw", "soft", "nsfw"],
    storeEnabled: true,
    category: "featured",
  },
  {
    id: "internal_prototype",
    label: "Internal Prototype",
    explicitLevels: ["sfw"],
    storeEnabled: false,
    category: "internal",
  },
];
