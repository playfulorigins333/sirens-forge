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
              className={`border rounded-xl p-3 transition-all text-left bg-zinc-900 hover:bg-zinc-800 ${
                active ? "border-fuchsia-400 shadow-lg" : "border-zinc-700"
              }`}
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

              <div className="text-sm font-semibold">{m.label}</div>
              <div className="text-xs opacity-70">{m.category}</div>
            </button>
          );
        }
      )}
    </div>
  );
}
