"use client";

import MuseCard from "@/components/MuseCard";
import { MUSES } from "@/muses/data";

export default function MuseStorePage() {
  return (
    <div className="min-h-screen w-full bg-black text-white px-6 py-10">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-fuchsia-300 to-purple-500 text-transparent bg-clip-text">
          Muse Store
        </h1>
        <p className="text-zinc-400 mt-2">
          Explore premium AI muses for SFW + NSFW generation.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
            animate-fadeIn
          "
        >
          {MUSES.map((muse) => (
            <MuseCard
              key={muse.id}
              muse={muse}
              onSelect={() => console.log("Selected:", muse.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
