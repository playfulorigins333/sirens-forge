import type { StaticImageData } from "next/image";

export type ExplicitLevel = "sfw" | "nsfw" | "ultra";

export type MuseProfile = {
  id: string;
  label: string;
  category: "female" | "male";
  platform: string;
  estRevenue: string;
  description: string;
  traits: string;
  baseLoras: string[];
  preview: string; // path under /public, e.g. /muses/aitana.png
  storeEnabled: boolean;
  explicitLevels: ExplicitLevel[];
};

export const MUSES: MuseProfile[] = [
  // 🌸 FEMALE MUSES
  {
    id: "aitana_lopez",
    label: "Aitana Lopez",
    category: "female",
    platform: "Fanvue · Instagram",
    estRevenue: "$15K–$20K / mo",
    description:
      "Spanish-inspired fitness muse with ultra-realistic physique and lifestyle vibes. Perfect for SFW→NSFW vault transitions.",
    traits:
      "Gym-fit, pink aesthetic, approachable but high-performance; seamless blend of safe and spicy content.",
    baseLoras: [
      "Woman033 NSFW Photorealistic LoRA (SDXL/SD1.5)",
      "MajicMIX Realistic Checkpoint"
    ],
    preview: "/muses/aitana_lopez.png",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },
  {
    id: "lil_miquela",
    label: "Lil Miquela",
    category: "female",
    platform: "Instagram · Brand Collabs",
    estRevenue: "$10K–$18K / mo",
    description:
      "Virtual fashion icon with activist edge and strong emotional expression.",
    traits:
      "High-fashion poses, mixed-ethnicity looks, expressive face for emotional story sets and branded campaigns.",
    baseLoras: [
      "Woman877 Photorealistic Character LoRA",
      "MajicMIX Realistic Checkpoint"
    ],
    preview: "/muses/lil_miquela.png",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },
  {
    id: "emily_pellegrini",
    label: "Emily Pellegrini",
    category: "female",
    platform: "OnlyFans · Fanvue",
    estRevenue: "$12K–$16K / mo",
    description:
      "Curvy photorealistic brunette focused on custom requests and body-positive arcs.",
    traits:
      "Soft curves, lingerie-focused, ultra-consistent SFW-to-NSFW body framing.",
    baseLoras: [
      "Woman877 Photorealistic Character LoRA",
      "Woman033 NSFW Photorealistic LoRA"
    ],
    preview: "/muses/emily_pellegrini.png",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },
  {
    id: "kenza_layli",
    label: "Kenza Layli",
    category: "female",
    platform: "Instagram · Fanvue",
    estRevenue: "$8K–$14K / mo",
    description:
      "Elegant Moroccan-inspired digital muse with cultural fusion aesthetics.",
    traits:
      "Hijab-optional looks, rich textiles, global fashion styling for wide demographic appeal.",
    baseLoras: [
      "Woman992 Spanish / Ethnic Influencer LoRA",
      "MajicMIX Realistic Checkpoint"
    ],
    preview: "/muses/kenza_layli.png",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },
  {
    id: "bella_blonde",
    label: "Bella Blonde",
    category: "female",
    platform: "Fanvue · Instagram",
    estRevenue: "$7K–$12K / mo",
    description:
      "Playful blonde bombshell tuned for quick-render vaults and neon aesthetics.",
    traits:
      "Beachy hair, bright eyes, playful / teasing poses; perfect for fast-turnover promo content.",
    baseLoras: [
      "Woman033 NSFW Photorealistic LoRA",
      "MajicMIX Realistic Checkpoint"
    ],
    preview: "/muses/bella_blonde.png",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },

  // 🔥 MALE MUSES
  {
    id: "liam_nikuro",
    label: "Liam Nikuro",
    category: "male",
    platform: "Instagram · Fanvue",
    estRevenue: "$10K–$15K / mo",
    description:
      "Japanese-American music producer muse with sleek urban style and collab energy.",
    traits:
      "Streetwear, studio shots, soft-lit portraits; great for music-themed SFW and NSFW sets.",
    baseLoras: [
      "Project Men Flux LoRA v1.0",
      "Realistic Male SDXL LoRA"
    ],
    preview: "/muses/liam_nikuro.png",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },
  {
    id: "knox_frost",
    label: "Knox Frost",
    category: "male",
    platform: "Instagram · OnlyFans",
    estRevenue: "$8K–$12K / mo",
    description:
      "21-year-old Atlanta lifestyle icon; confident, gym-friendly, and high-energy.",
    traits:
      "Athletic builds, lifestyle B-roll, smooth SFW-to-NSFW transition poses.",
    baseLoras: [
      "Project Men Flux LoRA v1.0",
      "Diverse Male Influencer SDXL Checkpoint"
    ],
    preview: "/muses/knox_frost.png",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },
  {
    id: "koffi_gram",
    label: "Koffi Gram",
    category: "male",
    platform: "Instagram · Fanvue",
    estRevenue: "$7K–$11K / mo",
    description:
      "Stylish urban fashion muse with introspective, editorial-heavy shots.",
    traits:
      "Designer fits, moody lighting, fashion-forward SFW with subtle NSFW potential.",
    baseLoras: [
      "Realistic Male SDXL LoRA",
      "Man Photorealistic Character LoRA"
    ],
    preview: "/muses/koffi_gram.png",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },
  {
    id: "fn_meka",
    label: "FN Meka",
    category: "male",
    platform: "Instagram · Music Platforms",
    estRevenue: "$9K–$14K / mo",
    description:
      "Virtual rapper muse with loud streetwear energy and performance vibes.",
    traits:
      "Bold colors, stage lighting, high-motion compositions for clips and promo shorts.",
    baseLoras: [
      "Man Photorealistic Character LoRA",
      "Diverse Male Influencer SDXL Checkpoint"
    ],
    preview: "/muses/fn_meka.png",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },
  {
    id: "hairy_ai_guys",
    label: "Hairy AI Guys",
    category: "male",
    platform: "Fanvue · NSFW niche",
    estRevenue: "$5K–$9K / mo",
    description:
      "Body-positive hairy daddies niche muse tuned for realistic mature anatomy.",
    traits:
      "Natural body hair, realistic lighting, mature NSFW positioning for targeted subs.",
    baseLoras: [
      "Hairy Male Realism LoRA (Flux)",
      "Realistic Male SDXL LoRA"
    ],
    preview: "/muses/hairy_ai_guys.png",
    storeEnabled: true,
    explicitLevels: ["sfw", "nsfw", "ultra"],
  },
];
