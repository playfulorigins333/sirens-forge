import MuseCard from "@/components/MuseCard";
import MuseUnlockButton from "@/components/MuseUnlockButton";
import { MUSES } from "@/muses/data";

export default function MuseStorePage() {
  // Placeholder: nothing is unlocked yet
  const unlockedMuses: string[] = [];

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
          <div key={muse.id} className="flex flex-col">
            <MuseCard muse={muse} />
            <MuseUnlockButton
              museId={muse.id}
              unlocked={unlockedMuses.includes(muse.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
