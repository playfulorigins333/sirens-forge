// app/generate/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Vault {
  id: number;
  name: string;
  content: string;
}

export default function GeneratePage() {
  const [mode, setMode] = useState<'txt2img' | 'img2img' | 'txt2vid' | 'img2vid'>('txt2img');
  const [prompt, setPrompt] = useState('');
  const [refImages, setRefImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);

  useEffect(() => {
    const loadVaults = async () => {
      const files = [
        'combined_Vault #1-10.md',
        'combined_Vault 11-20.md',
        'combined_Vault 20-30.md',
        'Prompt Vaults 11-20.md',
        'Prompt Vaults 21-30.md',
        'Prompt Vaults combined_1-10.md',
        'Prompt Erotique Ultra — Smart System.md',
        'Prompt Erotique — ULTRA Macro Tag Library.md',
        'Example Character DNA_Sarita.md'
      ];
      const loaded: Vault[] = [];

      for (let i = 0; i < files.length; i++) {
        try {
          const res = await fetch(`/vaults/${encodeURIComponent(files[i])}`);
          if (res.ok) {
            const text = await res.text();
            loaded.push({ id: i + 1, name: files[i].replace('.md', ''), content: text });
          }
        } catch (e) {
          console.error(`Failed to load ${files[i]}`);
        }
      }
      setVaults(loaded);
    };
    loadVaults();
  }, []);

  const toggleVault = (id: number) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  const appendVault = (vault: Vault) => {
    setPrompt(prev => `${prev}\n\n--- ${vault.name} ---\n${vault.content}\n---`);
  };

  const generate = async () => {
    if (!prompt.trim()) return alert('Build your prompt with vaults');
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('mode', mode);
    formData.append('prompt', `ULTRA EROTIQUE:\n${prompt}`);
    refImages.forEach((img, i) => formData.append(`ref${i}`, img));

    try {
      const res = await fetch('/api/generate', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) setResult(data.url);
      else alert(data.error);
    } catch {
      alert('Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-7xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600 animate-pulse">
          SIREN FORGE
        </h1>

        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          {(['txt2img', 'img2img', 'txt2vid', 'img2vid'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-8 py-4 rounded-full font-bold transition ${
                mode === m ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-black' : 'bg-gray-800 text-gray-300'
              }`}
            >
              {m.replace('2', '→').toUpperCase()}
            </button>
          ))}
        </div>

        <div className="mt-16 bg-gray-900 p-8 rounded-3xl border border-purple-500/30">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">PROMPT EROTIQUE ULTRA — VAULT BROWSER</h2>

          <div className="space-y-4">
            {vaults.map((vault) => (
              <div key={vault.id} className="bg-black/50 p-4 rounded-xl border border-gray-700">
                <button
                  onClick={() => toggleVault(vault.id)}
                  className="w-full text-left font-bold text-cyan-400 flex justify-between"
                >
                  {vault.name} <span>{expanded.includes(vault.id) ? '−' : '+'}</span>
                </button>
                {expanded.includes(vault.id) && (
                  <div className="mt-3">
                    <pre className="text-xs text-gray-400 bg-gray-800 p-3 rounded max-h-64 overflow-y-auto">
                      {vault.content}
                    </pre>
                    <button
                      onClick={() => appendVault(vault)}
                      className="mt-2 w-full bg-gradient-to-r from-pink-600 to-purple-600 text-black font-bold py-2 rounded"
                    >
                      ADD TO PROMPT
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-gray-900 p-8 rounded-3xl border border-cyan-500/30">
          <textarea
            placeholder="Your full Erotique Ultra prompt builds here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-64 bg-black border border-cyan-500/50 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none font-mono text-sm"
          />

          {(mode.includes('img') || mode.includes('vid')) && (
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setRefImages(Array.from(e.target.files || []))}
              className="block w-full mt-6 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-gradient-to-r file:from-cyan-500 file:to-blue-600 file:text-black"
            />
          )}

          <button
            onClick={generate}
            disabled={loading || !prompt}
            className="mt-8 w-full bg-gradient-to-r from-red-500 to-pink-600 text-black font-bold text-2xl py-6 rounded-full disabled:opacity-50"
          >
            {loading ? 'FORGING...' : 'GENERATE SIREN'}
          </button>
        </div>

        {result && (
          <div className="mt-20 text-center">
            <h2 className="text-4xl font-bold text-cyan-400">SIREN FORGED</h2>
            <img src={result} className="mt-8 max-w-3xl mx-auto rounded-2xl shadow-2xl" />
            <a href={result} download className="mt-6 inline-block bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-bold py-4 px-16 rounded-full">
              DOWNLOAD (R2)
            </a>
          </div>
        )}
      </div>
    </div>
  );
}