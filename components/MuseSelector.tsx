"use client";

import { useMuseStore, Muse } from "@/app/stores/useMuseStore";
import { MUSES } from "@/app/data/muses";

export default function MuseSelector() {
  const selectedMuse = useMuseStore((state) => state.selectedMuse);
  const setSelectedMuse = useMuseStore((state) => state.setSelectedMuse);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {MUSES.map((muse: Muse) => (
        <div
          key={muse.id}
          className={`border rounded-lg p-4 cursor-pointer transition ${
            selectedMuse && selectedMuse.id === muse.id
              ? "border-blue-500 shadow-md"
              : "border-neutral-700"
          }`}
          onClick={() => setSelectedMuse(muse)}
        >
          <div className="text-center font-semibold">{muse.name}</div>
        </div>
      ))}
    </div>
  );
}
