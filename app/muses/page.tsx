import MuseCard from "@/components/MuseCard";
import { MUSES } from "@/muses/data";

export default function MuseStorePage() {
  return (
    <div className="min-h-screen w-full px-6 py-10">

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Muse Store</h1>
        <p className="text-zinc-400 text-sm max-w-2xl">
          Browse AI muses built from public creator archetypes and LoRA inspirations.
          All muses are compatible with SFW + NSFW generations. No real person likeness.
        </p>
      </div>

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
        "
      >
        {MUSES.map((muse) => (
          <MuseCard
            key={muse.id}
            muse={muse}
          />
        ))}
      </div>
    </div>
  );
}
