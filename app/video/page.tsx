"use client";

import { useState } from "react";

export default function VideoGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [muse, setMuse] = useState("playful_origins");
  const [explicit, setExplicit] = useState("nsfw");
  const [steps, setSteps] = useState(30);
  const [cfg, setCfg] = useState(7);
  const [seed, setSeed] = useState(-1);
  const [aspect, setAspect] = useState("portrait");

  // VIDEO SETTINGS
  const [duration, setDuration] = useState(10);
  const [motion, setMotion] = useState(1.0);
  const [loraStrength, setLoraStrength] = useState(1.0);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function generateVideo() {
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
          mode: "video",
          video: {
            duration,
            motion,
            loraStrength,
          },
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Video generation failed.");
        setLoading(false);
        return;
      }

      setResult(json);
      setLoading(false);
    } catch (err: any) {
      setError("Network or server error.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-purple-400">
          Video Generator
        </h1>

        {/* PROMPT */}
        <label className="block mb-4">
          <span className="font-semibold">Prompt</span>
          <textarea
            className="w-full mt-2 p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your animated siren..."
          />
        </label>

        {/* MUSE */}
        <label className="block mb-4">
          <span className="font-semibold">Muse</span>
          <select
            className="w-full mt-2 p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
            value={muse}
            onChange={(e) => setMuse(e.target.value)}
          >
            <option value="playful_origins">Playful Origins</option>
          </select>
        </label>

        {/* EXPLICIT LEVEL */}
        <label className="block mb-4">
          <span className="font-semibold">Explicit Level</span>
          <select
            className="w-full mt-2 p-3 bg-zinc-900 border border-zinc-700 rounded-lg"
            value={explicit}
            onChange={(e) => setExplicit(e.target.value)}
          >
            <option value="sfw">SFW</option>
            <option value="nsfw">NSFW</option>
            <option value="ultra">Ultra Explicit</option>
          </select>
        </label>

        {/* GRID SETTINGS */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <label>
            <span className="font-semibold">Steps</span>
            <input
              type="number"
              className="w-full mt-2 p-2 bg-zinc-900 border border-zinc-700 rounded"
              value={steps}
              onChange={(e) => setSteps(Number(e.target.value))}
            />
          </label>

          <label>
            <span className="font-semibold">CFG</span>
            <input
              type="number"
              className="w-full mt-2 p-2 bg-zinc-900 border border-zinc-700 rounded"
              value={cfg}
              onChange={(e) => setCfg(Number(e.target.value))}
            />
          </label>

          <label>
            <span className="font-semibold">Seed (-1 = random)</span>
            <input
              type="number"
              className="w-full mt-2 p-2 bg-zinc-900 border border-zinc-700 rounded"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
            />
          </label>

          <label>
            <span className="font-semibold">Aspect Ratio</span>
            <select
              className="w-full mt-2 p-2 bg-zinc-900 border border-zinc-700 rounded"
              value={aspect}
              onChange={(e) => setAspect(e.target.value)}
            >
              <option value="portrait">Portrait (9:16)</option>
              <option value="landscape">Landscape (16:9)</option>
              <option value="square">Square (1:1)</option>
            </select>
          </label>
        </div>

        {/* VIDEO SETTINGS */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700 mb-6">
          <h2 className="text-xl font-bold mb-4 text-purple-300">Video Settings</h2>

          <div className="grid grid-cols-2 gap-6">
            <label>
              <span className="font-semibold">Duration (seconds)</span>
              <select
                className="w-full mt-2 p-2 bg-zinc-800 border border-zinc-700 rounded"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              >
                <option value={5}>5 seconds</option>
                <option value={10}>10 seconds</option>
                <option value={15}>15 seconds</option>
                <option value={20}>20 seconds</option>
                <option value={25}>25 seconds</option>
              </select>
            </label>

            <label>
              <span className="font-semibold">Motion Strength</span>
              <input
                type="number"
                step="0.1"
                className="w-full mt-2 p-2 bg-zinc-800 border border-zinc-700 rounded"
                value={motion}
                onChange={(e) => setMotion(Number(e.target.value))}
              />
            </label>

            <label>
              <span className="font-semibold">LoRA Strength</span>
              <input
                type="number"
                step="0.1"
                max={2.0}
                className="w-full mt-2 p-2 bg-zinc-800 border border-zinc-700 rounded"
                value={loraStrength}
                onChange={(e) => setLoraStrength(Number(e.target.value))}
              />
            </label>
          </div>
        </div>

        {/* GENERATE BUTTON */}
        <button
          onClick={generateVideo}
          disabled={loading}
          className="w-full py-4 mt-4 text-lg font-bold bg-purple-600 hover:bg-purple-700 rounded-lg"
        >
          {loading ? "Generating Video..." : "Generate Video"}
        </button>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 mt-4 text-center">{error}</p>
        )}

        {/* RESULT */}
        {result?.url && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Your Video</h2>
            <video
              controls
              className="w-full rounded-lg border border-zinc-700"
              src={result.url}
            ></video>

            <a
              href={result.url}
              download
              className="block text-center mt-4 text-purple-300 underline"
            >
              Download MP4
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
