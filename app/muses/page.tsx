"use client";

import { useState } from "react";
import MuseCard from "@/components/MuseCard";
import { MUSES } from "@/muses/data";

export default function MuseStorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | "female" | "male">("all");

  const filtered = MUSES.filter((m) => {
    const matchSearch =
      m.label.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "all" ? true : m.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen w-full px-6 py-10 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Muse Store</h1>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="Search muses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 w-full sm:w-64 rounded-md bg-zinc-900 border border-zinc-700"
        />

        <div className="flex gap-2">
          {["all", "female", "male"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c as any)}
              className={`px-3 py-1 rounded-md text-sm border transition ${
                category === c
                  ? "bg-fuchsia-600 border-fuchsia-400"
                  : "bg-zinc-900 border-zinc-700 hover:border-fuchsia-400"
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
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
        {filtered.map((muse) => (
          <MuseCard key={muse.id} muse={muse} />
        ))}
      </div>
    </div>
  );
}
