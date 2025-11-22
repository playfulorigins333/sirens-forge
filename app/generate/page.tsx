"use client";

import { ChangeEvent, useState } from "react";
import { useProtectedUser } from "@/lib/useProtectedUser";

interface GenerateResponse {
  url?: string;
  error?: string;
  [key: string]: unknown;
}

type Mode = "txt2img" | "img2img" | "txt2vid" | "img2vid";

export default function GeneratePage() {
  const { user, loading } = useProtectedUser();

  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<Mode>("txt2img");
  const [nsfw, setNsfw] = useState(false);
  const [ultra, setUltra] = useState(false);
  const [duration, setDuration] = useState(5);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [loadingGeneration, setLoadingGeneration] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<File | null>(null);

  const isOg = user?.user_metadata?.tier === "og";
  const maxVideoSeconds = user?.user_metadata?.max_video_seconds ?? (isOg ? 25 : 10);

  const tokenNotice = isOg
    ? "OG mode active — unlimited tokens, NSFW + ULTRA unlocked."
    : "Standard mode — usage may consume tokens.";

  const supportsImgToImg = isOg;
  const supportsImgToVid = isOg;

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setReferenceImage(file ?? null);
  };

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoadingGeneration(true);
    setError(null);

    try {
      const body: Record<string, unknown> = {
        prompt,
        mode,
        nsfw,
        ultra,
        duration: Math.min(duration, maxVideoSeconds),
      };

      if (referenceImage && (mode === "img2img" || mode === "img2vid")) {
        body.reference = referenceImage.name;
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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
      setLoadingGeneration(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-sm">Validating your OG access…</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-10">
      <div className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Sirens Forge</p>
        <h1 className="text-4xl font-bold">OG Generator</h1>
        <p className="text-gray-400">{tokenNotice}</p>
      </div>

      <div className="grid md:grid-cols-[2fr,1fr] gap-6 items-start">
        <div className="rounded-2xl border border-gray-800 bg-zinc-950/80 p-6 shadow-sm space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-200" htmlFor="prompt">
              Prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the scene you want to create..."
              className="mb-2 w-full rounded-xl border border-gray-800 bg-black/60 p-4 text-gray-50 shadow-inner focus:border-fuchsia-500 focus:outline-none"
              rows={5}
            />
            <p className="text-xs text-gray-500">
              TXT→IMG and IMG→IMG always on. Video generation unlocked up to {maxVideoSeconds}s.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <button
              onClick={() => setMode("txt2img")}
              className={`rounded-xl border px-4 py-3 text-left ${mode === "txt2img" ? "border-fuchsia-500 bg-fuchsia-500/10" : "border-gray-800"}`}
            >
              <span className="block font-semibold">TXT → IMG</span>
              <span className="text-gray-400">Unlimited stills</span>
            </button>

            <button
              onClick={() => supportsImgToImg && setMode("img2img")}
              disabled={!supportsImgToImg}
              className={`rounded-xl border px-4 py-3 text-left ${mode === "img2img" ? "border-fuchsia-500 bg-fuchsia-500/10" : "border-gray-800"} ${!supportsImgToImg ? "opacity-50" : ""}`}
            >
              <span className="block font-semibold">IMG → IMG</span>
              <span className="text-gray-400">Refine with a reference</span>
            </button>

            <button
              onClick={() => setMode("txt2vid")}
              className={`rounded-xl border px-4 py-3 text-left ${mode === "txt2vid" ? "border-fuchsia-500 bg-fuchsia-500/10" : "border-gray-800"}`}
            >
              <span className="block font-semibold">TXT → VID</span>
              <span className="text-gray-400">Up to {maxVideoSeconds}s</span>
            </button>

            <button
              onClick={() => supportsImgToVid && setMode("img2vid")}
              disabled={!supportsImgToVid}
              className={`rounded-xl border px-4 py-3 text-left ${mode === "img2vid" ? "border-fuchsia-500 bg-fuchsia-500/10" : "border-gray-800"} ${!supportsImgToVid ? "opacity-50" : ""}`}
            >
              <span className="block font-semibold">IMG → VID</span>
              <span className="text-gray-400">Reference driven motion</span>
            </button>
          </div>

          {(mode === "img2img" || mode === "img2vid") && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-200">Reference image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="w-full rounded-xl border border-gray-800 bg-black/60 px-4 py-3 text-sm text-gray-200"
              />
              {referenceImage && <p className="text-xs text-gray-500">{referenceImage.name}</p>}
            </div>
          )}

          {(mode === "txt2vid" || mode === "img2vid") && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-200">Duration (seconds)</label>
              <input
                type="number"
                min={1}
                max={maxVideoSeconds}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-800 bg-black/60 px-4 py-3 text-sm text-gray-200"
              />
              <p className="text-xs text-gray-500">OGs are capped at {maxVideoSeconds}s for video. No daily limits.</p>
            </div>
          )}

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-200">
              <input
                type="checkbox"
                checked={nsfw}
                onChange={(e) => setNsfw(e.target.checked)}
                className="rounded text-fuchsia-500"
              />
              NSFW enabled
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-200">
              <input
                type="checkbox"
                checked={ultra}
                onChange={(e) => setUltra(e.target.checked)}
                className="rounded text-fuchsia-500"
              />
              ULTRA quality
            </label>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loadingGeneration || !prompt}
            className="w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-700 px-4 py-3 text-white transition hover:from-fuchsia-500 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingGeneration ? "Summoning…" : "Generate"}
          </button>

          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>

        <div className="rounded-2xl border border-gray-800 bg-zinc-950/60 p-6 shadow-sm space-y-3 text-sm text-gray-300">
          <h3 className="text-lg font-semibold text-white">Entitlements</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Tier: {user.user_metadata?.tier || "standard"}</li>
            <li>Tokens: {isOg ? "Unlimited (no deductions)" : "Usage based"}</li>
            <li>Images: Unlimited generation</li>
            <li>NSFW / ULTRA: {isOg ? "Unlimited" : "Limited"}</li>
            <li>IMG→IMG: {supportsImgToImg ? "Enabled" : "Upgrade required"}</li>
            <li>TXT→IMG: Always enabled</li>
            <li>IMG→VID: {supportsImgToVid ? `Enabled up to ${maxVideoSeconds}s` : "Upgrade required"}</li>
            <li>TXT→VID: Enabled up to {maxVideoSeconds}s</li>
            <li>Daily caps: None for OG</li>
            <li>Upgrade prompts: {isOg ? "Hidden" : "May appear"}</li>
          </ul>
        </div>
      </div>

      {result && (
        <div className="rounded-2xl border border-gray-800 bg-zinc-950/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-100">Result</h2>
          {result.url ? (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-400">Generated asset:</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.url}
                alt="Generated result"
                className="w-full rounded-xl border border-gray-800"
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
