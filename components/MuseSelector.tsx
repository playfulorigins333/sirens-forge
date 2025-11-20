"use client";

import Image from "next/image";
import { MUSES, MuseProfile } from "@/muses/data";

type Props = {
  value: string;
  onChange: (id: string) => void;
};

export default function MuseSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
      {MUSES.filter((m) => m.storeEnabled || m.category === "internal").map(
        (m: MuseProfile) => {
          const active = value === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onChange(m.id)}
              className={`border rounded-xl p-3 transition-all text-left bg-zinc-900 hover:bg-zinc-800
                ${active ? "border-fuchsia-400 shadow-lg" : "border-zinc-700"}`}
            >
              <div className="w-full aspect-square relative rounded-lg overflow-hidden mb-3">
                <Image
                  src={m.preview}
                  alt={m.label}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>

              <div className="font-semibold text-lg">{m.label}</div>
              <p className="text-sm text-zinc-400 mt-1">{m.description}</p>

              {/* EXPLICIT LEVEL BADGES */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {m.explicitLevels.map((lvl) => (
                  <span
                    key={lvl}
                    className={`px-2 py-0.5 rounded text-xs border 
                      ${
                        lvl === "ultra"
                          ? "border-red-500 text-red-300"
                          : lvl === "nsfw"
                          ? "border-yellow-400 text-yellow-300"
                          : "border-green-400 text-green-300"
                      }`}
                  >
                    {lvl.toUpperCase()}
                  </span>
                ))}
              </div>
            </button>
          );
        }
      )}
    </div>
  );
}
