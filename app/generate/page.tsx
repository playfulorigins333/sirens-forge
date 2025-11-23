"use client";

import { type ChangeEvent, useState } from "react";

import { VideoPreview } from "@/components/VideoPreview";
import { generateVideo } from "@/lib/runpodVideoClient";

interface GenerateResponse {
  url?: string;
  error?: string;
  [key: string]: unknown;
}

type Mode = "image" | "video";
interface GenerationResult {
  url: string;
  type: Mode;
}

export default function GeneratePage() {
  const [mode, setMode] = useState<Mode>("image");
  const [prompt, setPrompt] = useState("");
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReferenceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setReferenceImage(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setReferenceImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoading(true);
    setError(null);

    try {
      if (mode === "video") {
        const videoUrl = await generateVideo({
          prompt,
          imageUrl: referenceImage || undefined,
        });
        setResult({ url: videoUrl, type: "video" });
      } else {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, imageUrl: referenceImage }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate. Please try again.");
        }

        const data: GenerateResponse = await response.json();

        if (!data.url) {
          throw new Error(data.error || "Failed to generate image.");
        }

        setResult({ url: data.url, type: "image" });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error.";
      setError(message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const buttonLabel = loading
    ? mode === "video"
      ? "Generating video..."
      : "Generating image..."
    : mode === "video"
      ? "Generate Video"
      : "Generate Image";

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-10">
      <div className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Sirens Forge</p>
        <h1 className="text-4xl font-bold">Generate</h1>
        <p className="text-gray-500">Craft a prompt and generate either an image or a video.</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm space-y-6">
        <div className="flex gap-2 rounded-xl bg-gray-100 p-1">
          {(
            ["image", "video"] as Mode[]
          ).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                mode === option
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {option === "image" ? "Image" : "Video"}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700" htmlFor="prompt">
            Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the scene you want to create..."
            className="w-full rounded-xl border border-gray-200 bg-white p-4 text-gray-900 shadow-inner focus:border-gray-400 focus:outline-none"
            rows={5}
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700" htmlFor="reference-image">
            Reference Image (optional)
          </label>
          <input
            id="reference-image"
            type="file"
            accept="image/*"
            onChange={handleReferenceChange}
            disabled={loading}
            className="w-full cursor-pointer rounded-lg border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm focus:outline-none"
          />
          {referenceImage && (
            <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white/80 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={referenceImage} alt="Reference" className="h-16 w-16 rounded object-cover" />
              <p className="text-sm text-gray-600">Reference image attached</p>
            </div>
          )}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="w-full rounded-xl bg-black px-4 py-3 text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {buttonLabel}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      {result && (
        <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Result</h2>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-600">Generated asset:</p>
            {result.type === "video" ? (
              <VideoPreview url={result.url} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.url}
                alt="Generated result"
                className="w-full rounded-xl border border-gray-200"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
