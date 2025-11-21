"use client";

import Link from "next/link";
import MuseCard from "@/components/MuseCard";
import { MUSES } from "@/muses/data";
import { useUserMuses } from "@/store/museStore";

export default function UnlockedMusesPage() {
  const { unlockedMuseIds } = useUserMuses();

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Muses</h1>

      <div
        className="
          grid
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-6
        "
      >
        {MUSES.map((muse) => {
          const unlocked = unlockedMuseIds.includes(muse.id);

          return (
            <Link
              key={muse.id}
              href={
                unlocked
                  ? `/forge?muse=${muse.id}`
                  : `/muses/${muse.id}`
              }
              className={unlocked ? "block" : "block opacity-50"}
            >
              <MuseCard muse={muse} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
