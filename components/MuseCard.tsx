"use client";

import Image from "next/image";
import type { MuseProfile } from "@/muses/data";

type Props = {
  muse: MuseProfile;
};

export default function MuseCard({ muse }: Props) {
  return (
    <div
      className="
        w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-700
        hover:border-fuchsia-400 hover:shadow-fuchsia-500/30 
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300 cursor-pointer
        animate-fadeIn
      "
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
      <div className="p-4">

        <div className="text-xl font-bold mb-1">{muse.label}</div>

        <p className="text-sm text-zinc-400 mb-2">
          {muse.description}
        </p>

        {/* USE CASES */}
        <div className="mt-2">
          <div className="font-semibold text-xs text-zinc-200">
            Ideal Use Cases:
          </div>
          <ul className="text-xs text-zinc-400 list-disc ml-4 mt-1">
            {muse.useCases?.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </div>

        {/* COMPATIBILITY BADGES */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {muse.explicitLevels.includes("sfw") && (
            <span className="px-2 py-0.5 text-xs rounded border border-green-400 text-green-300">
              SFW
            </span>
          )}
          {muse.explicitLevels.includes("nsfw") && (
            <span className="px-2 py-0.5 text-xs rounded border border-yellow-400 text-yellow-300">
              NSFW
            </span>
          )}
          {muse.explicitLevels.includes("ultra") && (
            <span className="px-2 py-0.5 text-xs rounded border border-red-500 text-red-300">
              ULTRA
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
