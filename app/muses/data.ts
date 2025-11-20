export type MuseProfile = {
  id: string;
  label: string;
  preview: string;
  description: string;
  category: "female" | "male" | "internal";
  storeEnabled: boolean;
  explicitLevels: ("sfw" | "nsfw" | "ultra")[];
};

/**
 * 🚀 Sirens Forge Launch Muse Manifest
 * This is the official source of truth for the entire system:
 * - Muse Forge
 * - Muse Store
 * - Image Generator
 * - Video Generator
 * - API payloads
 */
export const MUSES: MuseProfile[] = [
  // ---------------------------------------------------
  // INTERNAL MUSE (Not sold, default system muse)
  // ---------------------------------------------------
  {
    id: "playful_origins",
    label: "Playful Origins",
    preview: "/muses/playful_origins.png",
    description:
      "Auburn hair, green eyes, voluptuous curves, and editorial realism. The signature Sirens Forge muse.",
    category: "internal",
    storeEnabled: false,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },

  // ---------------------------------------------------
  // FEMALE MUSES (5)
  // ---------------------------------------------------
  {
    id: "aitana_lopez",
    label: "Aitana Lopez",
    preview: "/muses/aitana_lopez.png",
    description:
      "Athletic pink aesthetic with a confident, radiant digital persona.",
    category: "female",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },
  {
    id: "lil_miquela",
    label: "Lil Miquela",
    preview: "/muses/lil_miquela.png",
    description:
      "Futuristic fashion icon with crossover editorial and influencer vibes.",
    category: "female",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw"], // No ultra explicit
  },
  {
    id: "emily_pellegrini",
    label: "Emily Pellegrini",
    preview: "/muses/emily_pellegrini.png",
    description:
      "Curvy OF-style realism muse with striking photoreal energy.",
    category: "female",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },
  {
    id: "kenza_layli",
    label: "Kenza Layli",
    preview: "/muses/kenza_layli.png",
    description:
      "Elegant Moroccan-fusion muse with warm undertones and regal poise.",
    category: "female",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw"],
  },
  {
    id: "bella_blonde",
    label: "Bella Blonde",
    preview: "/muses/bella_blonde.png",
    description:
      "Playful neon-energy muse with glowing blonde hair and hyperreal vibrance.",
    category: "female",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },

  // ---------------------------------------------------
  // MALE MUSES (5)
  // ---------------------------------------------------
  {
    id: "liam_nikuro",
    label: "Liam Nikuro",
    preview: "/muses/liam_nikuro.png",
    description:
      "Japanese-American muse with sleek aesthetics and moody editorial tone.",
    category: "male",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw"],
  },
  {
    id: "knox_frost",
    label: "Knox Frost",
    preview: "/muses/knox_frost.png",
    description:
      "Confident fitness-driven muse with bold masculine realism.",
    category: "male",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },
  {
    id: "koffi_gram",
    label: "Koffi Gram",
    preview: "/muses/koffi_gram.png",
    description:
      "Introspective and fashion-forward muse with rich emotional depth.",
    category: "male",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw"],
  },
  {
    id: "fn_meka",
    label: "FN Meka",
    preview: "/muses/fn_meka.png",
    description:
      "Dynamic neon-lit futuristic muse with a virtual streetwear aesthetic.",
    category: "male",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw"],
  },
  {
    id: "hairy_ai_guys",
    label: "Hairy AI Guys",
    preview: "/muses/hairy_ai_guys.png",
    description:
      "Niche NSFW realism pack focused on body hair, rugged masculinity, and authenticity.",
    category: "male",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },
];
