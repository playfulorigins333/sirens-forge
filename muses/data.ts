export type Muse = {
  id: string;
  label: string;
  category: "sfw" | "nsfw" | "internal";
  storeEnabled?: boolean;
  explicitLevels: string[];
};

export const MUSES: Muse[] = [
  {
    id: "playful_origins",
    label: "Playful Origins (Default)",
    category: "internal",
    explicitLevels: ["sfw", "nsfw", "explicit"],
  },
  {
    id: "neon_myth",
    label: "Neon Myth",
    category: "sfw",
    storeEnabled: true,
    explicitLevels: ["sfw"],
  },
  {
    id: "midnight_desire",
    label: "Midnight Desire",
    category: "nsfw",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw"],
  },
  {
    id: "forbidden_empire",
    label: "Forbidden Empire",
    category: "internal",
    explicitLevels: ["sfw", "nsfw", "explicit"]
  }
];
