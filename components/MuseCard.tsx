"use client";

import Image from "next/image";
import type { MuseProfile } from "@/muses/data";

type Props = {
  muse: MuseProfile;
};

export default function MuseCard({ muse }: Props) {
  const isFemale = muse.category === "female";

  const compatibility =
    muse.explicitLevels.includes("ultra")
      ? "SFW + NSFW (includes Ultra prompts)"
      : muse.explicitLevels.includes("nsfw")
      ? "SFW + NSFW ready"
      : "SFW-focused";

  return (
    <div
      className={[
        "w-full rounded-xl overflow-hidden border bg-zinc-950/90",
        "border-zinc-700 hover:border-fuchsia-400 hover:shadow-lg",
        "transition-all flex flex-col",
        !muse.storeEnabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[4/5]">
        <Image
          src={muse.preview}
          alt={muse.label}
          fill
          className="object-cover"
          sizes="100%"
        />
      </div>

      {/* BODY */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* NAME + CATEGORY */}
        <div className="flex items-center justify-between gap-2">
          <div className="text-lg font-bold truncate">{muse.label}</div>
          <span
            className={[
              "text-xs px-2 py-0.5 rounded-full border",
              isFemale
                ? "border-pink-400/70 text-pink-200"
                : "border-cyan-400/70 text-cyan-200",
            ].join(" ")}
          >
            {isFemale ? "Female Muse" : "Male Muse"}
          </span>
        </div>

        {/* EST. REVENUE (SAFE WORDING) */}
        <div className="text-xs text-zinc-400">
          <span className="font-semibold">Modeled performance:</span>{" "}
          {muse.estRevenue}
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-zinc-300 line-clamp-3">
          {muse.description}
        </p>

        {/* COMPATIBILITY */}
        <div className="mt-1 text-xs text-zinc-300">
          <span className="font-semibold">Compatibility:</span>{" "}
          {compatibility}
        </div>

        {/* LEGAL / USAGE NOTE */}
        <p className="mt-1 text-[11px] text-zinc-500 leading-tight">
          Inspired by public creator archetypes and AI LoRAs. Not endorsed,
          affiliated, or associated with any real person or brand.
        </p>

        {/* LOCK / CTA FOOTER */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-zinc-400">
            Ideal for SFW promos, funnels & NSFW vaults.
          </span>
          <span
            className={[
              "px-2 py-0.5 rounded-full border text-[11px]",
              muse.storeEnabled
                ? "border-fuchsia-400 text-fuchsia-300"
                : "border-zinc-600 text-zinc-400",
            ].join(" ")}
          >
            {muse.storeEnabled ? "Available in Beta" : "Coming Soon"}
          </span>
        </div>
      </div>
    </div>
  );
}
