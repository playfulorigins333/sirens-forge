import Image from "next/image";
import type { MuseProfile } from "@/src/muses/data";

interface MuseCardProps {
  muse: MuseProfile;
}

export default function MuseCard({ muse }: MuseCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-lg">
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/30">
        <Image
          src={muse.preview}
          alt={muse.label}
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{muse.label}</h3>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-purple-100">
            {muse.platform}
          </span>
        </div>
        <p className="text-sm text-gray-300">{muse.description}</p>
        <p className="text-sm font-semibold text-purple-200">{muse.estRevenue}</p>
      </div>
    </div>
  );
}
