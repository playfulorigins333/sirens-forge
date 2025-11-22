"use client";

import { useState } from "react";
import { useMuseStore } from "@/app/stores/useMuseStore";

interface GenerateResponse {
  url?: string;
  error?: string;
  [key: string]: unknown;
}

export default function GeneratePage() {
  const selectedMuse = useMuseStore((state) => state.selectedMuse);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          muse: selectedMuse ? selectedMuse.slug : null
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate. Please try again.");
      }

      const data: GenerateResponse = await response.json();
      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error.";
      setError(message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-10">
      <div className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Sirens Forge</p>
        <h1 className="text-4xl font-bold">Generate</h1>
        <p className="text-gray-500">
          Craft a prompt, select your muse, and summon a result using the synchronous generator.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Muse</p>
            <p className="text-lg font-semibold text-gray-900">
              {selectedMuse ? selectedMuse.name : "No muse selected"}
            </p>
            {selectedMuse ? (
              <p className="text-sm text-gray-500">Slug: {selectedMuse.slug}</p>
            ) : (
              <p className="text-sm text-gray-500">Choose a muse to personalize the output.</p>
            )}
          </div>
          {selectedMuse && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              {selectedMuse.archetype}
            </span>
          )}
        </div>

        <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="prompt">
          Prompt
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the scene you want to create..."
          className="mb-4 w-full rounded-xl border border-gray-200 bg-white p-4 text-gray-900 shadow-inner focus:border-gray-400 focus:outline-none"
          rows={5}
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="w-full rounded-xl bg-black px-4 py-3 text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>

      {result && (
        <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Result</h2>
          {result.url ? (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">Generated asset:</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.url}
                alt="Generated result"
                className="w-full rounded-xl border border-gray-200"
              />
            </div>
          ) : (
            <pre className="mt-4 overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm text-gray-50">
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
