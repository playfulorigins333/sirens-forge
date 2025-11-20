"use client";

import { useState } from "react";
import { MUSES } from "@/muses/data"; // NEW

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [muse, setMuse] = useState("playful_origins");
  const [explicit, setExplicit] = useState("sfw");
  const [steps, setSteps] = useState(30);
  const [cfg, setCfg] = useState(7);
  const [seed, setSeed] = useState(-1);
  const [aspect, setAspect] = useState("portrait");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const selectedMuse = MUSES.find((m) => m.id === muse);

  async function generateImage() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          muse,
          explicit,
          steps,
          cfg,
          seed,
          aspect,
          mode: "image",
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Generation failed.");
        setLoading(false);
        return;
      }

      setResult(json);
      setLoading(false);
    } catch (err) {
      setError("Network or server error.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-fuchsia-400">
          Image Generator
        </h1>

        {/* PROMPT */}
        <label className="block mb-4">
          <span className="font-semibold">Prompt</span>
          <textarea
            className="w-full mt-2 p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your siren..."
          />
        </label>

        {/* MUSE SELECTOR — dynamic */}
        <label className="block mb-4">
          <span className="font-semibold">Muse</span>
          <select
            className="w-full mt-2 p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
            value={muse}
            onChange={(e) => {
              setMuse(e.target.value);
              setExplicit("sfw");
            }}
          >
            {MUSES.filter((m) => m.storeEnabled || m.category === "internal").map(
              (m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              )
            )}
          </select>
        </label>

        {/* EXPLICIT LEVEL — restricted by muse */}
        <label className="block mb-4">
          <span className="font-semibold">Explicit Level</span>
          <select
            className="w-full mt-2 p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
            value={explicit}
            onChange={(e) => setExplicit(e.target.value)}
          >
            {selectedMuse?.explicitLevels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl.toUpperCase()}
              </option>
            ))}
          </select>
        </label>

        {/* (The rest of the file remains unchanged) */}
      </div>
    </div>
  );
}
