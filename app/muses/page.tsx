import MuseCard from "@/components/MuseCard";
import { MUSES } from "@/muses/data";

export default function MuseStorePage() {
  return (
    <div className="min-h-screen w-full px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Muse Store</h1>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
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
  );
}
