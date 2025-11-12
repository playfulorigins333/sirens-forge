'use client';

import { useState, useEffect } from 'react';

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('grok-3');
  const [temperature, setTemperature] = useState(0.7);
  const [style, setStyle] = useState('formal');
  const [history, setHistory] = useState<string[]>([]);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setOutput('');

    // Simulate streaming
    const words = prompt.split(' ');
    let current = '';
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      current += words[i] + ' ';
      setOutput(current);
    }

    setHistory(prev => [...prev, current]);
    setLoading(false);
  };

  const remix = (text: string) => {
    setPrompt(text);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* HERO PROMPT BAR */}
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-2xl p-6 mb-8 border border-cyan-500/30">
          <div className="flex gap-4 items-center">
            <button className="text-cyan-400 hover:text-cyan-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generate()}
              placeholder="Write a sci-fi story about..."
              className="flex-1 bg-transparent outline-none text-xl font-light"
            />
            <button
              onClick={generate}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* SIDEBAR TOOLKIT */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-bold text-cyan-400 mb-3">Model</h3>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-gray-900 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="grok-3">Grok-3</option>
                <option value="grok-4" disabled>Grok-4 (Pro)</option>
              </select>
            </div>

            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-bold text-cyan-400 mb-3">Temperature</h3>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-400 mt-1">{temperature.toFixed(1)}</p>
            </div>

            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-bold text-cyan-400 mb-3">Style</h3>
              <div className="flex flex-wrap gap-2">
                {['formal', 'pirate', 'json'].map(s => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                      style === s ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <button className="w-full py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">
                Remix Last
              </button>
              <button className="w-full py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 mt-2">
                Save to Project
              </button>
              <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-bold mt-2">
                Theme: Cyber
              </button>
            </div>
          </div>

          {/* GENERATION CANVAS + GALLERY */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass rounded-2xl p-6 min-h-96">
              {loading ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-pulse"></div>
                  <p className="mt-4 text-gray-400">Streaming tokens...</p>
                </div>
              ) : output ? (
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap font-mono text-sm">{output}</p>
                  <div className="flex gap-2 mt-4">
                    <button className="text-xs text-cyan-400 hover:underline">Edit</button>
                    <button className="text-xs text-cyan-400 hover:underline">Regenerate</button>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-20">Type a prompt to begin</p>
              )}
            </div>

            {/* OUTPUT GALLERY */}
            {history.length > 0 && (
              <div className="glass rounded-2xl p-5">
                <h3 className="text-sm font-bold text-cyan-400 mb-3">History</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {history.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => remix(item)}
                      className="bg-gray-800 rounded-lg p-3 text-xs cursor-pointer hover:ring-2 ring-cyan-500 transition"
                    >
                      <p className="truncate">{item}</p>
                      <p className="text-cyan-400 text-xs mt-1">Remix</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACTION BAR */}
            <div className="glass rounded-2xl p-4 flex gap-3 flex-wrap">
              <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">Copy</button>
              <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">MD</button>
              <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">PNG</button>
              <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">PDF</button>
              <button className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-bold">Continue in Chat</button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-bold">Add to Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}